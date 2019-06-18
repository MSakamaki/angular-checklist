---
title: ngOnInitライフサイクルフックに初期化処理を入れる
---

# 問題点

コンストラクタはそのコンポーネントのインスタンスの構築中に呼び出されているクラスの機能です。
Angularはコンストラクタを利用して、要求した依存関係を提供します。
しかし、コンポーネントの作成でAngularの機能が完全に完成したという意味ではありません。
例えば、`@Input`バインディングはこの時点では初期化されません。
Angularは機能としての準備ができたら`ngOnInit`ライフサイクルフックが呼び出されます。

コンストラクタ内への処理、例えばデータ取得に関わるロジックを配置すると、Angularがコンポーネントの作成を完了する前に処理を実行してしまいます。
これはコードのテストにも影響が出るでしょう。
ユニットテストでは、コンポーネントのインスタンスを `beforeEach`ブロックでインスタンス化しますが、すでに何らかのロジックを初期化したりデータを取得したりする場合、他のすべてのテストに影響してしまい、特定のロジックをテストすることが難しくなってしまいます。

# 解決策

これを修正するには、テストで必要な`@Input`バインディングを使用するすべての初期化ロジックを、`ngOnInit`ライフサイクルフックに移動する必要があります。

コンストラクタは依存関係を注入するためだけに使うべきです。

これが具体例です。

```ts
@Component({
  template: `...`
})
export class SomeComponent {
  users$: Observable<User>;

  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.getUsers();
  }
}
```

コンストラクタから`ngOnInit`ライフサイクルフックにコードを移動するようなリファクタリングを行います。

```ts
@Component({
  template: `...`
})
export class SomeComponent implements OnInit {
  users$: Observable<User>;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }
}
```

# 関連資料

- [The essential difference between Constructor and ngOnInit in Angular](https://blog.angularindepth.com/the-essential-difference-between-constructor-and-ngoninit-in-angular-c9930c209a42) by Maxim Koretskyi
