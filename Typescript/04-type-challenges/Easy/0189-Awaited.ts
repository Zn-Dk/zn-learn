import type { Equal, Expect, NotAny } from '@type-challenges/utils'

// 1. initial ver.
// type Then<T> = { then: (onfulfilled: (arg: T) => any) => any }

// type MyAwaited<T> = T extends Promise<infer Outer> 
// ? (Outer extends Promise<any> ? MyAwaited<Outer> : Outer) // 对于标准Promise, 递归解包
// : (T extends Then<infer ThenArgs>  // thenable 函数
//     ? ThenArgs 
//     : never)

// 2. Promise-Like
type PromiseLike<T> = { then: (onfulfilled: (arg: T) => any) => any }

type MyAwaited<T> = T extends PromiseLike<infer Arg> 
  ? Arg extends PromiseLike<any> ? MyAwaited<Arg> : Arg
  : never;

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]