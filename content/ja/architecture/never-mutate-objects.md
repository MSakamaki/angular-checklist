---
title: 決してオブジェクトを変更せず、不変性(イミュータブル)を活用する
---

# 問題点

JavaScriptでオブジェクトを細かく比較するのは、とてもコストがかかります。しかし、参照によるチェックは非常にシンプルで高速です。
そのため、Angularや他の多くのライブラリは、オブジェクトを細かく比較するのではなく、参照による比較に頼っています。
オブジェクトを変更した場合は、こういったライブラリを使用したときに、もしかしたら奇妙で予想外の動作をするかもしれません。

オブジェクトを変更した時に正しく動作しない、いくつかの例を次に示します。

- AngularのChangeDetectionStrategy.`OnPush`
- NgRx selectors
- `distinct`、`distinctUntilChanged`、 `tap`などのRxJS演算子

# 解決策

オブジェクトを変更するのではなく、不変性を持った動きにする必要があります。
不変性とは、オブジェクトを変更しないことを意味します。
状態やオブジェクトのプロパティを更新する必要がある場合は、オブジェクトそのものを変更する代わりに、まずオブジェクトをコピーしてから変更を加えます。

これはobject/arrayのスプレット演算子を使って簡単に実行できます:

```ts
// オリジナルの状態
const state = {
  users: [
    { id: 1, name: "Dominic Elm" },
    { id: 2, name: "Kwinten Pisman" },
  ],
  selectedUserId = 1
}

// 新しい状態
const newState = { ...state, selectedUserId: 2 };
```

この例にはデータを含む状態オブジェクトがあります。
元のオブジェクトを変更せずに、`selectedUserId`プロパティを更新したい時、オブジェクトにスプレッド演算子を使用して、`users`配列への同じ参照を維持しながら`selectedUserId`を2に更新して、新しいオブジェクトを作成します。

**:注釈** この方法は私たちが不変性の動きを実現するための1つにすぎません。
スプレッド演算子は最新バージョンのJavaScriptで使用できます。
[Immutable.js](https://facebook.github.io/immutable-js/)、[Immer](https://github.com/mweststrate/immer)、[Seamless Immutable](https://github.com/rtfeldman/seamless-immutable)といった、大規模なコレクションでパフォーマンスが向上する不変性の動きを助けるライブラリもあります。
ここで重要なのは、この方法をどのように達成するかだけでなく、不変性を受け入れ、オブジェクトの変更を避けようとすることです。
