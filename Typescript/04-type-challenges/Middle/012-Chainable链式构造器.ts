import type { Alike, Expect } from '@type-challenges/utils'

// declare const config: Chainable

// const result = config
//   .option('foo', 123)
//   .option('name', 'type-challenges')
//   .option('bar', { value: 'Hello World' })
//   .get()

// // 期望 result 的类型是：
// interface Result {
//   foo: number
//   name: string
//   bar: {
//     value: string
//   }
// }

// 自己写出来的版本
type Chainable<Acc = {}> = { // 用Acc泛型做存储
  option: <K extends string, V>(k: K, v: V) 
    => Chainable<Acc & { [k in K]: V }>; // 递归传入
  get: () => Acc
}


// all cases 增加了同名值需要覆盖的逻辑
declare const a: Chainable

// 更完善的版本
// type Chainable<T = {}> = {
//   option<K extends PropertyKey, V>(key: K extends keyof T ? never : K, value: V): Chainable<Omit<T, K> & { [P in K]: V }>
//   get(): {
//     [P in keyof T]: T[P]
//   }
// }

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}
