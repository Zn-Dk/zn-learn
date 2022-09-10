// 所谓索引签名，就是知道属性值的类型，不知道属性名，
// **特别是这个接口内的属性数量还不确定的时候**
// 定义一个类似 [props:string]: number 的东西，
// 表示属性名是 string 类型，属性值是 number 类型

interface IString {
  // index 只是一个象征
  [index: number]: string
}
interface IString2 {
  [index: string]: number
}

//可以给数组建立
const arr1: IString = ['a', 'b', 'c']

//也可以给对象 (这个对象只能有number属性)

const oStr: IString = {
  0: 'a',
  1: 'b',
  2: 'c'
}

// 换用不同规则的接口
const oStr2: IString2 = {
  a: 1,
  b: 2,
  c: 3
}

console.log(arr1)
console.log(oStr)
console.log(oStr2)

//可以注意到上面 的接口实现都没有限定属性个数 就是因为使用了索引签名


// 如果要指定属性名称实现 接口中的其他键值对都要满足原有索引签名规则
interface IString3 {
  [index: string]: number | number[], //使用联合类型解决list的报错
  // 类型“number[]”的属性“list”不能赋给“string”索引类型“number”
  list: number[],
  // OK
  count: number
}

// 实现接口
const oStr3: IString3 = {
  a: 1,
  b: [1, 2],
  count: 10,
  list: [1, 2, 3, 4, 5]
}