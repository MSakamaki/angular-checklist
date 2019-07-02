---
title: デフォルトのルートが定義されていることを確認してください
---

# 問題点

ユーザーはあなたのアプリケーションのURLを入力するとき、アプリケーションにどのようなルートがあるかを知りません。
そのため、常にランディングページやリダイレクトの設定がされてることを確認する必要があります。

# 解決策

Every application should define a default route. This is the route that will be used whenever the user goes to `/`.

アプリケーションは全般的にデフォルトルートを定義する必要があります。
デフォルトルートはユーザが`/`に行くたびに使われるルートです。

```ts
[
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  ...
]
```

ユーザが`/`に行こうとした時だけ動作するよう、`pathMatch: full`を設定しなければならない事に注意してください。
