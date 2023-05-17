window.onload = () => {
  // 1. 定义一个类继承 HTMLElement 作为组件
  class MyWebComp extends HTMLElement {
    constructor() {
      super();
      this.init();
      this.initDestroy();
      this.evHandlers();
    }

    init() {
      // 4.创建 shallow-root
      // 两种模式的区别:
      // open - shadow root 元素可以从 js 外部访问根节点，例如使用 this/element.shadowRoot 返回一个 ShadowRoot 对象
      // open - shadow root 元素可以从 js 外部访问根节点，例如使用 this/element.shadowRoot 返回 null
      const dom = this.attachShadow({ mode: 'open' });
      // 5.寻找模板
      const template = document.querySelector('#temp');
      // 6.挂载模板字符串并对其深度克隆
      const content = template.content.cloneNode(true);
      this.content = content;
      // (7.) 可以接收来自标签上的属性
      console.log(this.attributes);
      const foo = this.getAttribute('foo');
      const bar = this.getAttribute('bar');
      const oP = document.createElement('p');
      oP.textContent = `传入属性 foo: ${foo}, bar: ${bar}`;
      // (7.1) 未挂载之前, 寻找内部节点
      const innerDiv = content.querySelector('div');
      innerDiv.appendChild(oP);

      // 挂载节点
      dom.appendChild(content);
    }

    evHandlers() {
      // 挂载后 查找元素
      const btn = this.querySelector('button');
      btn.addEventListener('click', this.onClick);
    }

    onClick() {
      const msg = this.getAttribute('msg');
      alert(msg || 'hello world');
    }

    initDestroy = () => {
      const destroyBtn = this.shadowRoot.querySelector('#destroy');
      destroyBtn.addEventListener('click', () => {
        this.remove();
      });
    };
    // 与 vue 类似 有生命周期钩子
    /**
     * connectedCallback：当 custom element首次被插入文档DOM时，被调用。
     * disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
     * adoptedCallback：当 custom element被移动到新的文档时，被调用。
     * attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。
     */

    connectedCallback() {
      console.log('component is connected(mounted)');
    }
    disconnectedCallback() {
      console.log('component is disconnected(unmounted)');
    }
    attributeChangedCallback() {
      console.log('增加、删除、修改自身属性');
    }
  }

  // 2. 定义customElement (组件名 kebab-case , 类)
  window.customElements.define('my-comp', MyWebComp);
};
