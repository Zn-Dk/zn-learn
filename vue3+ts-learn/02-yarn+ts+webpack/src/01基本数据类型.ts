(() => {
  // 命名数据类型的方式 foo:type = value
  // TS 使用 let / const 作为修饰符
  // 定义变量后 不能将类型不同的值赋给原始变量



  //////////////////////////////////////////////////////////////////////

  // 布尔类型
  let bol: boolean = false
  bol = true
  console.log(bol)
  // bol = 'false' 不能将类型“string”分配给类型“boolean”

  //////////////////////////////////////////////////////////////////////



  // 数字类型
  let a1: number = 10 // 十进制
  let a2: number = 0b1010  // 二进制
  let a3: number = 0o12 // 八进制
  let a4: number = 0xa // 十六进制
  console.log(a1, a2, a3, a4)


  //////////////////////////////////////////////////////////////////////


  // 字符串
  let str: string = 'haha'
  const msg: string = '我有 '
  const money: number = 1000
  const strMoney: string = '800'

  // 字符串与数字拼接 运算 遵循js
  console.log(msg + money)

  // 不支持 与字符串进行运算 (报错 算术运算右侧必须是 "any"、"number"、"bigint" 或枚举类型。)
  //console.log(money - strMoney)

  //////////////////////////////////////////////////////////////////////



  // null 和 undefined
  // 默认情况下 null 和 undefined 是所有类型的子类型。
  let u: undefined = undefined
  let n: null = null
  // 非严格模式下 - 可以把 null 和 undefined 赋值给 number 类型的变量。
  //u = 1

  // 严格模式下 可以采用这种方法

  let nu: number | null = null
  console.log('nu: ' + nu) // nu: null
  nu = 1
  console.log('nu: ' + nu) // nu: 1

  //////////////////////////////////////////////////////////////////////



  // 数组 -> 原 js 中的 Array 被拆分成了: Array 数组 / Tuple 元组


  // Array

  // 1 在注解类型后面加 []
  let numArr: number[]
  numArr = [1, 2, 3, 4]
  console.log(numArr)

  // 定义好类型的数组 是不能接受**定义之外**的类型的
  //numArr = ['1', '2'] // 不能将类型“string”分配给类型“number”

  // 2 使用数组泛型
  const bands: Array<string> = ['BMW', 'Toyota', 'Benz']
  console.log(bands)


  // Tuple

  // 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型**不必相同**

  let t1: [string, number]
  t1 = ['hello', 10.123] // OK
  // t1 = [10, 'hello'] // Error 必须位置上对应

  console.log(t1[0].split('')) // OK  ['h', 'e', 'l', 'l', 'o']
  console.log(t1[1].toFixed(2)) // OK 10.12
  //console.log(t1[1].split('')) // ERROR 类型“number”上不存在属性“split” (当访问一个已知索引的元素，会得到正确的类型)



  //////////////////////////////////////////////////////////////////////



  // 不使用 : 明确类型的情况

  // 变量的类型会被记录为第一次赋值的类型
  let a = 1
  // a = false ERROR
  a = 2

  let b = [1, 2, 3]
  b = [1, 2, 4]
  //b = 5 ERROR
  console.log(b)

  // 如果不赋初始值 变量的类型会被当成 any (应当避免)
  let c
  // 以下赋值都会正常进行 而不类型报错
  c = false
  c = 'ttt'
  c = [1, 2, 3]


})()