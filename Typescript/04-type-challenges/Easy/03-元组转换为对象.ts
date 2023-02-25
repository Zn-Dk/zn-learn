import type { Expect, Equal } from "../utils";
/*
  11 - 元组转换为对象
  -------
  by sinoon (@sinoon) #简单 #object-keys

  ### 题目

  > 欢迎 PR 改进翻译质量。

  传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

  例如：

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > 在 Github 上查看：https://tsch.js.org/11/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 注意 必须把元祖 声明为 as const
const foo = ["a", "b", "c"] as const;
type Foo = typeof foo[number];

type TupleToObject<T extends readonly any[]> = {
  // 使用一个 number 变量 代表 k 是 T 元组的某一个元素
  [k in T[number]]: k;
};

/* _____________ 测试用例 _____________ */

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const tupleMix = [1, "2", 3, "4"] as const;

type T = TupleToObject<typeof tupleNumber>;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<TupleToObject<typeof tupleMix>, { 1: 1; "2": "2"; 3: 3; "4": "4" }>
  >
];
