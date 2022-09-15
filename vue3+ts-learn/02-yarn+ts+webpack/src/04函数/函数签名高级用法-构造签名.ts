
// 函数的调用签名

// ，调用签名就类似“函数部分”，有了它就可以像调用函数一样调用对象类型

// 通过 type 定义函数的签名 这个函数现在可以有属性了 (interface也可以)
type IFn = {
  desc: string
  (num: number): boolean
}

// 要实现接口的函数 bar 传入 num: number 返回 boolean
function bar(num: number): boolean {
  console.log(num)
  if (num > 100) {
    return true
  }
  return false
}

bar.desc = 'Bar'

// 传入bar num 实参通过 foo 传入
function foo(fn: IFn, num: number) {
  console.log('Desc is:' + fn.desc + ' Return: ' + fn(num))
}

foo(bar, 123)
// 123
// Desc is:Bar Return: true



// 构造(函数)签名 (比较难懂 建议后期再理解)

// 调用签名之前加一个 new 关键字来写一个构造签名

class Ctor {
  constructor(public name: string) { }
}

// 可以将其理解为一个构造函数
type Constructor1 = {
  new(name: string): Ctor
}



function fn(name: string) {
  return new Ctor(name)
}



const f = fn('John')

console.log(f) // Ctor {name: 'John'}


interface MyInterface2 {
  new(name: string, age: number): Person;
}

// // 使用字面量方式的构造器签名
// function createInstNormal(clazz: new (name: string, age: number) => Person): Person {
//   return new clazz("Tom", 20);
// }

// // 使用接口对象字面量形式的构造器签名：
// function createInstNormal2(clazz: { new(name: string, age: number): Person }): Person {
//   return new clazz("Jim", 20);
// }

// // 使用接口形式的构造器签名：
// function createInstNormal3(clazz: MyInterface2): Person {
//   return new clazz("Marry", 20);
// }

// function testCreateInst() {
//   const inst1: Person = createInstNormal(Student);
//   inst1.run()
//   const inst2: Person = createInstNormal2(Teacher);
//   inst2.run()
//   const inst3: Person = createInstNormal3(Teacher)
//   inst3.run()

// }

// interface MyInterface3 {
//   new(name: string, age: number): Person;
// }


// // 泛型
// function createInstanceGeneric3<T>(clazz: MyInterface3, name: string = "defaultName", age: number = 18): T {
//   return new clazz(name, age);
// }
