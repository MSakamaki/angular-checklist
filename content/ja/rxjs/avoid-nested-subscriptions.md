---
title: 入れ子になったsubscriptionを避ける
---

# 問題点

場合によっては、アクションを実行するために、複数のobservableから値を集計したり、入れ子になったobservableを処理したりする必要があります。
そのような場合、他のobservableのsubscribeブロックでobservableをsubscribeすることができますが、これは、subscribeのを複雑にしてしまい、コールバック地獄のようになってしまいます。

# 解決策

値を集約したり、入れ子になったobservableを処理するために、結合演算子(コンビネーション・オペレーター)または平坦化演算子(フラッディング・オペレーター)を使うことが出来ます。

次の例を考えてみましょう。
電子商取引システムでは、何かの商品を取得した時、その商品に関連する商品も取得するとします。

単純な解決策は次のようになります。

```ts
fetchProduct(1).subscribe(product => {
  fetchSimilarProducts(product).subscribe(similarProducts => {
    ...
  });
});
```

最初に、商品を取得してリクエストが解決されると一番外側のobservableブロックのsubscribeブロック内で関連商品を取得します。

これはアンチパターンかcode smell(深刻な問題があるかもしれない)と見なされます。

このcode smellを取り除いて、より優雅に解決するため、一つの平坦化演算子(`switchMap`)を使います。

```ts
fetchProduct(1).pipe(
  switchMap(product => fetchSimilarProducts(product))
).subscribe(...)
```

また、これは別の例です。
ユーザーが一覧をフィルタしてページ番号を付けられる単純な一覧画面です。
ユーザーが次のページに行くときにフィルターを考慮に入れる必要があります。

素朴な例

```ts
nextPage$.subscribe(page => {
  filter$.pipe(take(1)).subscribe(filter => {
    fetchData(page, filter).subscribe(items => {
      this.items = items;
    });
  });
});
```

複数の入れ子になったsubscriptionを使っているので、これも良い解決策でありません。

これを結合演算子(`withLatestFrom`)と平坦化演算子で修正しましょう。

```ts
nextPage$
  .pipe(
    withLatestFrom(filter$),
    switchMap(([page, filter]) => fetchData(page, filter))
  )
  .subscribe(items => {
    this.items = items;
  });
```

`nextPage$`と`filter$`の両方の変更を監視したい場合は、`combineLatest`を使います。

```ts
combineLatest(nextPage$, filter$)
  .pipe(switchMap(([page, filter]) => fetchData(page, filter)))
  .subscribe(items => {
    this.items = items;
  });
```

どちらの方法も読みやすく、コードの複雑さも軽減されます。

以下は良く使われる結合演算子と平坦化演算子です。

**結合演算子**:

- `combineLatest`
- `withLatestFrom`
- `merge`
- `concat`
- `zip`
- `forkJoin`
- `pairwise`
- `startWith`

**平坦化演算子**:

- `switchMap`
- `mergeMap`
- `concatMap`
- `exhaustMap`
