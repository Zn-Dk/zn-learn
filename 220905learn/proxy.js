//proxy 代理对象


// 实现 add[1][2][3] + 4 === 10

let originAdd = { sum: 0 }
let add = new Proxy(originAdd, {
  // target 被代理的对象
  // prop 访问的属性
  // receive 代理器本身(用于触发链式操作)
  get: function (target, prop, receiver) {
    // + 操作 发生了隐式类型转换 [Symbol.toPrimitive] 函数内部属性
    // 如果发生了类型转换(变为原始值)
    if (prop === Symbol.toPrimitive) {
      // 将之前计算的和返回 用于后续运算
      const temp = target.sum
      // 清空之前的值 以便后续其他代理器访问
      target.sum = 0;
      //Symbol.toPrimitive 是函数内部属性 需要返回函数
      return () => temp;
    } else {
      // 普通prop 进行求和
      target.sum += Number(prop)
      return receiver
    }
  }
})

console.log(add[1][2][3] + 4)