type ChannelName = "fb" | "tw";

// 如何限制 interface ChannelInfo 的 key 只能是在 ChannelName 的范围内？
// 因为每个key对应的值的类型不一致，也不可以用 Record<ChannelName, xxx> 来直接生成 ChannelInfo
interface ChannelInfo {
  fb: {
    aa: string;
  };
  tw: {
    bb: string;
  };
  // 期望报错， 在定义ChannelInfo的时候就报错，而不是在使用该类型的时候报错
  cv: {
    cc: string;
  };
}



// 通过类型断言
type AssertKeysEqual<
  T1 extends Record<keyof T2, any>,
  T2 extends Record<keyof T1, any>
> = never;

type Aseertion = AssertKeysEqual<{ [key in ChannelName]: any }, ChannelInfo>;
// 类型“{ fb: any; tw: any; }”不满足约束“Record<keyof ChannelInfo, any>”。
// 类型 "{ fb: any; tw: any; }" 中缺少属性 "cv"，但类型 "Record<keyof ChannelInfo, any>" 中需要该属性。

// 下面是精简版:

// 提取公共 Type
type ShapeOf<T> = Record<keyof T, any>;
// 比较两者的第一级属性
type AssertKeysEqual2<X extends ShapeOf<Y>, Y extends ShapeOf<X>> = never;

type Assertion = AssertKeysEqual2<{ a: 1 }, { a: 1; b: "x" }>;
// ERROR: 类型“{ a: 1; }”不满足约束“ShapeOf<{ a: 1; b: "x"; }>”。
// 类型 "{ a: 1; }" 中缺少属性 "b"，但类型 "ShapeOf<{ a: 1; b: "x"; }>" 中需要该属性。





const o = { a: 1, b: "x", zz: 1, foo() {} };
const get = <T extends object, K extends keyof T>(o: T, k: K): T[K] => {
  return o[k];
};

// Omit 的实现原理
type A = {
  a: boolean;
  foo(): void;
  b?: string;
};

// 满足 K 属于 T 的属性, 并且剔除 K 
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// 另一种原始的实现
// as P extends K ? never : P 的解释 
// 这一部分称作重映射, 如果取出的 P 满足传入 K 的键, 则通过 never 忽略, 相反则保留
type MyOmit2<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type testMyOmit2 = MyOmit2<A,'foo'>


type B = Omit<A, "b">;
/*
  type B = {
    a: boolean;
    foo: () => void;
  }
*/
