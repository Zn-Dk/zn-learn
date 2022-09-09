(() => {
  // 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。
  // 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

  interface ITestFn {
    // 定义函数的调用签名 传入的参数类型 以及函数返回值
    (test: string, reg: RegExp): boolean
  }

  // const regTest: ITestFn = function (test: string, reg: RegExp): boolean {
  //   return reg.test(test)
  // }

  // 上下两种方法 一个是普通函数 一个是箭头函数 都需要声明一个变量去实现接口
  const regTest: ITestFn = (test: string, reg: RegExp): boolean => {
    return reg.test(test)
  }

  console.log(regTest('abcdef', /[a-z]{3,10}/)) // true

  console.log(regTest('ABC', /[a-z]{3,10}/)) // false
  

})()

