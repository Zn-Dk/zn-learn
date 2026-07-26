import type { Equal, Expect, NotAny } from '@type-challenges/utils'

// 实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，
// 以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型。
// type A = If<true, 'a', 'b'>  // expected to be 'a'
// type B = If<false, 'a', 'b'> // expected to be 'b'

type If<I extends boolean, CaseT, CaseF> = I extends true ? CaseT : CaseF;

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
  Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>