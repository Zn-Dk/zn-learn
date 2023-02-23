// 泛型约束

// 如果我们直接对一个泛型参数取 length 属性,
// 会报错, 因为这个泛型根本就不知道它有这个属性

// function fn<T>(x: T) {
//   // console.log(x.length) // 类型“T”上不存在属性“length”。
// }

// 使用接口约束泛型

interface ILen {
  length: number;
}

// 需要使用 extend 关键字
function f1<T extends ILen>(x: T) {
  console.log(x.length); // 类型“T”上不存在属性“length”。
}

f1<string>("1234");
// f1<number>(1213) // error 类型“number”不满足约束“ILen”

f1<string[]>(["a", "b", "c", "d", "e", "f"]);

f1([1, 2, 3, 4, 5]); // 可以省略

// 在泛型约束中使用类参数
// <Key extends keyof Type>

// 比如，现在我们想要用属性名从对象里获取这个属性。
// 并且我们想要确保这个属性存在于对象 obj上，
// 因此我们需要在这两个类型之间使用约束。
// 返回值 :T[K] 是可以忽略的 因为 ts 已经能够自动推断返回类型

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
let x = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

// 有语法提示
getProperty(x, "a"); // 此处传入的第二个参数 'a' 必须是 x 里面存在的 key
// getProperty(x, 'm') // 报错：类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数。



// 泛型约束 配合 extends 约束参数内容
function getNames<T extends { name: string }>(list: T[]) {
  return list.map((item) => item.name);
}

const list = [
  { name: "a", age: 10 }, 
  { name: "b", age: 11 }, 
  { age: 12 }
];

// getNames(list) //ERROR list 有一项缺少了 name 属性


