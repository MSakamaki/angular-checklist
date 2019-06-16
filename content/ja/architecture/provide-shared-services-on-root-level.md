---
title: 共有サービスはルートレベルでのみ提供する
---

# 問題点

AngularのDI（依存性注入）によった実装方法により、依存性ツリーを使用して、サービスのインスタンスを複数のレベルで提供できます。（コンポーネント、ディレクティブ、またはモジュールなど）
これは便利な機能ですが、どんな時もこのような動きになることは望んではいません。

共有モジュールを使った作業はとてもよく利用されており、推奨もされています。
このモジュールは、色々な機能モジュール間でサービス、コンポーネント、ディレクティブ、パイプなどを共有するために使用できます。
しかし共有モジュールを複数のモジュールにインポートすると、サービスが複数回提供され、複数のインスタンスが作成されます。
こうなってしまってはサービスがシングルトンではありません。

# 解決策

`SharedModule`を作成するとき、すべての機能モジュールのコンポーネントをインポートしたいが、ルートモジュールにのみ、サービスを提供したいとします（例えば`AppModule`等に）。
これを実現するには`forRoot`を利用します。
私たちの `SharedModule`はこのような感じになるでしょう：

```ts
@NgModule({
  imports: [...modules],
  declarations: [...declarations],
  exports: [...declarations]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [...services]
    };
  }
}
```

実際のモジュール定義にはプロバイダが含まれて**いません**。

私たちの`AppModule`では、このモジュールを次のように使うことができます。

```ts
@NgModule({
  imports: [
    ...modules,
    SharedModule.forRoot()
  ],
  ...
})
export class AppModule {}
```

`SharedModule`の静的な`forRoot`メソッドを呼び出すことで、プロバイダを**含む**モジュール全体をインポートします。

機能モジュールでは、 `forRoot`を呼び出さずに**SharedModule**をインポートするだけです。

```ts
@NgModule({
  imports: [
    ...modules,
    SharedModule
  ],
  ...
})
export class SomeFeature {}
```

各コンポーネントは親インジェクタから継承された独自のインジェクタを持つため、ルートレベルで提供されるサービスを要求することができます。
そのため、サービスへ複数のインスタンスを作成することなく、 `SharedModule`によって提供されるすべてのコンポーネント、パイプなどにアクセスできます。

# 追加の資料

- [Dependency Injection in Angular](https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html) by Pascal Precht
- [Bypassing Providers in Angular](https://blog.thoughtram.io/angular/2016/09/14/bypassing-providers-in-angular-2.html) by Pascal Precht
- [Avoiding common confusions with modules in Angular](https://blog.angularindepth.com/avoiding-common-confusions-with-modules-in-angular-ada070e6891f) by Maxim Koretskyi
