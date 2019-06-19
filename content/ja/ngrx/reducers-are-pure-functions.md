---
title: reducerは純粋な関数にする
---

# 問題点

リデューサーはアクションに基づいてアプリケーション内の状態を更新する作業を担当しています。
同じ入力を与えられたすべてのアクションが純粋に常に同じ結果となるよう決定論的にすることは、非常に重要です。
それらが純粋で無いのなら、私達は彼らを状態管理を任せることはできません。

# 解決策

レデューサーを純粋な関数として書くことによって、レデューサーが決定論的で、私達の状態を管理するために使えることが100％信頼できます。 純関数には以下の特性があります。

* 外部の状態には依存しません
* 副作用はありません
* 入力を変更しない
* 同じ引数を使って何度実行しても、常に同じ結果が返されます。

この特性がまさに、私達のリデューサーを決定論的にし、Reduxの重要な概念に従うために必要なものになります。

さらに、純粋関数はテストが非常に簡単になります。

**純粋でない**関数の例:

```ts
const state = 1;

function impureFunction(value: number) {
  return value + state;
}

// Returns 2
impureFunction(1);
```

`impureFunction`は外部の状態に依存しており、決定論的ではありません。
関数の外側に定義された`state`は、他の関数から見えてしまうので、コントロール不可能です。

Instead, we can make this function **pure** by passing in the data it needs:

代わりに必要なデータを渡してこの関数を**純粋**にすることができます。

```ts
const state = 1;

function pureFunction(value: number, otherValue: number) {
  return value + otherValue;
}

// Returns 2
pureFunction(1, state);
```

これで、`pureFunction`はパラメータにのみ依存しており、引数を変更することはなく、副作用もありません。

リデューサーについても同じことが言えます。リデューサーは以下のシグネチャ`(state, action) => state`.を持っています。
彼らは外部の状態に頼らず、入力を変更するべきではありません。
