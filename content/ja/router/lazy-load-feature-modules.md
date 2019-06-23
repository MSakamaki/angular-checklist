---
title: 機能(feature)モジュールを遅延ロードする
---

# 問題点

SPAの場合はクライアントにアプリケーション全体を配送する必要があります。
配送する必要のあるバイト数が多くなると、読み込みだけでなく解析する時間も多くなります。
これは私達のアプリケーションのTTL（Time to Interactive）に大きな影響を与えます。

私達はあまりにも大きなJavaScriptをクライアントに配送しています。

# 解決策

Angularはモジュールシステムを提供します。
アプリケーションを機能モジュールに分割することで、最初のページのレンダリングに必要なモジュールだけを読み込み、他のモジュールは必要なときだけ遅延ロードできます。
これにより、ユーザーの必要に応じた、もしくは、より洗練された事前ロード戦略を行うことができます。

次のモジュールは `UsersModule`をロードするための遅延ロードを使って**いません**。

```ts
// app.routing.ts
const routes: Routes = [
  ...
  {path: 'users', component: UsersComponent}
  ...
];

// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
    UsersModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

これは `UsersModule`がメインバンドルに追加されることを意味しています。
メインバンドルは、最初のページの読み込みに必要なコードが全部含まれています。
`UsersModule`はユーザーが`/users`ページに移動したときにのみ必要なので、事前にロードしておいても意味はありません、修正するために遅延ロードを利用しましょう。

```ts
// app.routing.ts
const routes: Routes = [
  ...
  {path: 'users', loadChildren: '../users/usersModule#UserModule'}
  ...
];

// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

`/users`ルートで`loadChildren`プロパティをうように更新しました。
この`${pathToModule}#${nameOfTheModule}`フォーマットは常に固定で、`UsersModule`のモジュールファイルを示しています。

また、 `AppModule`のインポートで`UsersModule`を追加していない事にも注意してください。
追加すると遅延ロードは期待通りには動作しないため、この点は重要です。
`UsersModule`が`AppModule`によって参照されると、`UsersModule`のコードはメインバンドルに追加されてしまいます。

`loadChildren`を使用しつつ、`AppModule`からモジュールのインポートを削除することで、 `UsersModule`は独自のバンドルに分離され、ユーザーが`/users`に移動したときだけ読み込まれるようになります。

# 参考資料

[The cost of JavaScript](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) by Addy Osmani
