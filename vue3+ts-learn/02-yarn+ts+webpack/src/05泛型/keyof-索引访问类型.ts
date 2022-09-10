// keyof 操作符

// keyof 运算符可以接收一个对象类型
// 它会产生它的 key 的字符串
// 或者与数字字面量的结合
// 或者可以说是一个联合类型

type Point = { x: number; y: number }

type P = keyof Point

// P 是 "x" | "y"
const p1: P = "x"
const p2: P = "y"
// const p3: P = "z" // 报错：不能将类型“"z"”分配给类型“keyof Point”。



// number 类型
type numish = {
  [i: number]: void
}

type Num = keyof numish

const n1: Num = 123
// const n2:Num = '45' // 不能将类型“string”分配给类型“number”




// string | number 类型 (number 是因为对象可以通过数字索引)
type mapish = {
  [i: string]: void
}

type Mapp = keyof mapish
// string | number

const m1: Mapp = 123
const m2: Mapp = '123'



// keyof 结合索引声明访问类型

type Person = {
  age: number,
  name: string,
  alive: boolean
}

// type 中声明类型可以访问属性值的方式取出
// type Age = Person['age']

// 由此可以
// 此处 Age 的类型是 number | string | boolean
type Age = Person[keyof Person]
let age: Age = 100
let age01: Age = "100"
let age02: Age = true


const stuArray = [
  { name: 'John', age: 14 },
  { name: 'Jahn', age: 15 },
  { name: 'Jzhn', age: 16 },
]

// type Stu = typeof stuArray[0]
// number 这里作为一个标识符 相当于取出任一一个作为type
type Student1 = typeof stuArray[number]

//  newStu: {name: string; age: number;}
const newStu: Student1 = {
  name: 'ZZ',
  age: 18
}

// 以下三种取值方法 得到的类型都是number
type Age1 = Student1['age']

type Age2 = typeof stuArray[number]['age']

const key = 'age'
type Age3 = Student1[typeof key]