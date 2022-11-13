
(() => {

  /*
    参数属性

    声明类属性(如name)时 我们总是要先声明 后在构造函数内
    立刻将 name 的值赋给 this.name，这种写法比较重复繁琐。

  */

  // class Student {
  //   public name: string
  //   readonly id: string
  //   constructor(name: string, id: string) {
  //     this.name = name
  //     this.id = id
  //   }
  // }

  // 参数属性可以方便地让我们在一个地方定义并初始化一个成员
  // 但是要注意 public 需要特别声明出来 否则无法使用

  // 通过这种方法创造的Class 和 上面声明后使用功能上完全一致
  class Student {
    constructor(public name: string, readonly id: string) {
      // 这里就不需要在写 this...
      // this.name = name
      // this.id = id
    }
  }


  let stu = new Student('John', '000001')
  console.log(stu)

  //////////////////////存取器///////////////////////

  // 在类里面 TypeScript 支持通过 getters/setters 来截取对对象成员的访问。 (类似JS)

  class Info {
    constructor(public firstName: string, public lastName: string) { }

    // getters
    get fullName() {
      console.log('getting')
      return this.firstName + '-' + this.lastName
    }

    // setters (如果不设置 这个属性就变成了只读=>可以类比 Vue 的computed)
    set fullName(val) {
      console.log('setting')
      const name = val.split('-')
      this.firstName = name[0]
      this.lastName = name[1]
    }
  }

  const foo = new Info('John', 'Doe')

  console.log(foo.fullName) // getting => John-Doe

  foo.fullName = 'John-Smith'

  console.log(foo.fullName) // setting => getting => John-Smith

  console.log(foo) // {firstName: 'John', lastName: 'Smith'}
})()

