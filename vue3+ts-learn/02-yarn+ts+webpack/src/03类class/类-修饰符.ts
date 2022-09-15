/*
  属性访问修饰符: 用来描述类内部的属性/方法的可访问性
    public: 公开的外部也可以访问 在 TypeScript 里，成员都默认为 public。
    private: 只能类内部可以访问
    protected: 类内部和子类可以访问, 只是外部不能访问
    readonly: 只读属性必须在声明时或构造函数里被初始化。初始化之后在外部和内部都不能被修改
*/

(() => {

  class A {
    public name: string
    // private constructor(name: string) {
    //   this.name = name
    // }
    constructor(name: string) {
      this.name = name
    }
  }

  console.log(new A('a'))



  //////////////////////private///////////////////////



  // 不应该把构造函数设为 private
  // 无法扩展类“A”。类构造函数标记为私有。
  // class B extends A {
  //   constructor(name: string) {
  //     super(name)
  //   }
  // }
  // console.log(new A('a')) // 类“A”的构造函数是私有的，仅可在类声明中访问。

  class B {
    private name: string
    // private constructor(name: string) {
    //   this.name = name
    // }

    constructor(name: string) {
      this.name = name
    }

    // 内部可以调用 name
    showName(str: string) {
      console.log(this.name)
      this.showMsg(str)
    }

    // 内部调用
    private showMsg(str: string) {
      console.log(str)
    }
  }

  class C extends B {
    constructor(name: string) {
      super(name)
    }

    show() {
      // 子类也不能访问
      // 属性“showMsg”为私有属性，只能在类“B”中访问。
      // super.showMsg('Hello')
    }
  }

  //new B('b').name // 属性“name”为私有属性，只能在类“B”中访问。

  //new B('b').showMsg('Hello') // 属性“showMsg”为私有属性，只能在类“B”中访问。

  new B('b').showName('Hello') // 打印 b Hello



  //////////////////////protected///////////////////////



  class D {
    protected foo: number
    constructor(foo: number) {
      this.foo = foo
    }
    protected showD() {
      this.foo = 456
      console.log('showD')

    }
  }

  let d = new D(123)
  // d.foo = 456 // 属性“foo”受保护，只能在类“D”及其子类中访问。
  // d.showD()

  class E extends D {
    constructor(foo: number) {
      super(foo)
    }

    showFatherD() {
      // protected 子类可以访问
      super.showD()
    }
  }

  let e = new E(123)
  e.showFatherD() // 打印 showD
  console.log(e) // E {foo: 456}



  //////////////////////readonly///////////////////////



  // 只读属性必须在声明时或构造函数里被初始化。初始化之后在外部和内部都不能被修改

  class F {
    readonly r: number
    constructor(r: number) {
      this.r = r

      //可以在构造函数内修改
      r = 1000
    }
    changeR() {
      // 无法分配到 "r" ，因为它是只读属性。
      // this.r = 1000
    }
  }

  let f = new F(100)
  //f.r = 1000 // 无法分配到 "r" ，因为它是只读属性。
})()

