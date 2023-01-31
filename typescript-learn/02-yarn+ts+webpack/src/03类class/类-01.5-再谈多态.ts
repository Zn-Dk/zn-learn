// 用前端的思维去模拟多态

// 如果我们有几种类型的按钮

class Button {
  text: string;
  constructor(text: string = "Button") {
    this.text = text;
  }
  render() {
    console.log(`<button>${this.text}</button>`);
  }
}

class LinkButton extends Button {
  constructor(text: string) {
    super(text);
  }
  render(): void {
    console.log(`<a>${this.text}</a>`);
  }
}

class SpanButton extends Button {
  constructor(text: string) {
    super(text);
  }
  render(): void {
    console.log(`<span>${this.text}</span>`);
  }
  span() {
    console.log("secret message");
  }
}

const btnList: Button[] = [
  new Button(),
  new LinkButton("Link"),
  new SpanButton("span"),
];

btnList.forEach((btn) => btn.render());
// <button>Button</button>
// <a>Link</a>
// <span>span</span>

// --------- 以上 适用于继承子类的引用 ----------

//  --------- 如果我们要实现非继承类的多态 可以使用接口保证实现 ----------

interface IRender {
  text: string;
  render(): void;
}

class Img implements IRender {
  text: string;
  src: string;
  constructor(src: string, text: string) {
    this.text = text;
    this.src = src;
  }
  render(): void {
    console.log(`<img src="${this.src}" alt="${this.text}">`);
  }
}

const btnList2: Button[] = [
  new Button(),
  new LinkButton("Link"),
  new SpanButton("span"),
  new Img("1.jpg", "image"),
];

btnList2.forEach((btn) => btn.render());
// <button>Button</button>
// <a>Link</a>
// <span>span</span>
// <img src="1.jpg" alt="image">
