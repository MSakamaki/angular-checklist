---
title: 派生可能な状態を持たない。
---

# 問題点

データを保存するのに`@ngrx/store`を使うことができます。
複写されたデータを保持していると、reducerのロジックが一段と複雑になります。
それが起こり得る状態オブジェクトの次の型定義を見てください：

```ts
export interface ApplicationState {
  users: Array<User>;
  selectedUserId: number;
  selectedUser: User;
}
```

このシナリオでは`selectedUser`のIDと`selectedUser`のオブジェクトの両方が保存されています。
このやり方は多くの問題を引き起こします。
まず最初に、選択したユーザーを変更したら両方の参照を更新することを忘れてはいけません。
そして、さらに悪い事に、現在選ばれているユーザーが更新されるとどうなりますか？、これには`users`配列の参照と`selectedUser`の両方を更新する必要が出てきます。
これは見過ごされがちで、実装を難しく冗長にしてしまいます。

# 解決策

この問題を修正するには、**派生可能な状態を持たない**事です。
`users`と`selectedUserId`だけを持っていれば、どのユーザーが選択されているのかを簡単にたどる事ができます。
このロジックは、セレクターまたは合成セレクターに入れることができます。
定義を次のような状態オブジェクトにすることで問題を解決できます。

```ts
export interface ApplicationState {
  users: Array<User>;
  selectedUserId: number;
}
```

これで、ユーザーを更新するのに`users`配列の参照を更新するだけでよくなります。
