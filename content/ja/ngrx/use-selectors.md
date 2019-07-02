---
title: セレクタを使ってストアからデータを選ぶようにする
---

# 問題点

ストアからデータを取得したい場合は、クエリを使用してデータを取得できます。 クエリの問い合わせは次のシグネチャ`(state: T) => K`といった関数です。

ストアから状態を取得する時に、かなり複雑で非効率だったりブロックするロジックが実行されます。
これは状態が変更されるたびに再実行されます。

また、私たちが定義した単純なクエリは新しいものを定義するため使えません。
これは複数の場所で同じクエリを定義する必要があるため、DRYの原則に違反します。

# 解決策

``@ngrx/store`はセレクタの概念を提供してくれます。
セレクタは`(state: T): K`型シグニチャを持つクエリを作成するのに役立ちます。
これらのセレクタの大きな利点は、それらが組み立て可能という事です。

`@ngrx/store`は他のセレクターを受け取って新しいセレクターを作成できる`createSelector`関数を持っています。
つまり、すべてのセレクタを一度だけ定義し、それらを複数の場所で再利用することができます。

簡単な例を見てみましょう。

```ts
// Plain Selector
export const selectFeature = (state: AppState) => state.feature;

// Composed Selector
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.counter
);
```

合成セレクタのもう1つの利点は、メモ化(memoization)と呼ばれる最適化手法を使用していることです。
セレクタの源泉が更新されなかった場合、セレクタのロジックは**再実行されません**。
なので、ストアからデータを取得する時に実行されるだろう複雑なロジックは、必要なときにのみ実行されます。

# 関連資料

* [Selectors in Ngrx](https://github.com/ngrx/platform/blob/master/docs/store/selectors.md)
* [NgRx: Parameterized selectors](https://blog.angularindepth.com/ngrx-parameterized-selector-e3f610529f8) by Tim Deschryver
* [Memoization](https://en.wikipedia.org/wiki/Memoization)
