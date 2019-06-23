---
title: プロダクションビルドにAOTコンパイルを使用する
source: https://github.com/mgechev/angular-performance-checklist/blob/master/README.ja-JP.md
author:
  name: Minko Gechev
  url: https://twitter.com/mgechev
---

# 問題点

Angularを使用したときにブラウザに配られるコードの大部分はコンパイラです。
HTMLライクなテンプレートをJavascriptに変換するにはコンパイラが必要になります。
このプロセスはバンドルサイズだけでなく、計算コストも高いため性能にも悪影響を与えます。

# 解決策

AOTを使う事で、ビルド作業の一環としてコンパイルを行い、コンパイラの出力を避けることができます。

AoTは、ツリーシェイキングにより効率的なバンドルを生成するだけでなく、アプリケーション実行時のパフォーマンスを向上させます。
AoTの代替になるのは実行時に実行されるジャストインタイムコンパイル（JiT）です。
つまり、ビルドプロセスの一環としてコンパイルすることで、アプリケーションのレンダリングに必要な計算量を減らすことができます。

# ツール一覧

* [@angular/compiler-cli](https://github.com/angular/angular/tree/master/packages/compiler-cli) - アプリケーションを静的解析して、コンポーネントのテンプレート用TypeScript/JavaScriptを発行する[tsc](https://www.npmjs.com/package/typescript)の代替品。
* [angular2-seed](https://github.com/mgechev/angular-seed) - AoTコンパイルのサポートを含むスタータープロジェクト。
* [Angular CLI](https://cli.angular.io/) ng serve --prod を利用する

# Resources

* [Ahead-of-Time Compilation in Angular](http://blog.mgechev.com/2016/08/14/ahead-of-time-compilation-angular-offline-precompilation/) by Minko Gechev
