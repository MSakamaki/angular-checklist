---
title: *ngForを使う時はtrackByオプションを利用する
source: https://github.com/mgechev/angular-performance-checklist/blob/master/README.ja-JP.md#use-trackby-option
author:
  name: Minko Gechev
  url: https://twitter.com/mgechev
---

# 問題点

`*ngFor`ディレクティブはコレクションを描画するのに使われます。
 基本的な動作として`* ngFor`は参照によってオブジェクトの一意性を識別しています。

つまり、開発者がアイテムのコンテンツの更新中にオブジェクトへの参照を破壊した場合、Angularはそれを古いオブジェクトが削除されて新しいオブジェクトが作成されたと認識します。
その結果として、リストにある古いDOMノードを破棄し、同じ場所に新しいDOMノードを追加します。

# 解決策

オブジェクトの一意性を識別するためAngularにヒントを提供できます、それは`*ngFor`ディレクティブの`trackBy`オプションにカスタムトラッキング関数を設定することです。
トラッキング関数は二つの引数があります、indexとitemです。 Angularは、トラッキング関数から返された値を使用してアイテムの一意性を追跡します。
一意なキーとしてレコードのIDを使用するのは一般的です。

```ts
@Component({
  selector: 'yt-feed',
  template: `
    <h1>Your video feed</h1>
    <yt-player *ngFor="let video of feed; trackBy: trackById" [video]="video"></yt-player>
  `
})
export class YtFeedComponent {
  feed = [
    {
      id: 3849, // "id"フィールドに注意してください、"trackById"関数でそれを参照します
      title: 'Angular in 60 minutes',
      url: 'http://youtube.com/ng2-in-60-min',
      likes: '29345'
    }
    // ...
  ];

  trackById(index, item) {
    return item.id;
  }
}
```

# 関連情報

- ["NgFor directive"](https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html) - Official documentation for `*ngFor`
- ["Angular  —  Improve performance with trackBy"](https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5) - By Netanel Basal
