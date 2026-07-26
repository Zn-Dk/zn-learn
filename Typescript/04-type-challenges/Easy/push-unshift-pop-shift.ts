import type { Equal, Expect, NotAny } from '@type-challenges/utils'

// 3057-在类型系统里实现通用的 Array.push 。
type Push<T extends readonly any[], V> = [...T, V];

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

type errors = [
  // @ts-expect-error
  Expect<Equal<Push<number[], string>, string[]>>,
  // @ts-expect-error
  Expect<Equal<Push<string[], number>, [string, number]>>,
]

// 3060-Unshift
type Unshift<T extends readonly any[], V> = [V, ...T];

type cases2 = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]


// 16-Pop
type Pop<T extends any[]> = T extends [...infer Front, infer Last] ? Front : never;

type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]

// 3062-Shift
type Shift<T extends any[]> = T extends [infer First, ...infer Rest] ? Rest : never;

type arr3 = Shift<[3, 2, 1]> // [2, 1]