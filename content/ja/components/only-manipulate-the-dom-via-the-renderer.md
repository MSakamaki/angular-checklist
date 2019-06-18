---
title: Rendererを介してのみDOMを操作する
author: 
  name: Billy Lando
  url: https://github.com/billyjov
---

# 問題点 

Angularのドキュメントによれば、DOMへの直接アクセスを行うとアプリケーションとレンダリングレイヤが密結合してしまい、この2つを分離してアプリケーションをWebワーカーに配備することが不可能になります。

したがって、jQueryや`document`オブジェクト、`ElementRef.nativeElement`を使う場合、サーバー（サーバーサイドレンダリング）やWebワーカーなど他のプラットフォームでは利用できないのでお勧めできません。

さらに、DOMへの直接アクセスを許可すると、アプリケーションが**XSS**攻撃に対してより脆弱になる可能性があります。

# 解決策 

DOM操作を行う時は`Renderer2`をなるべく利用してください。
ネイティブ要素への直接アクセスがサポートされていない場合でも安全に使用できるAPIです。

- **Bad practice**

```ts
@Component({
  ...
  template: `
    <textarea></textarea>
    <my-child-component></my-child-component>
  `
})
export class SomeComponent implements OnInit {

  constructor(private elementRef: ElementRef) {}
    
  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = '#fff';
    this.elementRef.nativeElement.style.display = 'inline';
    const textareaElement = document.querySelector('textarea');
    const myChildComponent = $('my-child-component');
  }
}
```

上のような例は`ElementRef`と`Renderer2`の２つを使ってリファクタリングすることができます。

- **Good practice**

```ts
import { MyChildComponent } from './my-child.component';

@Component({
  ...
  template: `
    <textarea #textareaRef></textarea>
    <my-child-component></my-child-component>
  `
})
export class SomeComponent implements OnInit {

  @ViewChild('textareaRef') myTextAreaRef: ElementRef;
  @ViewChild(MyChildComponent) myChildComponentRef: MyChildComponent;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
    
  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', '#fff');
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'inline');
    const textareaElement = this.myTextAreaRef.nativeElement;
    const myComponent = this.myChildComponent;
  }
}
```

# 関連資料

- [Angular Documentation for ElementRef](https://angular.io/api/core/ElementRef#description)
- [Exploring Angular DOM manipulation techniques using ViewContainerRef](https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02) by Max Koretskyi
