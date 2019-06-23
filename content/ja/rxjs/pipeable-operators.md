---
title: パイプ用の演算子を使う
---

# 問題点

RxJS 6のリリースでパッチ演算子は削除されました。
これによりパッチ演算子を使うことはできません。

以下のようなコードはもう使えないでしょう。

```ts
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

Observable.interval(1000)
  .filter(x => x % 2 === 0)
  .map(x => x*2)
  .switchMap(x => mapToObservable(x))
```

# 解決策

代わりに、パイプ用の演算子を使用してください。

```ts
import { interval } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

Observable.interval(1000)
  .pipe(
    filter(x => x % 2 === 0),
    map(x => x*2),
    switchMap(x => mapToObservable(x)),
  );
```

古いバージョンのRxJSを使っていても、新しいコードはパイプ用の演算子を使って書かれるべきです。

## アップグレード

パッチ演算子を使って書かれたコードが多い場合、Googleのエンジニアによって書かれたスクリプトで自動的にアップグレードできます。
スクリプトと使い方は[rxjs-tslint](https://github.com/ReactiveX/rxjs-tslint#migration-to-rxjs-6)にあります。
