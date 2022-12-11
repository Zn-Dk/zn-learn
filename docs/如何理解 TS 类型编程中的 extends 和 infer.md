## [如何理解 TS 类型编程中的 extends 和 infer ](https://www.cnblogs.com/zhangguicheng/p/15745689.html)

## extends

extends 在TS类型编程中用法（T extends U），表示 T 中的某些在 U 里面，比较难描述，用法如下：

```ts
T extends U ? X : Y
```

分为两种情况理解更直观一些：

1）如果 T 不是一个联合类型，表示如果 T 是 U 的子集，那么返回 X 否则返回 Y。

举个例子，在下面的例子中，如果 T 是 U 的子集，那么返回 number，否则返回 never。

```ts
export type TExtends<T, U> = T extends U ? number : never;
 
// T(number)是 U(number | string)的子集，所以返回number
type TExtendsExample1 = TExtends<number, number | string>; // number
 
// T(boolean) 不是 U(number | string)的子集，所以返回never
type TExtendsExample2 = TExtends<boolean, number | string>; // never
```

2）如果 T 是一个联合类型，表示如果 T 中的类型是 U 的子集，那么返回 X 否则返回 Y。这个过程可以理解为对T中的类型进行一次遍历，每个类型都执行一次 extends。

举个例子:

下面的例子中对 T 中的每个类型进行遍历，检测是否是 extends 于 null 或 undefined。如果满足这个条件就返回 never（对于联合类型来说如果返回never那就相当于不存在，因为never是所有类型的子类型），如果不满足就返回原来的类型。

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
 
// T(number | string) 不是 U(null | undefined) 的子集，所以返回 T
type TNonNullableExample1 = NonNullable<number | string>; // number | string
 
// T(string | null) 中 string 不是 U 的子集返回 string，null 是 U 的子集，返回 never
type TNonNullableExample2 = NonNullable<string | null>; // string
```

## infer

infer 可以推断一个类型变量，常见用法示例：

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

infer R 相当于声明一个类型变量，这个变量的类型取决于传入的泛型 T，在之前的时候 extends 右边的类型是写死的，但是在这里通过 infer R 来代替写死的类型，并且具体的类型取决于传入的泛型。

不过需要注意，R 变量只能在 true 的分支可以使用，也就是只能在 ? 的第一个分支中使用。

下面通过两个例子进行说明：

1）如果 T 是 () => infer R 的子集，那么返回 R，否则返回 number

```ts
{
  type Func<T> = T extends () => infer R ? R : number;
  
	// T(string) 不是 () => infer R 的子集，因此返回 number
  type TFuncExample1 = Func<string>; // number
 
	// T(() => boolean) 是 () => infer R 的子集，并且通过传入的() => boolean可以推断出 R 是 boolean,因此返回 R(boolean)
  type TFuncExample2 = Func<() => boolean>; // boolean
}
```

2）如果 T 是 `{a: infer VType, b: infer VType}` 的子集，那么返回 `UType | VType`，否则返回number。

```ts
type TObj<T> = T extends { a: infer VType, b: infer UType} ? VType | UType : number;
 
// T(string)不是 {a: infer VType, b: infer UType} 的子集，因此返回 number
type TObjExample1 = TObj<string>; // number
 
// T(string)是 {a: infer VType, b: infer UType} 的子集，因此返回 UType | VType
type TObjExample2 = TObj<{ a: number, b: string }>; // => number | string
```

