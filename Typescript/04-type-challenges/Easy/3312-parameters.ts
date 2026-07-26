import type { Equal, Expect, NotAny } from '@type-challenges/utils'


// 实现内置的 Parameters 类型，而不是直接使用它，可参考TypeScript官方文档。

// // 1.initial ver (arg1 被定死无法递增)
// type MyParameters<T> = T extends (...args: infer Args) => any
//   ? Args['length'] extends 0 // 检查是否空参数
//     ? [] // T, 返回空数组
//     : Args extends [infer First, ...infer Rest] // 依次解构参数
//       ? [arg1: First, ...MyParameters<(...args: Rest) => any>]
//       : never
//   : never

// 2. 复杂了 只需要一行 ts 便自己解析 😂
type MyParameters<T extends (...args: any[]) => any> = T extends (...any: infer S) => any ? S : any 

type a = MyParameters<typeof foo>
type b = MyParameters<typeof foo2>
type c = MyParameters<typeof baz>
const foo2 = (arg1: string, arg2: number, args3: 'aa'): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]