import type { Expect, Equal } from "../utils";

/*
  14 - 第一个元素
  -------
  by Anthony Fu (@antfu) #简单 #array

  ### 题目

  > 欢迎 PR 改进翻译质量。

  实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。

  例如：

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > 在 Github 上查看：https://tsch.js.org/14/zh-CN
*/

/* _____________ 你的代码 _____________ */

// any[] -> T 为一个数组
// 判断: 空数组 返回 never 非空数组可以直接用索引值取出类型 故返回 T[0]
type First<T extends any[]> = T extends [] ? never : T[0];

/* _____________ 测试用例 _____________ */

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];
