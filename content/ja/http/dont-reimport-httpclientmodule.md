---
title: HttpClientModuleを再インポートしない
---

# 問題点

`HttpClientModule`は私達にHTTP関連の機能を提供する責任があります。
その機能の一つとして、アプリケーションからサーバーへのHTTP要求を検査し変換するインターセプターを指定する機能です。
遅延ロードされたモジュールや遅延ロードしたモジュールに依存する`HttpClientModule`を再インポートしてしまうと、既存のHTTPインターセプタはそのモジュールに上書されてしまいます。

# 解決策

ルートモジュールで一度だけ `HttpClientModule`をインポートするようにしてください。

# 関連資料

- [HTTP_INTERCEPTORS are reset when re-importing HttpClientModule](https://github.com/angular/angular/issues/20575)