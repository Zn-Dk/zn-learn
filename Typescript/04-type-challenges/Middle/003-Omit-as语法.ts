import type { Equal, Expect, NotAny } from '@type-challenges/utils'

// 结合Exclude
// type MyOmit<T, K extends keyof T> = {
//   [rest in Exclude<keyof T, K>]: T[rest]
// };

// 不使用 Exclude 的 as 关键字
// 这是 TypeScript 4.1 引入的 Key Remapping via as （键重映射）语法。
// [P in keyof T as NewKeyType]: T[P]
// as 的常见用法: 跳过(如下)

// as 的用法2 重命名:
// type Getters<T> = {
//   [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
// }

// as 的用法3 转换:
// type Stringify<T> = {
//   [P in keyof T as `${string & P}String`]: T[P]
// }
type MyOmit<T, K extends keyof T, > = {
  [rest in keyof T as (rest extends K ? never : rest)]: T[rest]
};

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}