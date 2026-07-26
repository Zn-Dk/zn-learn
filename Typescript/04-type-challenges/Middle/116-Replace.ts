
// 实现 Replace<S, From, To> 将字符串 S 中的第一个子字符串 From 替换为 To 。

// type Replace<S, From extends string, To extends string> = S extends `${infer L}${From}${infer R}` 
// ? `${L}${To}${R}`
// : S;

type Replace<S, From extends string, To extends string> = From extends ''  // 进阶- From 是 '' To 不为空, 需要多判断一次
? S
: S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${R}` 
  : S;

type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'


import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]