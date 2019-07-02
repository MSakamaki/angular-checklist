---
title: キャンセルが必要な場合にのみswitchMapを使用してください。
---

# 問題点

特定のシナリオでRxJSの間違った平坦化演算子(フラッディング・オペレーター)が使われると、予期しない動作や競合状態が発生する可能性があります。

# 解決策

例にあげるとしたら、電子商取引アプリケーションで、ユーザーは自分のショッピングカートに商品を追加したり削除したりできるとしましょう。
次にあるのはアイテムを削除するためのロジックです。

```ts
removeItemButtonClick.pipe(
  switchMap(item => this.backend.removeFromCart(item.id))
)
```

ユーザーがボタンをクリックして特定の商品をショッピングカートから削除すると、このアクションはバックエンドに転送されます。
ほどんどは予想どおりに機能するでしょうが、商品がカートからどれだけ早く削除されるかによって動きが変わってきます。
たとえば、すべてのアイテムを削除した時や、一部のアイテムだけを削除したときです。

この例では、`switchMap`演算子を使ってはいけません。
何故なら新しいアクションがあるたびに前のアクションが中止/キャンセルされてしまうからです。
この`switchMap`の振る舞いはcreate、update、deleteアクションが危なくなります。

より状況にあった他の平坦化演算子があります

- `mergeMap`: 放出(emissions)を同時に処理する
- `concatMap`: 放出を逐次的に処理する
- `exhaustMap`: 何かの放出を処理している間は、新たな放出はキャンセルする

`mergeMap`で上にある問題を解決することができます。

```ts
removeItemButtonClick.pipe(
  mergeMap(item => this.backend.removeFromCart(item.id))
)
```

順番が重要な時は`concatMap`を使うと良いでしょう。

詳しい内容は、下記の[Nicholas Jamieson](https://twitter.com/ncjamieson)を参照してください。

# 関連資料

- [RxJS: Avoiding switchMap-Related Bugs](https://blog.angularindepth.com/switchmap-bugs-b6de69155524) by Nicholas Jamieson
