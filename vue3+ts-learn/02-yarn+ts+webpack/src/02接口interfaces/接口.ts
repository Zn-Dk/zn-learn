// 使用接口（Interfaces）来定义对象的类型。接口是对象的状态(属性)和行为(方法)的抽象(描述)

/*

  需求 创建对象 数据结构如下
    id是number类型, 必须有, 只读的
    name是string类型, 必须有
    age是number类型, 必须有
    sex是string类型, 可以没有

  1. interface 关键字  友好的命名 I+interfaceName(可以表明这是一个接口)

  2. 接口类型的对象
      多了或者少了属性是不允许的
      无修饰符属性必填
      可选属性: ?
      只读属性: readonly

  P.S. 接口有变量提升(类似函数) 所以书写位置没有关系

*/

(() => {


  interface IPerson {
    id: number,
    name: string,
    age: number,
    sex: string,
  }

  // 类型检查器会查看对象内部的属性是否与IPerson接口描述一致, 如果不一致就会提示类型错误。

  // 类型“{}”缺少类型“IPerson”中的以下属性: id, name, age, sex
  // const p0: IPerson = {}

  // 不能将类型“number”分配给类型“string”
  // const p1: IPerson = { id: 1, name: 123 }

  // 不能将类型“number”分配给类型“string”
  const p2: IPerson = { id: 1, name: '小米', age: 14, sex: 'male' }



  //可选属性 在属性 **后面** 加 ?

  interface IPerson1 {
    id: number,
    name: string,
    age: number,
    sex?: string,
  }

  // 现在 sex 属性是可有可无的

  const p3: IPerson1 = { id: 2, name: '小李', age: 14 }

  const p4: IPerson1 = { id: 3, name: '小挖', age: 15, sex: 'female' }

  console.log(p3, p4)



  // 只读属性 在属性 **前面** 加 readonly 修饰符

  interface IPerson2 {
    readonly id: number,
    name: string,
    age: number,
    sex?: string,
  }

  const p5: IPerson2 = { id: 4, name: '小红', age: 14, sex: 'female' }

  console.log(p5)

  // p5.id = 100 // 无法分配到 "id" ，因为它是只读属性。
})()

