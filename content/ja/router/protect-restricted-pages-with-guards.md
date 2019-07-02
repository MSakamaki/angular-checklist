---
title: 制限のあるページをguardで保護する
---

# 問題点

アクセスしてはいけないページには、ユーザーがアクセスできないようにする必要があります。
メニューの項目をクリックしても遷移できないように項目を非表示にすることもできますが、その場合はURLを手で撃ち込まれるとそのページに移動できてしまします。特定のルーターを保護するための何らかの方法が必要です。

# 解決策

ルーターの変更を許可または拒否するためにguardを使うことが出来ます。
特定の権限を持ったユーザーだけに使えるアプリケーションの機能は、guardで保護されるべきです。

guardの作成は、ユーザーが特定のコンポーネントにアクセスできないようにする`CanActivate`インターフェース、そしてモジュール全体がロードされないようにするための`canLoad`インターフェースを実装するサービスを作成することで実現できます。

以下は`canActivate` guardの使用例です。

```ts
@Injectable()
export class UserHasRoleGuard implements CanActivate {
  constructor(private activatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return an Observable<boolean> | Promise<boolean> | boolean;
  }
}
```

これをルーターの定義で以下のように使います。

```ts
[
  ...,
  { path: 'users', component: UsersComponent, canActivate: [UserHasRoleGuard] },
]
```

あなたはルーター定義の`canActivate`プロパティには配列が使えることに気づくでしょう。
これは、定義された順で呼び出される複数のguardを追加できることを意味しています。
