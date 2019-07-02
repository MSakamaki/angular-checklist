---
title: ngIfAsを使って１度だけ購読する
---

# 問題点

Observableは、既定のふるまいとして怠惰(lazy)で単一の送信相手を指定して値を送信(unicast)します。
これは購読(subscription)ごとにObservableが実行されることを意味します。
購読時にObservableがバックエンド呼び出しをトリガーしている場合、次のコードは２回のバックエンド呼び出しが実行されます。

```ts
@Component({
  <some-component data="data$ | async"></some-component>
  <some-other-component data="data$ | async"></some-component>
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;
  ...
}
```

本来は１度だけしかデータを取りたくないので、これは意図した動作ではありません。

# 解決策

We can fix this problem in multiple ways, either with the `ngIfAs` syntax, or by making our Observable hot.

この問題を解決するには、`ngIfAs`構文か、ObservableをHotにすることで解決できます。

## ngIfAs構文

要素を隠すために`*ngIf`を使えますが、これを利用して観測値を_梱包_して値を変数にバインドし、その変数をテンプレート内で使うことが出来ます。

```ts
@Component({
  <div *ngIf="data$ | async as data">
    <some-component data="data"></some-component>
    <some-other-component data="data"></some-component>
  </div>
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;
  ...
}
```

divでコンポーネントをラップし、データが無い場合に要素を非表示にするすることで購読数を一つに減らすことができました。これで購読は1回しか行われていません。
`as`構文を使って観測イベントを取得してそれを変数にバインドし、その変数を使ってコンポーネントに受け渡すことも出来ます。

更に良くしたい時、無駄な要素で包みたくなければ `<ng-container>`要素を使うことができます。
この要素を使用すると、描画され見えないコンテナ要素の下に親しい要素をグループ化できます。

上記のコードを`<ng-container>`にした例が以下になります。

```ts
@Component({
  <ng-container *ngIf="data$ | async as data">
    <some-component data="data"></some-component>
    <some-other-component data="data"></some-component>
  </ng-container>
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;
  ...
}
```

これにより、実際のテンプレートは以下のようにレンダリングされるでしょう。

```html
<some-component data="data"></some-component>
<some-other-component data="data"></some-component>
```

## Observable hotを作る

すべての購読でObservableがバックエンド呼び出しを実行しなくするように、Observableをhotにする方法もあります。
hotなObservableは基本となる購読を共有するため1回しか実行されません。

複数の購読があっても問題にならなくなるため、これで問題が解決できます。

To do this, we can use for example the `shareReplay` operator.

`shareReplay`演算子を使う例を次に示します。

```ts
@Component({
  <some-component data="sharedData$ | async"></some-component>
  <some-other-component data="sharedData$ | async"></some-component>
})
export class SomeComponent implements OnInit, OnDestroy {
  sharedData$ = data$.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  ...
}
```

> 注意: メモリーリークを防ぐために`refCount：true`を指定しましょう。

# 関連資料

- [Multicasting operators in RxJS](https://blog.strongbrew.io/multicasting-operators-in-rxjs/) by Kwinten Pisman
