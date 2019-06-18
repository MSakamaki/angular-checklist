---
title: 全てをストアに置いてはいけない。
---

# 問題点

`@ngrx/store`（一般的にはRedux）は私達に多くの素晴らしい機能を提供し、様々なユースケースで使うことができます。
しかし、時にはこのパターンがやり過ぎな事もあります。
その実装では、メリット（予測可能なステートコンテナと一方向のデータフロー）の恩恵を受けることなく、Reduxを利用（多くの余分なコードと複雑さ）のマイナス面だけを得てしまいます。

# 解決策

NgRxコアチームは **SHARI** と呼ばれる原則を考え出しました。これは、ストアに追加する必要があるデータの経験則として使用できます。

- Shared: 多くのコンポーネントとサービス間で共有されている状態
- Hydrated: ページをリロードしても永続化される、およびhydratedが必要な状態
- Available: ルーティングにアクセス時、利用可能になる状態
- Retrieved: 副作用の結果で取得する状態（ HTTPリクエストなど）
- Impacted: 他のコンポーネントによる影響を受ける状態

過剰なまでの状態管理の層を設計しないでください。
データはXHRリクエストを介して取得されるか、WebSocketを介して送信されることが多いためサーバー側で処理されます。
データをクライアントのストアに保存し、代替手段をが無いか常に**いつ**と**どうして**で確認してください。
たとえば、フィルタの結果をリストに反映するためにルーティングを使用したり、設定などの単純なデータを保存する必要がある場合は `BehaviorSubject`をサービスで使用します。
Mike Ryanがこの話題について非常に良い講演をしました：[あなたはNgRxを必要としないかもしれません](https://youtu.be/omnwu_etHTY)

# Resources

- [Reducing the Boilerplate with NgRx](https://www.youtube.com/watch?v=t3jx0EC-Y3c) by Mike Ryan and Brandon Roberts
- [Do we really need @ngrx/store](https://blog.strongbrew.io/do-we-really-need-redux/) by Brecht Billiet
- [Simple State Management with RxJS’s scan operator](https://juristr.com/blog/2018/10/simple-state-management-with-scan/) by Juri Strumpflohner
