import type { Expect, Equal } from "../utils";

/*
  7 - 实现 Readonly
  -------
  by Anthony Fu (@antfu) #简单 #built-in #readonly #object-keys

  ### 题目

  > 欢迎 PR 改进翻译质量。

  不要使用内置的`Readonly<T>`，自己实现一个。

  该 `Readonly` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会被 `readonly` 所修饰。

  也就是不可以再对该对象的属性赋值。

  例如：

  ```ts
  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  ```

  > 在 Github 上查看：https://tsch.js.org/7/zh-CN
*/

/* _____________ 你的代码 _____________ */

// k in keyof T -> 对 T 的所有键进行遍历
type MyReadonly<T> = {
  readonly [k in keyof T]: T[k];
};

/* --- deepReadonly --- 对象 key 值为对象时, 将这个对象也变为readonly,一直递归直至为原始值 */
type DeepReadonly<T> = {
  readonly [k in keyof T]: T[k] extends object ? DeepReadonly<T[k]> : T[k];
};

/* _____________ 测试用例 _____________ */

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

type ReadonlyTodo = MyReadonly<Todo1>;
type DeepReadonlyTodo = DeepReadonly<Todo1>;

// 测试 DeepReadonly
const todoOnly: DeepReadonlyTodo = {
  title: "title",
  description: "no",
  completed: false,
  meta: {
    author: "me",
  },
};

// todoOnly.meta.author = "who";
// 无法为“author”赋值，因为它是只读属性
