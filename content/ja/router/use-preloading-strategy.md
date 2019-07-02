---
title: プリロード(事前読み込み)戦略を使う
---

# 問題点

遅延ロードを使用すると、最初のページの描画に必要なコードのみを読み込み、必要とされていないモジュールはロードされません。

既定では、ユーザーが要求するたびに必要なモジュールがロードされます。
これは、ユーザーがURLにアクセスするたび、モジュールが読み込まれ解析されるまで待機する必要があることを意味するため、すてべの場合において理想的なシナリオではありません。

# 解決策

構築中のアプリケーションの仕様や、低い帯域幅に対処する必要があるかなど、要件に応じて、要求されたモジュールをロードする以外の方法を検討する事を勧めします

安定したWiFi接続で使われるアプリケーションで作業するときは、CPUが待機中のときにすべてのモジュールをプリロード(事前読み込み)するのが理にかなっています。
アプリケーションが遅い3G接続で使用されるような場合は、必要とされる可能性が一番高いモジュールだけをロードするべきです。

## 最初のページの描画した後に、すべてのモジュールをロードする

Angularチームが提供する戦略の1つとして、CPUが待機中になったとき、すべてのモジュールをプリロードさせます。
これは、最初のページが描画された後、全てのモジュールがバックグラウンドで読み込まれます。

```ts
@NgModule({
  imports: [
    ...modules,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  ...
})
export class AppModule {}
```

## カスタムプリロード戦略の設定

私達のユーザーがモバイルとWiFiの両方を使っている場合、WiFiに繋げている時だけモジュールをプリロードするのが理にかなっています。
これを実現するために、カスタムプリロード戦略を実装できます。

カスタムプリロード戦略はクラスとして実装でき、`PreloadingStrategy`インターフェースを実装します。

```ts
// custom.preloading-strategy.ts
export class MyCustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    // Implement your strategy here
  }
}

// app.module.ts
@NgModule({
  imports: [
    ...modules,
    // Custom Preloading Strategy
    RouterModule.forRoot(routes, { preloadingStrategy: MyCustomPreloadingStrategy });
  ],
  ...
})
export class AppModule {}
```

## データ駆動バンドリング

[Guess.js](https://github.com/guess-js/guess)を使う方法もあります、これはデータ駆動型のバンドリングアプローチを使用しています。
Guess.jsの目標は、バンドルのレイアウト設定を最小限に抑え、データ駆動型にし、それをさらに的確にすることです。
Guess.jsはどのバンドルを組み合わせ、そしてどのプリフェッチ機構を使うのかを判断します。

Guess.js can also be used with the Angular CLI. Here's an [example](https://github.com/mgechev/guess-js-angular-demo).
Guess.jsはAngular CLIでも使うことが出来、[これがその例](https://github.com/mgechev/guess-js-angular-demo)です。

# 関連資料

- [Angular Router: Preloading Modules](https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb) by Victor Savkin
- [Introducing Guess.js - a toolkit for enabling data-driven user-experiences on the Web](https://blog.mgechev.com/2018/05/09/introducing-guess-js-data-driven-user-experiences-web/) by Minko Gechev
