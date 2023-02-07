type P = {
  a: string;
  b: number;
  c?: boolean;
};

type someKey = "a" | "b";

// Partial 将类型中的所有键都变为可选类型
// type Partial<T> = {
//   [P in keyof T]?: T[P];
//   keyof T 取出所以键名=> for in 用参数 P 遍历所有键名
//   [...]?: T[P] 取值,并为可选类型
//   最后这个 Type 作为新的类型返回
// };
type partP = Partial<P>;

// Required 将类型中的所有键都变为必填类型
type reqP = Required<P>;

// Pick<T, K extends keyof T> 从类型中取出
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };
// 传入类型 T, K 必须是 T 的键(全部/部分)
type allKey = keyof P; // keyof 取出 P 中所有键值

type pickAll = Pick<P, allKey>;

type some = "a" | "b";

// type pickSome = Pick<P, "a" | "b">;
type pickSome = Pick<P, some>;

let a: pickAll; // a.a a.b a.c
let b: pickSome; // b.a b.b 没有 b.c

// Record

//需要一个对象，有 ABC 三个属性，属性的值必须是数字，那么就这么写：

type keys = "A" | "B" | "C";
const result: Record<keys, number> = {
  A: 1,
  B: 2,
  C: 3,
};


// 将 Page 作为键名
type Page = "home" | "about" | "contact";

// 将 PageInfo 作为值的类型
interface PageInfo {
  title: string;
}

const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
