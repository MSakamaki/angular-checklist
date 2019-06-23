---
title: @angular/cliを使う
optional: true
---

# 問題点

私たちがブラウザにコードを送る時には、最適化、バンドル、圧縮、難読化など、それ以外にも様々な事をする必要があります。
適切なビルドプロセスに関連する他の手順もありまが、これは非常に困難かつ面倒な作業で、特に維持するのが大変です。

# 解決策

この面倒な対応のために、ビルドプロセスに`@angular/cli`を使うべきです。
Angular CLIはAngularアプリケーションの開発を驚くほど簡単にします。
ビルドプロセスとは別に、CLIはプロジェクト全体やコンポーネントなどを簡単に作るためのコードの足場(scaffolding)生成機能も提供します。

CLIは私達の必要なことをすべて抽象化しています。
これにより我々は、ビルドプロセスを実現するための更に良い解決策があった場合、それを統合するのに何の努力もせずにこの更新を得られるでしょう。
バージョン6以降、ビルダーを通してビルドプロセス全体にフックすることも可能です。

# 関連資料

- [Angular CLI](https://cli.angular.io/)
- [Angular CLI under the hood - builders demystified](https://medium.com/dailyjs/angular-cli-6-under-the-hood-builders-demystified-f0690ebcf01) by Evgeny Barabanov
