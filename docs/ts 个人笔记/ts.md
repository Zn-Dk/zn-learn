# TypeScript 学习

笔记内用收集自各第三方教程资料 如有侵犯请联系本人删除





## TypeScript 的介绍

TypeScript是一种由微软开发的开源、跨平台的编程语言。它是JavaScript的超集，最终会被编译为JavaScript代码。

2012年10月，微软发布了首个公开版本的TypeScript，2013年6月19日，在经历了一个预览版之后微软正式发布了正式版TypeScript

TypeScript的作者是安德斯·海尔斯伯格，C#的首席架构师。它是开源和跨平台的编程语言。

TypeScript扩展了JavaScript的语法，所以任何现有的JavaScript程序可以运行在TypeScript环境中。

TypeScript是为大型应用的开发而设计，并且可以编译为JavaScript。

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6+ 的支持**，它由 Microsoft 开发，代码开源于 GitHub 上

**TypeScript 是 JavaScript 的一个超集**，主要提供了**类型系统**和**对 ES6+ 的支持**，它由 Microsoft 开发，代码[开源于 GitHub (opens new window)](https://github.com/Microsoft/TypeScript)上

## TypeScript 的特点

TypeScript 主要有 3 大特点：

- **始于JavaScript，归于JavaScript**

TypeScript 可以编译出纯净、 简洁的 JavaScript 代码，并且可以运行在任何浏览器上、Node.js 环境中和任何支持 ECMAScript 3（或更高版本）的JavaScript 引擎中。

- **强大的类型系统**

**类型系统**允许 JavaScript 开发者在开发 JavaScript 应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。

- **先进的 JavaScript**

TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。





## Hello World

### 安装

```
npm install typescript -g
```

> .ts 文件是可以被浏览器(最新的几代)直接通过 script 标签引入运行的, 但前提是里面只有 Js 的语法

>那么如果里面有 ts 的语法 需要通过编译 转成 .js 文件后 才能运行在浏览器下

### 编译

```
tsc hello_world.ts
```

会在同目录下生成 `hello_world.js` 这样就可以在浏览器运行了



### vscode自动编译

```
1). 生成配置文件tsconfig.json
    tsc --init
2). 修改tsconfig.json配置
    "outDir": "./js",
    "strict": false,
3). 启动监视任务:
    终端 -> 运行任务 -> 监视tsconfig.json
    也就是 tsconfig.json --watch

```



# 基础类型

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

| **类型** | **例子**          | **描述**                       |
| -------- | ----------------- | ------------------------------ |
| number   | 1, -33, 2.5       | 任意数字                       |
| string   | 'hi', "hi", `hi`  | 任意字符串                     |
| boolean  | true、false       | 布尔值true或false              |
| 字面量   | 其本身            | 限制变量的值就是该字面量的值   |
| any      | *                 | 任意类型                       |
| unknown  | *                 | 类型安全的any                  |
| void     | 空值（undefined） | 没有值（或undefined）          |
| never    | 没有值            | 不能是任何值                   |
| object   | {name:'孙悟空'}   | 任意的JS对象                   |
| array    | [1,2,3]           | 任意JS数组                     |
| tuple    | [4,5]             | 元素，TS新增类型，固定长度数组 |
| enum     | enum{A, B}        | 枚举，TS中新增类型             |



## 布尔值

最基本的数据类型就是简单的 true/false 值，在JavaScript 和 TypeScript 里叫做 `boolean`（其它语言中也一样）。

```typescript
let isDone: boolean = false;
isDone = true;
// isDone = 2 // error
```

## 数字

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015中引入的二进制和八进制字面量。

```typescript
let a1: number = 10 // 十进制
let a2: number = 0b1010  // 二进制
let a3: number = 0o12 // 八进制
let a4: number = 0xa // 十六进制
```

## 字符串

JavaScript 程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 `string` 表示文本数据类型。 和 JavaScript 一样，可以使用双引号（`"`）或单引号（`'`）表示字符串。

```typescript
let name:string = 'tom'
name = 'jack'
// name = 12 // error
let age:number = 12
const info = `My name is ${name}, I am ${age} years old!`
```

## undefined 和 null

TypeScript 里，`undefined` 和 `null` 两者各自有自己的类型分别叫做 `undefined` 和 `null`。 它们的本身的类型用处不是很大：

```typescript
let u: undefined = undefined
let n: null = null
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。

## 数组

TypeScript 像 JavaScript 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在`元素类型后面接上[]`，表示由此类型元素组成的一个数组：

```typescript
let list1: number[] = [1, 2, 3]
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```typescript
let list2: Array<number> = [1, 2, 3]
```

## 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，`各元素的类型不必相同`。 比如，你可以定义一对值分别为 `string` 和 `number` 类型的元组。

```typescript
let t1: [string, number]
t1 = ['hello', 10] // OK
t1 = [10, 'hello'] // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```typescript
console.log(t1[0].substring(1)) // OK
console.log(t1[1].substring(1)) // Error, 'number' 不存在 'substring' 方法
```

## 枚举

`enum` 类型是对 JavaScript 标准数据类型的一个补充。 使用枚举类型可以`为一组数值赋予友好的名字`。

```typescript
enum Color {
  Red,
  Green,
  Blue
}

// 枚举数值默认从0开始依次递增
// 根据特定的名称得到对应的枚举数值
let myColor: Color = Color.Green  // 0
console.log(myColor, Color.Red, Color.Blue)
```

默认情况下，从 `0` 开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 `1` 开始编号：

```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green
```

或者，全部都采用手动赋值：

```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为 2，但是不确定它映射到 Color 里的哪个名字，我们可以查找相应的名字：

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]

console.log(colorName)  // 'Green'
```



## any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 `any` 类型来标记这些变量：

```typescript
let notSure: any = 4
notSure = 'maybe a string'
notSure = false // 也可以是个 boolean
```

在对现有代码进行改写的时候，`any` 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。并且当你只知道一部分数据的类型时，`any` 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```typescript
let list: any[] = [1, true, 'free']

list[1] = 100
```



## void

某种程度上来说，`void` 类型像是与 `any` 类型相反，它`表示没有任何类型`。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```typescript
/* 表示没有任何类型, 一般用来说明函数的返回值不能是undefined和null之外的值 */
function fn(): void {
  console.log('fn()')
  // return undefined
  // return null
  // return 1 // error
}
```

声明一个 `void` 类型的变量没有什么大用，因为你只能为它赋予 `undefined` 和 `null`：

```typescript
let unusable: void = undefined
```



## object

`object` 表示非原始类型，也就是除 `number`，`string`，`boolean`之外的类型。

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 `API`。例如：

```typescript
function fn2(obj:object):object {
  console.log('fn2()', obj)
  return {}
  // return undefined
  // return null
}
console.log(fn2(new String('abc')))
// console.log(fn2('abc') // error
console.log(fn2(String))
```



## never 

never 表示永远不会被观察到的值 

> 代码示例 返回值为 never 的情况：抛出异常；终止执行；死循环。

```typescript
function fail(msg: string): never {
	throw new Error(msg)
}
```

> 联合类型无参数的时候

```typescript
function fail(x: string | number) {
  if (typeof x === "string") {
  	// do sth
  } else if (typeof x === "number") {
  	// do sth
  } else {
  	// 此时为 never 类型
	}
}

```





## 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种
需求1: 定义一个一个函数得到一个数字或字符串值的字符串形式值

```typescript
function toString2(x: number | string) : string {
  return x.toString()
}
```

需求2: 定义一个一个函数得到一个数字或字符串值的长度

```typescript
function getLength(x: number | string) {

  // return x.length // error

  if (x.length) { // error
    return x.length
  } else {
    return x.toString().length
  }
}
```



## 类型断言

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript 会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法, 另一个为 `as` 语法

```typescript
/*
类型断言(Type Assertion): 可以用来手动指定一个值的类型
语法:
    方式一: <类型>值
    方式二: 值 as 类型  tsx中只能用这种方式
*/

/* 需求: 定义一个函数得到一个字符串或者数值数据的长度 */
function getLength(x: number | string) {
  if ((<string>x).length) {
    return (x as string).length
  } else {
    return x.toString().length
  }
}
console.log(getLength('abcd'), getLength(1234))
```



## 类型推断

类型推断: TS会在没有明确的指定类型的时候推测出一个类型
有下面2种情况: 1. 定义变量时赋值了, 推断为对应的类型. 2. 定义变量时没有赋值, 推断为any类型

```typescript
/* 定义变量时赋值了, 推断为对应的类型 */
let b9 = 123 // number
// b9 = 'abc' // error

/* 定义变量时没有赋值, 推断为any类型 */
let b10  // any类型
b10 = 123
b10 = 'abc'
```



## 类型别名

> 通过 type 关键字声明一个类型的实现

```typescript
 type point = {
  x: number,
  y: number
 }


 function showCoordinate(pt: point): string {
  return x: ${pt.x},y: ${pt.y}
 }


 const pt = showCoordinate({ x: 1, y: 2 })
```



> 通过 type 声明 可以多次的利用 并且方便管理

```typescript
type ID = number | string
const id: ID = '800'


 // 上下两种方式都是相同的

 // function printID(id: number | string) {
 //  console.log(id)
 // }

 function printID(id: ID): ID {
  return id
 }


 // 都使用了 ID 这种 type 但是不需要重写类型
 function printAnotherID(another_id: ID) {
  console.log(another_id)
 }
```



## 文字类型

这是一种特殊的类型 往往用来做联合使用

```typescript
  let x: 'hello' = 'hello'
  // x = 'world' // ERROR 不能将类型“"world"”分配给类型“"hello"”



// 使用文字联合类型 来限定参数
  
  function showDirection(direction: 'north' | 'south' | 'west' | 'east') {
    return `Your direction is ${direction}`
  }

  console.log(showDirection('south'))
  // console.log(showDirection('zzzz')) 
  // 报错 因为不符合这四种值的一个


  function showAnyMsg(msg: 'hello' | number[] | false) {
    return `You have ${msg}`
  }

  console.log(showAnyMsg([1, 2, 3]))
  console.log(showAnyMsg('hello'))
  console.log(showAnyMsg(false))
  // console.log(showAnyMsg(true)) // ERROR
```

### 文字类型引起的问题

#### 问题代码分析

```typescript
// 1、声明函数
function say(name: string, content: "早安！" | "午安！" | "晚安！"){
console.log(name + "说：" + content)
}

// 2、定义常量
const person = {
name: "訾博",
content: "早安！"
}

// 3、调用函数
// 报错：类型“string”的参数不能赋给类型“"早安！" | "午安！" | "晚安！"”的参数。
say(person.name, person.content)
```



#### 解决问题：类型断言 

> 下面三种方式使用其中一种即可！

```typescript
// 1、声明函数
function say(name: string, content: "早安！" | "午安！" | "晚安！"){
console.log(name + "说：" + content)
}

// 2、定义常量
const person = {
name: "张三",
content: "早安！" as "早安！" // 方式1
} as const // 方式3  "as const"

// 3、调用函数
// 报错：类型“string”的参数不能赋给类型“"早安！" | "午安！" | "晚安！"”的参数。
say(person.name, person.content as "早安！") // 方式2
```



#### 其他示例

```typescript
let req = {
  url: 'http://localhost',
  method: 'POST' as 'POST', // 经过一步断言
} as const // 或者写 as const

type Request = {
  url: string,
  method: 'GET' | 'POST' | 'PUT'
}

function fetchData(REQ: Request) {
  console.log('URL:' + REQ.url)
  console.log('METHOD:' + REQ.method)
}

fetchData(req)
```





 





# 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。我们使用接口（Interfaces）来定义对象的类型。`接口是对象的状态(属性)和行为(方法)的抽象(描述)`

## 接口初探

需求: 创建人的对象, 需要对人的属性进行一定的约束

```text
id是number类型, 必须有, 只读的
name是string类型, 必须有
age是number类型, 必须有
sex是string类型, 可以没有
```

下面通过一个简单示例来观察接口是如何工作的：

```typescript
/*
在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
接口: 是对象的状态(属性)和行为(方法)的抽象(描述)
接口类型的对象
    多了或者少了属性是不允许的
    可选属性: ?
    只读属性: readonly
*/

/*
需求: 创建人的对象, 需要对人的属性进行一定的约束
  id是number类型, 必须有, 只读的
  name是string类型, 必须有
  age是number类型, 必须有
  sex是string类型, 可以没有
*/

// 定义人的接口
interface IPerson {
  id: number
  name: string
  age: number
  sex: string
}

const person1: IPerson = {
  id: 1,
  name: 'tom',
  age: 20,
  sex: '男'
}
```

类型检查器会查看对象内部的属性是否与IPerson接口描述一致, 如果不一致就会提示类型错误。

## 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。

```typescript
interface IPerson {
  id: number
  name: string
  age: number
  sex?: string
}
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。

```typescript
const person2: IPerson = {
  id: 1,
  name: 'tom',
  age: 20,
  // sex: '男' // 可以没有
}
```

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性:

```typescript
interface IPerson {
  readonly id: number
  name: string
  age: number
  sex?: string
}
```

一旦赋值后再也不能被改变了。

```typescript
const person2: IPerson = {
  id: 2,
  name: 'tom',
  age: 20,
  // sex: '男' // 可以没有
  // xxx: 12 // error 没有在接口中定义, 不能有
}
person2.id = 2 // error
```

### readonly vs const

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用 `readonly`。

## 函数类型

接口能够描述 JavaScript 中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```typescript
/*
接口可以描述函数类型(参数的类型与返回的类型)
*/

interface SearchFunc {
  (source: string, subString: string): boolean
}
```

这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

```typescript
const mySearch: SearchFunc = function (source: string, sub: string): boolean {
  return source.search(sub) > -1
}

console.log(mySearch('abcd', 'bc'))
```

## 类类型

### 类实现接口

与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

```typescript
/*
类类型: 实现接口
1. 一个类可以实现多个接口
2. 一个接口可以继承多个接口
*/

interface Alarm {
  alert(): any;
}

interface Light {
  lightOn(): void;
  lightOff(): void;
}

class Car implements Alarm {
  alert() {
      console.log('Car alert');
  }
}
```

## 一个类可以实现多个接口

```typescript
class Car2 implements Alarm, Light {
  alert() {
    console.log('Car alert');
  }
  lightOn() {
    console.log('Car light on');
  }
  lightOff() {
    console.log('Car light off');
  }
}
```

## 接口继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```typescript
interface LightableAlarm extends Alarm, Light {

}
```



## 使用交叉类型**

- 接口允许我们通过扩展其他类型建立起新类型 

- TypeScript 还提供另外一种其他结构称为交叉类型 主要用于组合现有的对象类型

```typescript
	interface A {
    a: number
  }
  interface B {
    b: string
  }
  interface C {
    c(): void
  }

  type All = A & B & C

  let al: All = {
    a: 1,
    b: '123',
    c() {
      console.log('ccc')
    }
  }
  
// 函数的形参也可以这么表示 而且不需要type声明
function getAll(obj: A & B & C) {
  // 这里会有智能提示
  console.log(obj.a, obj.b)
}

getAll(al)

// getAll({ a: 2 })
//类型 "{ a: number; }" 中缺少属性 "b"，但类型 "B" 中需要该属性。
...
```





## 接口索引签名

- 所谓索引签名，就是知道属性值的类型，不知道属性名，
  **特别是这个接口内的属性数量还不确定的时候**
  定义一个类似 [props:string]: number 的东西，
  
  **表示属性名是 string 类型，属性值是 number 类型**
  
- 如果要指定属性名称实现 接口中的其他键值对都要满足原有索引签名规则

```typescript


interface IString {
  // index 只是一个象征
  [index: number]: string
}
interface IString2 {
  [index: string]: number
}

//可以给数组建立
const arr1: IString = ['a', 'b', 'c']

//也可以给对象 (这个对象只能有number属性)

const oStr: IString = {
  0: 'a',
  1: 'b',
  2: 'c'
}

// 换用不同规则的接口
const oStr2: IString2 = {
  a: 1,
  b: 2,
  c: 3
}

console.log(arr1)
console.log(oStr)
console.log(oStr2)

//可以注意到上面的接口实现都没有限定属性个数 就是因为使用了索引签名


// 如果要指定属性名称实现 接口中的其他键值对都要满足原有索引签名规则
interface IString3 {
  [index: string]: number | number[], //使用联合类型解决list的报错
  // 类型“number[]”的属性“list”不能赋给“string”索引类型“number”
  list: number[],
  // OK
  count: number
}

// 实现接口
const oStr3: IString3 = {
  a: 1,
  b: [1, 2],
  count: 10,
  list: [1, 2, 3, 4, 5]
}
```





# 函数



## 函数重载

函数重载: 函数名相同, 而形参不同的多个函数
/需求: 我们有一个add函数，它可以接收2个string类型的参数进行拼接，
也可以接收2个number类型的参数进行相加 但是必须是成对出现

```typescript
// 写好重载声明

function add(x: number, y: number): number //成对
function add(x: string, y: string): string //成对

function add(x: number | string, y: number | string): number | string {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 x + y
  if (typeof x === "number" && typeof y === "number") {
    return x + y
  }
  return <string>x + <string>y
}

// 在可能的情况下 总是倾向于使用联合类型的参数 而不是重载函数

console.log(add('1', '2')) //OK

console.log(add(1, 2)) //OK

// console.log(add(1, '2'))
/*
报错:

没有与此调用匹配的重载。
  第 1 个重载(共 2 个)，“(x: number, y: number): number”，出现以下错误。
    类型“string”的参数不能赋给类型“number”的参数。
  第 2 个重载(共 2 个)，“(x: string, y: string): string”，出现以下错误。
    类型“number”的参数不能赋给类型“string”的参数。
*/
```

>    这个意思是告诉你 只能同时传成对的 number | string 否则就不接受
>    假如不写函数重载 这个函数就会返回第二种字符串拼接的结果
>
>    (如果是其他情况 往往会报错)





## 可选参数/默认参数/剩余参数

可选参数与默认参数:
  TypeScript 里的每个函数参数都是必须的。
  这不是指不能传递 null 或 undefined 作为参数，
  而是说编译器检查用户是否为每个参数都传入了值。
  编译器还会假设只有这些参数会被传递进函数。
  简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

  JavaScript 里，每个参数都是可选的，可传可不传。
  没传参的时候，它的值就是 undefined。
  在TypeScript 里我们可以在参数名旁使用 ? 实现可选参数的功能。

```typescript
// 1. y 可选
function optional(x: number, y?: number): number {
  console.log('y is: ' + y);
  return y ? (x + y) : (x ** 2)
}

console.log(optional(10)) // 100   y is: undefined

console.log(optional(5, 10)) // 15  y is: 10



// 2. y 有默认值
function optional2(x: number, y: number = 5): number {
  console.log('y is: ' + y);
  return x + y
}

console.log(optional2(10)) // 15   y is: 5

console.log(optional2(5, 10)) // 15  y is: 10

///////////////////////////////////////////////////////

// 剩余参数 REST
// 与 JS ES6规则类似

function rest(x: boolean, y: number, ...args: string[]) {
  console.log('x is: ' + x);
  console.log('y is: ' + y);
  console.log('args is:')
  console.log(args)
}

rest(true, 100, 'a', 'b', 'c')
```



## 参数解构

> 相比 ES6, TS中函数的参数解构还需要在参数解构的时候表明属性的类型

```
function sum({ a, b, c }: { a: number, b: number, c: number, }) {
  return a + b + c
}

let res = sum({ a: 1, b: 2, c: 3 })

console.log(res)


// 但是对于对象来说是可选的,可以依赖类型推断

const o = {
  a: 1,
  b: 'zzz',
  c: [1, 2, 3]
}

// let { a, b, c } = o

// 当然 多写也是没问题的
let { a, b, c }: { a: number, b: string, c: number[] } = o

console.log(`a: ${a}, b: ${b}, c: ${c}`)
```







# 泛型

指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。



> 如果我们无法得知函数调用时具体的类型 之前往往会这么写

```
// 函数几乎没有可复用性
function identity(arg: number): number {
  return arg
}

// 变成了 anyScript
function identity2(arg: any): any {
  return arg
}
```

## 泛型的使用方法

- 表示法 <T> 尖括号 T 代表对类型的代称 它可以是任意字符串

- 一般写 T(ype) K(ey) V(alue)  是比较常见的 

- 一旦指定泛型 就会产生约束和语法检查

```
// 指定 T 是某种类型 则 参数返回值都可以通过自动识别
// 泛型只能表示成类型 不能作为值使用
function identity3<T>(arg: T): T {
  return arg
}

// 一旦指定泛型 就会产生约束和语法检查
console.log(identity3<string>('abc'))

console.log(identity3<number>(123))


function fillArr<T>(val: T, count: number): T[] {
  // 数组的类型就可以用T代替
  const arr: T[] = []
  for (let i = 0; i < count; i++) {
    arr.push(val)
  }
  return arr
}

console.log(fillArr<number>(123, 5))
// [123, 123, 123, 123, 123]

console.log(fillArr<string>('a', 5))
// ['a', 'a', 'a', 'a', 'a']
```

## 多参数泛型

```typescript
function fn1<K, V>(x: K, y: V): string | [K, V] {
  if (typeof x === 'number' || typeof x === 'number' ||
    typeof y === 'string' || typeof y === 'string') {
    return x as string + y as string
  }
  return [x, y]
}

console.log(fn1<number, number>(1, 2)) // 3

console.log(fn1<string, string>('1', '2')) // 12

console.log(fn1<string, number>('1', 1)) // ['1', 1]
```



## 泛型接口

在定义接口时, 为接口中的属性或方法定义泛型类型
在使用接口时, 再指定具体的泛型类型
泛型的类型不仅仅局限于基本的数据类型 也可以是任意的类或者方法

```
interface IMe<T, U> {
  name: T,
  age: U
}

const me: IMe<string, number> = {
  name: "Me",
  age: 15
}

console.log(me) // {name: 'Me', age: 15}

```



### 案例: 创建用户数据库

```typescript

interface ICURD<U> {
  data: U[]
  add: (data: U) => string
  getByName: (name: string) => U
}


class User {
  id?: string
  name: string
  age: number
  constructor({ name, age, id }:
    { name: string, age: number, id: string }) {
    this.name = name
    this.age = age
    this.id = id
  }
}


// DataBase 实现 ICURD 接口 并且将 User 作为泛型类型
class DataBase implements ICURD<User> {
  data: User[] = []

  add(user: User) {
    const id = String(Date.now())
    let instance = new User({ ...user, id })
    
    this.data.push(instance)

    return `add user success id=${id}`
  }

  getByName(name: string): User {
    // return <User>this.data.find(item => item.name === name)
    return this.data.find(item => item.name === name) as User
    // 类型断言必须加 否则要报错
  }

}

const db = new DataBase();

const u1 = db.add({ name: 'John', age: 14 });
const u2 = db.add({ name: 'Smith', age: 17 });
const u3 = db.add({ name: 'Ken', age: 24 });

console.log(db)

console.log(db.getByName('Ken'))
```



## 泛型类

```typescript
// 使用一个抽象类 否则要报错
abstract class GenericNumber<T>{
  abstract add(x: T, y: T): T
  abstract toString(n: T): string
  abstract fixed(n: T, digit: T): string
}

class myNum extends GenericNumber<number>{
  add(x: number, y: number) {
    return x + y
  }
  toString(n: number) {
    return n.toString()
  }
  fixed(n: number, digit: number) {
    return n.toFixed(digit)
  }
}

let m = new myNum()

console.log(m.add(1, 2))

console.log(m.toString(12414512))

console.log(m.fixed(123.23, 1))
```



## keyof

keyof 运算符可以接收一个对象类型,它会产生它的 key 的字符串,或者与数字字面量的结合 或者可以说是一个联合类型

```typescript
type Point = { x: number; y: number }

type P = keyof Point

// P 是 "x" | "y"
const p1: P = "x"
const p2: P = "y"
// const p3: P = "z" // 报错：不能将类型“"z"”分配给类型“keyof Point”。



// number 类型
type numish = {
  [i: number]: void
}

type Num = keyof numish

const n1:Num = 123
// const n2:Num = '45' // 不能将类型“string”分配给类型“number”


// string | number 类型 (有 number 是因为对象可以通过数字索引)
type mapish = {
  [i: string]: void
}

type Mapp = keyof mapish
// string | number

const m1: Mapp = 123
const m2: Mapp = '123'
```

### keyof 结合索引声明访问类型**

```typescript
type Person = {
  age: number,
  name: string,
  alive: boolean
}

// type 中声明类型可以访问属性值的方式取出
// type Age = Person['age']

// 由此可以
// 此处 Age 的类型是 number | string | boolean
type Age = Person[keyof Person]
let age: Age = 100
let age01: Age = "100"
let age02: Age = true

```

## keyof 结合 typeof

```typescript
const stuArray = [
  { name: 'John', age: 14 },
  { name: 'Jahn', age: 15 },
  { name: 'Jzhn', age: 16 },
]

// type Student1 = typeof stuArray[0]
// number 这里作为一个标识符 相当于取出任一一个作为type
type Student1 = typeof stuArray[number]

//  newStu: {name: string; age: number;}
const newStu: Student1 = {
  name: 'Kate',
  age: 18
}

// 以下三种取值方法 得到的类型都是number
type Age1 = Student1['age']

type Age2 = typeof stuArray[number]['age']

const key = 'age' (或者 type key = 'age')
type Age3 = Student1[typeof key]
```





## 泛型约束

如果我们直接对一个泛型参数取 `length` 属性,
会报错, 因为这个泛型根本就不知道它有这个属性



使用接口约束泛型 函数使用 `extend` 关键字 <T extends Interface>

```typescript
// function fn<T>(x: T) {
//   // console.log(x.length) // 类型“T”上不存在属性“length”。
// }

// 使用接口约束泛型

interface ILen {
  length: number
}

function f1<T extends ILen>(x: T) {
  console.log(x.length) // 类型“T”上不存在属性“length”。
}

f1<string>('1234')
// f1<number>(1213) // error 类型“number”不满足约束“ILen”

f1<string[]>(['a', 'b', 'c', 'd', 'e', 'f'])

f1([1, 2, 3, 4, 5]) // 可以省略

```



## 在泛型约束中使用类型参数

> 这个暂时不理解为什么不需要声明type 先记忆

我们可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束。

> 约束函数 泛型K 必须有 泛型T 上的 keys 才可以通过

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

let x = {a:1, b:2, c:3, d:4};
getProperty(x, "a"); // 正常
getProperty(x, "m"); // 异常
```



## 泛型中使用类类型

在 TypeScript 中使用泛型来创建工厂函数的时候 有必要通过其构造函数引用类的类型

> 一般写法 (传入的是类 而非实例)

```typescript
function create<Type>(c: { new(): Type }): Type {
return new c()
}
```

例子

```typescript
class Beekeeper {
hasMask: boolean = true
}
class Zookeeper {
nametag: string = "liubei"
}
class Animal {
numLegs: number = 4
}
class Bee extends Animal {
keeper: Beekeeper = new Beekeeper()
}
class Lion extends Animal {
keeper: Zookeeper = new Zookeeper()
}

// 调用函数时  A这个泛型必须是 Animal 的子类 
// 调用函数时 期望实例化这个类 并且返回这个类
function createInstance<A extends Animal>(c: new() => A): A {
return new c()
}
createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask

// createInstance(Beekeeper)
// 报错：
// 类型“typeof Beekeeper”的参数不能赋给类型“new () => Animal”的参数。
// 类型 "Beekeeper" 中缺少属性 "numLegs"，但类型 "Animal" 中需要该属性。
```



# namespace 命名空间

我们在工作中无法避免全局变量造成的污染，TypeScript提供了namespace 避免这个问题出现

内部模块，主要用于组织代码，避免命名冲突。
命名空间内的类默认私有
`通过 export 暴露`
`通过 namespace 关键字定义`

TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）

```typescript
// 通过 export 暴露
// 通过 namespace 定义

// 实际编译js的结果就是 匿名函数 及 匿名函数的嵌套

namespace A {
  export function fn<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
  }
  export type Attrs = string | number
  export const type = 123

  //嵌套使用
  export namespace C {
    export namespace D {
      export const free = "free"
    }
  }
}

namespace B {
  export type Attrs = number[]
  export const type = 'type'
}

// 调用内部变量 直接 namespace.属性

const test1: B.Attrs = [1, 2, 3]

const test2: A.Attrs = 123


//如果有相同的命名空间 则会进行属性的合并
namespace B {
  export const c = 111
}
console.log(B.c) // 111




const freeD = A.C.D.free

// 上面的名字太长 可以简化命名空间
import E = A.C.D
const easyFreeD = E.free

console.log(freeD) // free

console.log(easyFreeD) // free



/////////////////////////



import { another } from './namespace2'
// 引入已经导出命名空间的模块
console.log(another.name)
```





# 引入声明文件



当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能

什么是声明语句

假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 `<script>` 标签引入 `jQuery`，然后就可以使用全局变量 `$` 或 `jQuery` 了。

但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么东西

```typescript
/* 
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
声明语句: 如果需要ts对新的语法进行检查, 需要要加载了对应的类型说明代码
  declare var jQuery: (selector: string) => any;
声明文件: 把声明语句放到一个单独的文件（jQuery.d.ts）中, ts会自动解析到项目中所有声明文件
下载声明文件: npm install @types/jquery --save-dev
*/

jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.
```

如果第三方库没有自带声明文件，我们需要使用 declare var 来定义它的类型

```typescript
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```

declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果是：

```typescript
jQuery('#foo');
```

一般声明文件都会单独写成一个 `xxx.d.ts` 文件

创建 `01_jQuery.d.ts`, 将声明语句定义其中, TS编译器会扫描并加载项目中所有的TS声明文件

```typescript
declare var jQuery: (selector: string) => any;
```

很多的第三方库都定义了对应的声明文件库, 库文件名一般为 `@types/xxx`, 可以在 `https://www.npmjs.com/package/package` 进行搜索

有的第三库在下载时就会自动下载对应的声明文件库(比如: webpack),有的可能需要单独下载(比如jQuery/react)

##  
