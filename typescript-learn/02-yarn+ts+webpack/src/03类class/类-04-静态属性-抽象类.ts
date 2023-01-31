
(() => {

  // 静态属性/方法  同 ES6 语法 这里不再赘述

  class F {
    static a: number = 1
    static b() {
      console.log('b')
    }
  }

  console.log(F.a)
  F.b()



  /*

    抽象类特性

      不可以被实例化
      含有声明但未实现的方法（也可以包含已实现的方法）
      一个类只能继承一个抽象类
      一旦有了抽象方法，就一定要把这个类声明为抽象类
      子类必须覆盖抽象类的抽象方法


    接口的特性

      不可以被实例化
      含有声明但未实现的方法
      一个类可以继承多个接口
      **所有成员都是默认Public的，因此接口中不能有Private成员
      子类必须实现接口的所有成员(如果没有 ? 修饰 )


    抽象类和接口的区别？

      抽象类是类（事物）的抽象，抽象类用来捕捉子类的通用特性，接口是行为的抽象
      接口可以被多次实现，而抽象类只能单一继承
      接口不具备继承的任何具体特点，仅仅承诺了能够调用的方法
      抽象类更多的定义是在一系列紧密相关的类之间，而接口大多数是定义在关系疏松但都实现某一功能的类中

    总结：
      抽象类是对类本质的抽象，表达的是 is a 的关系，比如：male is a Human。抽象类包含并实现子类的通用特性，将子类存在差异化的特性进行抽象，交由子类去实现。
      接口是对行为的抽象，表达的是 like a 的关系。比如：Baoma like a plane（它有飞的功能一样可以飞），但其本质上 is a Car。接口的核心是定义行为，即实现类可以做什么，至于实现类主体是谁、是如何实现的，接口并不关心。

  */

  abstract class Animal {
    //预定义一个 name 属性 不可以给初始值
    abstract name: string
    constructor(name: string) { }
    // 预定义一个未实现 cry 方法 在子类中需要实现 (不能在抽象类中写明)
    abstract cry(): void

    //已实现的方法
    run() {
      console.log(' Animal run()')
    }
  }

  class Dog extends Animal {
    constructor(public name: string = "狗") {
      super(name)
    }

    //抽象类的实现
    cry() {
      console.log(' Dog cry()')
    }
  }

  class Cat extends Animal {
    constructor(public name: string = "猫") {
      super(name)
    }

    //抽象类的实现
    cry() {
      console.log(' Cat cry()')
    }
  }

  // const ani = new Animal() // 无法创建抽象类的实例

  const dog = new Dog('小黄')
  const cat = new Cat('小花')

  console.log(dog.name) // 小黄
  console.log(cat.name) // 小花

  dog.cry()

  dog.run()
})()

