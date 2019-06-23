---
title: asyncパイプを使う
---

# 問題点

Angularでは、非同期をObservablesによって処理しており、それらを購読(subscribe)することによって実行されます。
購読する時は購読を解除することも非常に重要です。
購読を解除するとストリームによって使用されているリソースが開放されます。
これを怠ると、メモリリークが発生する可能性があります。

手動で購読する場合、同じく手動で購読を解除する必要がありますが、これは忘れがちです。

# 解決策

手動で購読する代わりに、Angularの提供する`async`パイプを使うことができます。

asyncパイプは以下のような事を行います:

- Observableを購読する
- コンポーネントが破壊されたときに、`onDestroy`フックに連携してObservableから登録を解除する
- 次の変化検出サイクルのために、このコンポーネントを「チェック対象」としてマークする

なるべく`async`パイプを使うことでリソースが正しくクリーンアップされ、メモリリークの可能性を減らせます。

これがその例です:

```ts
@Component({
  template: `{{data$ | async}}`,
  ...
})
export class SomeComponent {
  data$ = interval(1000);
}
```

これは毎秒値を出す`interval`を設定しています。
これは長命のObservableですが、`async`パイプを使っているのでリソース（購読）はコンポーネントが破壊されたときに開放されます。

# 関連資料

[Three things you didn't know about the async pipe](https://blog.thoughtram.io/angular/2017/02/27/three-things-you-didnt-know-about-the-async-pipe.html) by Christoph Burgdorf
