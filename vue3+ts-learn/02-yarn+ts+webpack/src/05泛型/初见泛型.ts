// 只能返回 number 类型！
function identity(arg: number): number {
  return arg
}

// 变成了 anyScript
function identity2(arg: any): any {
  return arg
}

// 使用泛型
// 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。

// 表示法 <T> 尖括号 T 代表对类型的代称 它可以是任意字符串
// 一般写 T(ype) K(ey) V(alue)  是比较常见的

// 指定 T 是某种类型 则 参数返回值都可以通过自动识别
// 泛型只能表示成类型 不能作为值使用
function identity3<T>(arg: T): T {
  return arg
}

// 一旦指定泛型 就会产生约束和语法检查
console.log(identity3<string>('abc'))

console.log(identity3<number>(123))


function fillArr<T>(val: T, count: number): T[] {
  // 数组的类型就可以用T代替
  const arr: T[] = []
  for (let i = 0; i < count; i++) {
    arr.push(val)
  }
  return arr
}

console.log(fillArr<number>(123, 5))
// [123, 123, 123, 123, 123]

console.log(fillArr<string>('a', 5))
// ['a', 'a', 'a', 'a', 'a']