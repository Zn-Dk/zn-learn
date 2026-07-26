import type { Equal, Expect, NotAny } from '@type-challenges/utils'

//  JavaScript 内置的 Array.concat 方法，这个类型接受两个参数，返回的新数组类型
// 应该按照输入参数从左到右的顺序合并为一个新的数组。
type ArrOrTuple = any[] | readonly any[]
type Concat<A extends ArrOrTuple, B extends ArrOrTuple> = [...A, ...B]

const tuple = [1] as const

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]
// @ts-expect-error
type error = Concat<null, undefined>