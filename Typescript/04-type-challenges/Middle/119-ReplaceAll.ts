
// 实现 ReplaceAll<S, From, To> 将一个字符串 S 中的所有子字符串 From 替换为 To。

type ReplaceAll<S, From extends string, To extends string> = From extends ''  // 进阶- From 是 '' To 不为空, 需要多判断一次
? S
: S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${ReplaceAll<R, From, To>}` 
  // ⚠️左侧已被替换过的部分需要放在外面, 而不是 ReplaceAll<`${L}${To}${R}`, From, To>
  // 这是因为假如这么写 ReplaceAll<'foobarfoobar', 'ob', 'b'>
  // 1. foobarfoobar -> fobarfoobar 左侧应该替换完成了, 但是因为将整体结果输入到下一次处理
  // 2. fobarfoobar-> fbarfobar 
  // 3. fbarfobar -> fbarbar 左右侧整体都被多替换了一次!
  : S;

type replaced = ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'
type a = ReplaceAll<'foobarfoobar', 'ob', 'b'>
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]