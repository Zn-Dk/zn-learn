// A extends B，是指类型 A 可以分配给类型 B ，也就是 A 是不是由 B 衍生出来的类型
// 同意境理解: class 继承的 Child extends Father
type Human = {
  name: string; 
  occupation: string;
}
type Animal = {
  name: string;
}
type Bool = Animal extends Human ? 'yes' : 'no'; // Bool => 'no'
type Bool2 = Human extends Animal ? 'yes' : 'no'; // Bool => 'yes'


// TExtends<T, U> = T extends U ? X : Y T 是一个联合类型，表示如果 T 中的类型是 U 的子集，那么返回 X 否则返回 Y。
type A1 = 'x' extends 'x' ? string : number; // string
type A2 = 'x' | 'y' extends 'x' ? string : number; // number



// 分配条件类型（Distributive Conditional Types）


type PP<T> = T extends 'x' ? string : number;
type A3 = PP<'x' | 'y'> // ?


type PP1<T> = T extends 'x' ? string : number;
type PP11 = 'x' | 'y'
type A4 = PP<PP11> // 结果相同吗





// 答案是 string | number
// 对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。
// 分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。

// 该例中，extends的前参为T，T是一个泛型参数。
// 在A3的定义中，给T传入的是'x'和'y'的联合类型'x' | 'y'，满足分配律，于是'x'和'y'被拆开，分别代入PP<T>

// 也就是 P<'x' | 'y'> => P<'x'> | P<'y'>


// 如果需要得到完全的类型匹配结果 则可以给泛型 T 套上 []
type PP2<T> = [T] extends ['x'] ? string : number;
type A5 = PP2<PP11>  // number







// Exclude   type Exclude<T, U> = T extends U ? never : T  
// 作用是从第一个联合类型参数中，将第二个联合类型中出现的联合项全部排除，只留下没有出现过的参数。

type ExcludeA = Exclude<'key1' | 'key2', 'key2'>

// 等价于

// type A = `Exclude<'key1', 'key2'>` | `Exclude<'key2', 'key2'>`

// type A = ('key1' extends 'key2' ? never : 'key1') | ('key2' extends 'key2' ? never : 'key2')

// // never是所有类型的子类型
// type A = 'key1' | never = 'key1'




// Extract  type Extract<T, U> = T extends U ? T : never
// 将第二个参数的联合项从第一个参数的联合项中提取出来，当然，第二个参数可以含有第一个参数没有的项。

type ExtractB = Extract<'key1' | 'key2', 'key1'> // 'key1'



// 通过条件类型 优化函数重载

// SomeType extends OtherType ? TrueType : FalseType






// infer 的使用

type USER = {
  name: string;
  age: number;
  get(name: string) : void ;
}

// infer 获取 USER 的数据类型

// infer 只能放在 条件判断类型中 infer 针对的泛型 三元运算 必须在真值处返回
type GetType<T> = {
  [k in keyof T] : T[k] extends (infer U) ? U : k
}[keyof T]

type GetType2<T> = T[keyof T]

type UserType = GetType<USER>
type UserType2 = GetType2<USER>

// 获取函数返回值的类型

type fn = (n: string) => number[] | string[] | boolean

type GetFuncReturnType<T> = T extends ((...args: any) => infer U) ? U : T

type fnType = GetFuncReturnType<fn>