


// 明了 this 的指向之 - 隐式绑定
(() => {
  globalThis.name = 'window'

  // this指向的是调用者
  // func() === window.func()
  // obj.func() <= obj

  function func() {
    console.log('func', this.name);
  }

  const obj = {
    name: 'obj',

    func,

    func1: function () {
      console.log('func1', this);
      // func() === globalThis.func()
      func();
    },

    func2: function () {
      console.log('func2', this.name);
    },

    func3: () => { // 箭头函数 this 指向的是外层的 this
      console.log('func3', this);
      console.log('func3', this.name);
    },

  };

  func(); // func() === globalThis.func()  window

  obj.func(); // ?  obj
  obj.func1(); // ?  objThis / window
  obj.func2(); // ?  obj
  obj.func3(); // ? window, 如果是 node 环境则是 {}, 打印undefined
})
  ;

// 明了 this 的指向之 - 显式绑定
(() => {
  globalThis.name = 'window'

  function func() {
    console.log('func', this.name);
  }

  const obj = {
    name: 'obj',
    func,
  };

  func.call(obj) // ?  obj
  func.apply(obj) // ?  obj

  function fn(a, b) {
    console.log(a, b);
  }

  const bFn = fn.bind(o, 1, 2)
  bFn(3, 4) // 1 2 -> bind 的参数优先级更高
})
  ;

// 构造器new绑定
(() => {
  globalThis.name = 'window'
  function hello() {
    console.log(this.name);
  }
  function Person(name) {
    this.name = name
    this.hello = hello
    this.hello1 = function () {
      hello()
    }
  }

  const p = new Person('obj')

  p.hello()
  p.hello1()
})()
  ;
// 箭头函数
(() => {
  const arFn = () => {
    console.log(this, 'this');
  }
  const obj1 = {
    say() {
      arFn()
    }
  }
  const obj2 = {
    say: arFn
  }
  const obj3 = {
    say() {
      // 关键区别, 箭头函数 this 指向的是外层的 this
      // 这里因为作用域外层say是普通函数, 所以 this 指向的是 obj3
      (() => {
        console.log(this, 'this');
      })()
    }
  }
  const obj4 = {
    say() {
      obj1.say()
    }
  }

  obj1.say()
  obj2.say()
  obj3.say()
  obj4.say()
})()
  ;

// 严格模式this
(() => {
  'use strict'
  // 在浏览器中是 window，在 Node.js 中是 {}
  // 或者说 全局对象 globalThis
  console.log(this, 'this');

  function name() {
    console.log(this, 'thisFN');
  }
  name() // ?
})
