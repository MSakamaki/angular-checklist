---
title: ngOnDestroyでリソースの開放を行う
---

## 問題点

Angularはコンポーネントを作成する最、ユーザー入力の取得、バックエンドからのデータ取得、アニメーションの作成時でなどで、リソースを使用します。
リソースが使用されるケースは色々とあり。 Observables、ブラウザAPI、イベントリスナ、その他の手段で利用されますが、それらのリソースは不要になった時に解放する必要があります。
**そうしなければ**、メモリリークが発生してアプリケーションがクラッシュし、その他の望ましくない動作が発生するでしょう。

## 解決策

Angularは、すべてのコンポーネントとディレクティブに対して、作られた時、描画された時、データバインドプロパティが変更されたときなど、コンポーネントの重要な瞬間を可視化するライフサイクル・フックを提供します。

リソースを解放するために、コンポーネントの `ngOnDestroy`ライフサイクルにフックすることができます。
このフックは、コンポーネントが破棄されてDOMから削除される**前に**呼び出されます

次の例は、`setInterval`APIを使って5000msごとに実行される関数を設定しています。
`ngOnDestroy`の中では、intervalをクリアしてリソースを解放しています。

```ts
@Component({
  ...
})
export class SomeComponent implements OnInit, OnDestroy {
  intervalId;

  ngOnInit() {
    this.intervalId = setInterval(() => {...}, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
```
