
// 相比 ES6 TS中 函数的参数解构还需要在参数解构的时候表明属性的类型
function sum({ a, b, c }: { a: number, b: number, c: number, }) {
  return a + b + c
}

let res = sum({ a: 1, b: 2, c: 3 })

console.log(res)


// 但是对于对象来说是不必的 可以依赖类型推断

const o = {
  a: 1,
  b: 'zzz',
  c: [1, 2, 3]
}

// let { a, b, c } = o

// 当然 多写也是没问题的
let { a, b, c }: { a: number, b: string, c: number[] } = o

console.log(`a: ${a}, b: ${b}, c: ${c}`)