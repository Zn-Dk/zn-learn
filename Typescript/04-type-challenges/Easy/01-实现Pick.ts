import type { Expect, Equal } from "../utils";
// 从类型 T 中选择出属性 K，构造成一个新的类型。
// 1. K extends keyof T <- 限定 K 是 T 的某个 key 或者严格的说是一个包含了 T 的某些 key的联合类型
// 2. key in K -> 代表从传入的 K 联合类型(方便理解,当做数组), 取出某一项(用 key 代指)
// 3. 因为 key 这个项也是 keyof T, 因此 T[key] 是成立的,这样就实现了 Pick 类型
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

type A = string | number;

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>
];
