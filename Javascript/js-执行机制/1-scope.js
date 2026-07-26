// 作用域 
(() => {
  let v = 1
  function foo() {
    console.log(v);
  }
  function bar() {
    let v = 2
    foo()
  }
  function baz() {
    let v = 2;
    (function () {
      console.log(v);
    }())
  }

  bar() // ?
  baz() // ?


  // bar - 1
  // baz - 2
  // 调用只跟定义时的环境有关, 而不是调用的上下文
  // foo 定义处的 v 就是最上层的全局作用域 v
  // baz 定义处的 v 就是 baz 函数内部的 v
})
  ;
// TDZ 问题
(() => {
  let v = 1

  function foo() {
    console.log(v);
    var v = 2

  }

  function baz() {
    try {
      console.log(v);
      let v = 2
    } catch (error) {
      console.error(error);
    }
  }

  foo() // ?
  baz() // ?

  // var let const 的区别
  // 在ecmascript 规范中, 代码执行上下文 Execution Context (EC) 包括
  // Lexcial Environment 词法环境 (ES6)
  // Variable Environment 变量环境 (ES5 以前)
  // This Binding this 绑定

  // var function 会存储在 VariableEnvironment, 
  // 而 let/const 由于是块级作用域会存储在 LexicalEnvironment

  // **核心: 不论是 var 还是 let const, EC创建时都会注册绑定**
  // var 的行为: CreateBinding(N) InitializeBinding(N, undefined)
  // let/const 的行为: CreateBinding(N) **并不初始化赋值!**, 此时状态是 uninitialized

  // 因此 let/const 只在 let/const 声明的那一行,在未初始化之前就是TDZ 暂时死区
  // 因此var 并非 "变量提升", 而是变量环境的提前赋值

  //   关键区别：
  // var：注册后立即初始化为 undefined
  // let/const：注册后不初始化，直到执行到声明语句

  // 所以准确的说法应该是：

  // ❌ "变量被提升了"
  // ✅ "变量在创建阶段被注册到环境记录中，但初始化时机不同"
})
  ;
// 执行EC详细过程
(() => {
  function example() {
    // 1. 创建函数执行上下文
    // VariableEnvironment 和 LexicalEnvironment 初始相同

    var x = 1;      // 注册到 VariableEnvironment
    let y = 2;      // 注册到 LexicalEnvironment (函数级)

    {
      // 2. 进入块级作用域
      // 创建新的 LexicalEnvironment，outer 指向外层
      let z = 3;  // 注册到新的块级 LexicalEnvironment
      var w = 4;  // 依然注册到函数的 VariableEnvironment

      console.log(x); // 通过 outer 链找到 VariableEnvironment
      console.log(z); // 当前块级 LexicalEnvironment
    }

    // 3. 退出块级作用域
    // LexicalEnvironment 恢复到外层
    console.log(w); // 4 (var 在函数级别，不受块级作用域影响)
    console.log(z); // ReferenceError: z 已被销毁
  }
  example()
})
  ;
// 箭头函数与普通函数
(() => {

  let a = 1
  var b = 2

  const t1 = () => {
    console.log('a', a, 'b', b)
  }

  function t2() {
    console.log('a', a, 'b', b)
  }

  t1()
  t2()
})
  ;
