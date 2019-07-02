---
title: コードの書式を整えるのにprettierを使う
---

# 問題点

コードを書くときはいつも、標準化された方法で書式を整えたいでしょう。これには2つの問題があります。

- 私たちのチームは全員が同じ基準に同意するよう調整する必要があります。
- 私たちは全員のIDE/エディタを同じものに必要があります。これはとても難しいでしょう。

# 解決策

Prettierは両方の問題を解決することに定評のあるコードフォーマッタです。
Prettierは書式形成に標準を強制し、書式形成がすべての環境で同じように行われることを確認できるCLIを持っています。
Prettierを追加してpre-commitフックとして実行すると、フォーマットされたコードのみチェックインできるようになります。

# 関連資料

- [Prettier](https://prettier.io/)
- [Add prettier to Angular CLI schematic](https://github.com/schuchard/prettier-schematic)
