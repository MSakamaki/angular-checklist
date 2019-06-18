---
title: define actions as classes
---

# 問題点

ストアにアクションを送信するときには、typeプロパティと追加のメタデータ（payloadプロパティとして追加されることが多い）を持つオブジェクトを送信する必要があります。
送信するたびにオブジェクトを再作成できますが、DRYの原則に違反します。

NgRxの誓約の1つに、やり過剰な型の安全性を提供するという事があります。
これはプレーンなオブジェクトでは達成できないことです。

# 解決策

私達は自分のアクションをクラスとして定義できる事を求めます。
クラスを使用してアクションを定義するときに個別のファイルに定義して、どこでも再利用できるようにします。

これがアクションを定義する方法の例です。

```ts
import { Action } from '@ngrx/store';

export enum AppActionTypes {
  APP_PAGE_LOAD_USERS = '[App Page] Load Users'
}

export class AppPageLoadUsers implements Action {
  readonly type = AppActionTypes.APP_PAGE_LOAD_USERS;
}

export type AppActions = AppPageLoadUsers;
```

これにより、`AppPageLoadUsers`クラスを使用してアクションをストアに送信し、それをリデューサーに渡すことができます。

**注意** 文字列リテラルや共用体型(union types)などの機能を使用してアクションが定義されるので、アクションのペイロードに型にすることで、ユニオン判別を利用して私たちのレデューサーでは極端なほどの型の安全性を得ることができます。詳細については関連資料を参照してください。

# 関連資料

- [Type safe actions in reducers](https://blog.strongbrew.io/type-safe-actions-in-reducers/) by Kwinten Pisman
