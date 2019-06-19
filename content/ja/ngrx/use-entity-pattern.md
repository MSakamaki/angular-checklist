---
title: 大規模なコレクションにエンティティパターンを使用する
---

# 問題点

私達のアプリケーションは、データを保存しておくために多くの配列を使います。
ユーザーの一覧を取得してビューに表示したい場合、`* ngFor`ディレクティブを使うことで簡単にそれらを繰り返することもできます。
たとえば、後でそのデータを再取得したり、一覧が他のコンポーネントの影響を受けたりしないように、データをストアに保存することができます。

しかし、配列を更新、削除、または一覧から特定の行を取得したいときには、配列はパフォーマンスの良い解決策ではありません。
 れらをすべて計算するのに線形の時間複雑度O(n)を必要とします。
大規模なコレクションの場合、パフォーマンスに多大な影響を与える可能性があります。

# 解決策

To make the CRUD operations more efficient we can adopt the entity pattern. This means that we will no longer store the data as an array but transform it to an object where the key is the unique identifier of the element and the value is the actual element. This is also called state normalization.

CRUDをより効率的にするために、エンティティパターンを使うことが出来ます。
これはデータを配列として格納するのではなく、キーに要素の一意となる識別子を設定したオブジェクトに変換するということです。
これは状態正規化(state normalization)とも呼ばれます。

これが例です。

```ts
const contacts = [
  { id: 1, name: 'Dominic Elm' },
  { id: 2, name: 'Kwinten Pisman' }
];
```

上の配列を次のように正規化できます。

```ts
const entities = {
  1: { id: 1, name: 'Dominic Elm' },
  2: { id: 2, name: 'Kwinten Pisman' }
};
```

これで要素の検索、削除、更新すべてがO(1)の複雑さになります。

**注釈** これはよくあるNgRxのパターンなので、エンティティパターンを実装するのに便利な`@ngrx/entity`と呼ばれる別パッケージがあります。

# 関連資料

- [@ngrx/entity](https://github.com/ngrx/platform/tree/master/docs/entity)
