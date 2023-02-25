import type { Expect, Equal } from "../utils";
/*
  15 - 最后一个元素
  -------
  by Anthony Fu (@antfu) #中等 #array

  ### 题目

  > 由谷歌自动翻译，欢迎 PR 改进翻译质量。

  >在此挑战中建议使用TypeScript 4.0

  实现一个通用`Last<T>`，它接受一个数组`T`并返回其最后一个元素的类型。

  例如

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type tail1 = Last<arr1> // expected to be 'c'
  type tail2 = Last<arr2> // expected to be 1
  ```

  > 在 Github 上查看：https://tsch.js.org/15/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 考察了 infer 的使用, infer 在 extends 子语句出现
// T 是否满足 [...rest 省略之前的元素, 通过]
// T extends [...infer U] -> 推断出最后一个元素的类型
type Last<T extends any[]> = T extends [...any[], infer U] ? U : never;

// 还有一个骚操作
// 已知 T['length'] 将返回 T 的长度, 但是不能直接 T['length' - 1] 这样取
// [any, ...T]  -> 那么就用一个 any 占位, ...T 将原数组展开到新数组中
// 最后我们用 [T["length"]] 去刚才新建的数组中取元素, 就得到了原数组最后一个元素的类型
type Last2<T extends any[]> = [any, ...T][T["length"]];
type testLast2 = Last2<[3, 2, 1]>;

/* _____________ 测试用例 _____________ */

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];
