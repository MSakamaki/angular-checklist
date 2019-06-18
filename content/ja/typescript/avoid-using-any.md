---
title: avoid using any
title: any型を使うことを避ける
---

# Problem

TypeScript allows us to write code that is statically type checked. This provides huge benefits. It helps us during development with auto completion, it simplifies working with third party libraries, helps us to refactor our code, spots errors during development that would have otherwise been runtime errors and much more.

# 問題点
TypeScriptを使ってコードを書くと、静的に型チェックを行えます。このことはTypeScriptを書く人にとって、非常に大きな恩恵をもたらします。例えば、オートコンプリート（自動補完機能）を用いて開発中の作業を簡単にしたり、サードパーティのライブラリを使用した作業を簡略化したり、さらにはコードのリファクタリングを行い、開発中に発生したエラーを発見します。


If we start using the `any` type, we lose all these benefits.

もし `any` 型を使い始めた場合、それらの全ての恩恵は失われます。

# Solution

The solution is to avoid the `any` type wherever possible in our code and we should define proper types instead.

Here's a classic example:

```ts
var x: number = 10;
var y: any = "a";
x = y;
```

See how we assign a string to `x` although `x` is defined as a `number`? That's a nightmare.

Let's look at another example:

```ts
const x: number = 10;
const y: any = 'a';
const z = x + y;

// Prints out 10a
console.log(z);
```

In the last example we add `x` and `y` together, and typing `y` as `any`, TypeScript cannot really help us and avoid this bug at development time. Basically, we end up with a concatenation and we’re essentially back in JavaScriptLand.

# 解決策

解決策としては可能な限り、コード内では `any` 型の使用を避けることです。そして `any ` 型の代わりに適切な型を定義すべきです。

こちらは古典的な例です。:

```ts
const x: number = 10;
const y: any = 'a';
const z: x + y;

//Prints out 10a
console.log(z);

```
例の最後では、 `x` に `y` を加算している式を作っています。このとき `y` を `any`  型として定義しているため、TypeScriptは我々エンジニアを助けてはくれず、開発時にこれによるバグを避けることができなくなります。つまり言ってしまえば、エンジニアはしまいには文字列連結にたどり着き、”じゃばすくりぷとランド”に戻ることになってしまいます。



## Compiler Options

Set the compiler `–noImplicitAny` flag. With this flag enabled the compiler will complain if anything has an implicit type of `any`.


## コンパイラオプション

コンパイラに `–noImplicitAny` フラグを設定します。このフラグを有効にすると、暗黙的な `any` 型の値があったときにコンパイラはエラーを出します。

## 3rd party libraries

When working with 3rd party libraries that are written in vanilla JavaScript, we most likely don't have type information available. Luckily there is an initiative to create type definitions for those libraries. If it exists, you can find it by installing the type package via `yarn add --dev @types/${library-name}`.

If this does not exist yet, you can create one yourself. Contributions are always welcome and appreciated.

## サードパーティのライブラリ

弱々エンジニアによるJavascript内で書かれた、サードパーティのライブラリが機能しているとき、おそらくコード内では有効な型情報を持っていない可能性が高いです。

しかし幸いなことに、これらのライブラリ向けに型定義を作成するためのイニシアチブ的手法があります。こういったクソコードが存在していたとき、あなたは `yarn add --dev @types/${library-name}` というtypeパッケージをインストールすることで、発見することができます。