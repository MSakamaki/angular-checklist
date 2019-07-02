---
title: テンプレート内のロジックは最小限に抑える
---

# 問題点

テンプレートのロジックが多すぎると、アプリケーションのテストは難しくなります。
単純なユニットテストにすれば、テストを早く書いて実行できます。
もちろん、コンポーネントのテンプレートで単体テストをすることもできますが、それにより複雑になり、対処すべき課題がいくつか発生してしまいます。

そして、テンプレート内のロジックが多すぎると、可読性を下げます。
何をしているのかをぱっと見で理解できなくなります。

# 解決策

テンプレートにロジックを詰め込みすぎないようにしてください。

For example here, we have have an `*ngIf` that has too much logic.

この例は、ロジックが複雑すぎる`*ngIf`があります。

```ts
@Component({
  template: `<div *ngIf="users && users.length > 1 && visible">content to show</div>`
})
export class SomeComponent {
  users: User[];
  visible: boolean;
}
```

ロジックをコンポーネントのクラスに書き出すことでこれをリファクタリングできます。
これでテンプレートが読みやすくなり、ロジックをテストしやすくなります。

```ts
@Component({
  template: `<div *ngIf="usersExistsAndVisible()">content to show</div>`
})
export class SomeComponent {
  users: User[];
  visible: boolean;

  usersExistsAndVisible() {
    return this.users && this.users.length > 1 && this.visible;
  }
}
```
