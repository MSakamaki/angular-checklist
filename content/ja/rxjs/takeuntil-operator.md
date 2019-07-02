---
title: 購読(subscribe)を強制的に管理しない
---

# 問題点

Observableを購読(subscribe)すると、購読をやめる時には購読を解除する必要があります。
次のようにすれば購読を解除できます。

```ts
// 購読オブジェクトへの参照を保持します。
const 購読 = interval(1000).subscribe(console.log);

// 購読オブジェクトを使用して購読を強制終了する
購読.unsubscribe();
```

しかし、複数の購読を行っている場合、そのすべてを管理しなければいけません。
配列で管理することはできますが、非常に冗長になります。
私たちはこれを命令的にしたくはありません。

# 解決策

RxJSは`takeUntil`演算子や他の条件付き演算子を提供してくれます。
この演算子は特定のイベントが発生するまで観測可能なソースをミラーリングし、コンポーネントが破棄されたときにObservablesを監視しないようにできます。
これは、次のように書くことができます。

```ts
@Component({...})
export class SomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  users: Array<User>;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    // long-living stream of users
    this.usersService.getUsers()
     .pipe(
       takeUntil(this.destroy$)
     )
     .subscribe(
       users => this.users = users;
     );
   }

   ngOnDestroy() {
     this.destroy$.next();
   }
}
```

`destroy$`という名前の`Subject`を作成し、`ngOnDestroy`フックが呼び出されると、subjectに値を`next`します。

`ngOnInit`フックで定義した購読は`takeUntil`演算子を使いsubjectと結合させます。
これは、`destroy$`が値を発行する**まで**、購読が生きていることを意味します。 その後、ソースのストリームの購読を中止して完了します。

これは、購読を命令的に処理するよりもはるかに優れています。

**注意:** `async`パイプを使えば、このような問題を全く考える必要がないのでさらに良いでしょう。destroyライフサイクルフックに連携して購読を自動で中止してくれます。

# 関連資料

* [RxJS: don't unsubscribe](https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87) by Ben Lesh
* [RxJS: Avoiding takeUntil leaks](https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef) by Nicholas Jamieson
