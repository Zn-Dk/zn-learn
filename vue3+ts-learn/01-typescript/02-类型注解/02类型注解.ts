(() => {

  // 从hello world 的例子来看 在函数传递参数的时候我们限制了类型
  // 类型注解 就是 ts 在静态地给我们 约束了参数类型 保证了参数类型传递的过程中不会被错误的使用
  // 目前了解到的 可以为基本的 number string null undefined
  const say = (msg: string) => {
    return 'I say: ' + msg
  }
  const txt = 'Hello World'
  //const num = 123
  // 类型“number”的参数不能赋给类型“string”的参数。
  // 这里就给出了错误提示 帮助我们纠正代码
  // 但是编译 js 仍然可以正常进行 函数也会输出 I say: 123, 只是 ts 语法错误
  console.log(say(txt))
})()