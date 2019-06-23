---
title: 最小限の処理しかしないコンポーネントにはonPush CD戦略を使用する
---

# 問題点

Angularの変更検出（CD）は上から下に向けて実行されます。
これは全てが一度だけチェックされることを意味しています。
このふるまいは全てが安定するまで変更検出サイクルが実行されていたAngularJSと比べると大きく変わっています。

それでも、CDが起動される毎に全てがチェックされてしまう事は事実です。

# 解決策

Angularのコンポーネントは変更検出では`Default`や`OnPush`のような戦略を使うことが出来ます。

初期設定(`Default`)では、CDサイクルごとにコンポーネントがチェックされます。

`OnPush`戦略ではコンポーネント（とそのすべての子コンポーネント）は`@Input`の一つが変更された場合（参照チェック）**または**イベントがコンポーネント内でトリガーされた場合にのみチェックが走ります。

これを利用して`OnPush`戦略を有効にすれば、コンポーネントツリーの大部分に対してCDを実行しないよう、簡単にAngularへ指示が可能となるため、大幅な高速化を可能となります。

```ts
@Component({
  ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

**注釈 1:** これは、我々のコードが常に不変となるよう努めるべきであることを意味しています。 ある配列に要素を追加して配列を変化させます、そしてそれを視覚化するために`OnPush`戦略が適用されたコンポーネントへ渡します。
このコンポーネントは参照のみをチェックしており、Angularは配列の内容までチェックしていないためCDはそのコンポーネントに対して実行されず、画面も更新されません。

**注釈 2:** また、私たちがこの戦略を適用するすべての要素は、ダム(最小限の処理しかしない)でなければならないことを意味します。
もしコンポーネント自身が自分のデータを取得するような振る舞いをするならば`OnPush`戦略は使えません。でなければ、`@Input`がCDを実行する唯一の理由ではなくなてしまい、データが取得される事もトリガーとしなければならなくなります。

**注釈 3:** `async`パイプを使うと内部で自動的に`markForCheck`が呼び出されます。これによって、そのコンポーネントへのパスが「チェック対象」としてマークされます。なので、次のCDサイクルが始まると、コンポーネントのパスは残っておりビューが更新されます。

# 関連資料

- [Angular change detection explained](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html) by Pascal Precht
- [Everything you need to know about change detection in Angular](https://blog.angularindepth.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f) by Maxim Koretskyi
