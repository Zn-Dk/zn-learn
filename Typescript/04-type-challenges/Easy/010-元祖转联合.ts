
// 实现泛型TupleToUnion<T>，它返回元组所有值的合集。
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
// 两种解法
type TupleToUnion<A extends any[]> = A[number]
type TupleToUnion2<A extends any[]> = A extends Array<infer Items> ? Items : never;

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]