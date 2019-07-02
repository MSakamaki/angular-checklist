---
title: すべて最新版を利用する
author: 
  name: Billy Lando
  url: https://github.com/billyjov
---

# 問題点 

Angularチームとコミュニティは、アプリケーションの構築を容易にするためのエコシステムを継続的に改善しています。
パフォーマンスとコンパイラ（Ivy Renderer等）の両方が、更に良いWebアプリケーションを構築するため、絶えず改善されています。

Angularはセマンティックバージョニング（semver）を使っています。これは定期的なリリーススケジュールになっており、6か月ごとのメジャーリリース、各メジャーリリースに対する1〜3のマイナーリリース、およびほぼ毎週のパッチリリースを含んでいます。
重要な新機能が含まれているので、メジャーリリースに追従するのは大切です。
アプリケーションの更新に間を置いてしまうと、将来の更新はより大変になってしまいます。
メジャーリリースには大きな変更が含まれている可能性があることに注意してください。

そして、APIが非推奨になった場合、削除されるまでに2つのメジャーリリースの猶予があります。 繰り返しになりますが、間を開けるとアップデートにはとても多くの作業が必要になる可能性があります。 廃止予定についての詳細は[changelog](https://github.com/angular/angular/blob/master/CHANGELOG.md)をご覧ください。

# 解決策

Angular Cliを使っているなら、次の手順に従うことができます：

- **Step 1:** 新しいfeatureブランチを作ります。  
- **Step 2:** プロジェクトディレクトリの中で`ng update @angular/core @angular/cli` を実行してください。
- **Step 3:** `ng serve`、`ng test`、 `ng build --prod`を実行して、アプリが期待通りに動作することを確認してください。
- **Step 4:** Angular Materialを使っているなら、非推奨、問題、スタイルなどの問題を修正して、以前の手順をもう一度実行してください。
- **Step 5:** メインブランチに対して、あなたの修正内容をマージまたはリベースしてください。

詳細については、[公式のアップデートガイド](https://update.angular.io/)で色々なバージョンからアップデートする方法を確認できます。

# 関連資料

- [Keeping your Angular Projects Up-to-Date](https://angular.io/guide/updating)
- [Don’t be afraid and just `ng update`!](https://itnext.io/dont-be-afraid-and-just-ng-update-1ad096147640) by Bram Borggreve 
