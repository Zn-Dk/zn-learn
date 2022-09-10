
(() => {

  // 与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

  interface IAnimal {
    sayHi(): void
  }

  interface IDog {
    jump(): void
  }

  interface IBird {
    fly(): void
    type: string
  }


  /*
    implements 关键字 意为 对XX接口的"实现"
    如果没有实现接口的方法...报错如下

      类“Puppy”错误实现接口“IDog”。
      类型 "Puppy" 中缺少属性 "jump"，但类型 "IDog" 中需要该属性。
  */
  class Puppy implements IDog {
    jump(): void {
      console.log('我是狗 我会跳')
    }
  }

  const pup = new Puppy()
  pup.jump()



  // 一个类可以实现多个接口, 用逗号分隔
  // 这个 Bird 类应该同时实现 IAnimal IBird 的方法
  class Bird implements IAnimal, IBird {
    // 实现属性
    type: string

    constructor(type: string = '未知类型') {
      this.type = type
    }

    // 实现方法
    sayHi(): void {
      console.log(`这是一只${this.type}鸟`)
    }

    fly(): void {
      console.log('它飞起来了')
    }
  }

  const bird1 = new Bird()
  bird1.sayHi() // 这是一只未知类型鸟

  const bird2 = new Bird('布谷')
  bird2.sayHi() // 这是一只布谷鸟
  bird2.fly() // 它飞起来了


  //////////////////////////////////////////////////

  // 上面的例子里 一个类可以实现多个接口 如果接口实现多了 代码会不好维护
  // 可以通过 extends 关键字 让接口继承多个接口

  interface IAnimalBird extends IAnimal, IBird { }

  class Bid implements IAnimalBird {
    type: string

    constructor(type: string = '未知类型') {
      this.type = type
    }

    sayHi(): void {
      console.log(`这是一只${this.type}鸟`)
    }

    fly(): void {
      console.log('它飞起来了')
    }
  }

  // 结果是一样的

  const bird3 = new Bid('杜鹃')
  bird3.sayHi()
  bird3.fly()


  // 使用交叉类型 实现多重接口继承

  interface A {
    a: number
  }
  interface B {
    b: string
  }
  interface C {
    c(): void
  }

  type All = A & B & C

  let al: All = {
    a: 1,
    b: '123',
    c() {
      console.log('ccc')
    }
  }

// 函数的形参也可以这么表示 而且不需要type声明
function getAll(obj: A & B & C) {
  // 这里会有智能提示
  console.log(obj.a, obj.b)
}

getAll(al)

// getAll({ a: 2 })
//类型 "{ a: number; }" 中缺少属性 "b"，但类型 "B" 中需要该属性。
})()

