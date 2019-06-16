---
title: ビジネスロジックはサービスに入れる
---

# 問題点

Angularでは、多層アーキテクチャを使ってアプリケーションを作成します。
アプリケーションのすべての層はそれぞれで自身の責任を持つべきです。
これにより層が分離され、それぞれが自分の事だけに配慮できる事を意味します。
アプリケーションのビジネスロジックは、コンポーネント層に属していません。
コンポーネント層は純粋に視覚化、ユーザインタフェースの表示、ユーザ入力の処理に使用されることを意図しています。
そのため、ビジネスロジックはサービス層に書き出す必要があります。

# 解決策

次の例では、バックエンドからデータを取得するために`HttpClient`を使っています。
これはコンポーネント層から行うべきではないため、ロジックを専用サービスに移動します。

```ts
@Component({
  ...
})
export class SomeComponent implements OnInit {
  data$;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.data$ = this.http.get('http://some-api.com/');
  }
}
```

このようにリファクタリングしてロジックを`PeopleService`に移動することができます。

```ts
@Component({
  ...
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.data$ = this.peopleService.getPeople();
  }
}
```
