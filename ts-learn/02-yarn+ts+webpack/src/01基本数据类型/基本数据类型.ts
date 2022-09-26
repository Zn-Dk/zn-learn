(() => {
  // 命名数据类型的方式 foo:type = value
  // TS 使用 let / const 作为修饰符
  // 定义变量后 不能将类型不同的值赋给原始变量

  //////////////////////////////////////////////////////////////////////

  // 布尔类型
  let bol: boolean = false;
  bol = true;
  console.log(bol);
  // bol = 'false' 不能将类型“string”分配给类型“boolean”

  //////////////////////////////////////////////////////////////////////

  // 数字类型
  let a1: number = 10; // 十进制
  let a2: number = 0b1010; // 二进制
  let a3: number = 0o12; // 八进制
  let a4: number = 0xa; // 十六进制
  console.log(a1, a2, a3, a4);

  //////////////////////////////////////////////////////////////////////

  // 字符串
  let str: string = "haha";
  const msg: string = "我有 ";
  const money: number = 1000;
  const strMoney: string = "800";

  // 字符串与数字拼接 遵循js规则
  console.log(msg + money);

  // **不支持** 跟在number后面进行数字运算 (报错 算术运算右侧必须是 "any"、"number"、"bigint" 或枚举类型。)
  //console.log(money - strMoney)

  //////////////////////////////////////////////////////////////////////

  // null 和 undefined
  // 默认情况下 null 和 undefined 是所有类型的子类型。
  let u: undefined = undefined;
  let n: null = null;
  // 非严格模式下 - 可以把 null 和 undefined 赋值给 number 类型的变量。
  //u = 1

  // 严格模式下 可以采用这种方法

  let nu: number | null = null;
  console.log("nu: " + nu); // nu: null
  nu = 1;
  console.log("nu: " + nu); // nu: 1

  //////////////////////////////////////////////////////////////////////

  // 数组 -> 原 js 中的 Array 被拆分成了: Array 数组 / Tuple 元组

  // Array

  // 1 在注解类型后面加 [] (一维数组)
  let numArr: number[];
  numArr = [1, 2, 3, 4];
  console.log(numArr);

  // 声明二维数组
  let numDuoArr: number[][];
  numDuoArr = [
    [1, 2],
    [3, 4],
  ];

  // 定义好类型的数组 是不能接受**定义之外**的类型的
  //numArr = ['1', '2'] // 不能将类型“string”分配给类型“number”

  // 2 使用数组泛型<>
  const bands: Array<string> = ["BMW", "Toyota", "Benz"];
  console.log(bands);

  // Tuple

  // 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型**不必相同**

  let t1: [string, number];
  t1 = ["hello", 10.123]; // OK
  // t1 = [10, 'hello'] // Error 必须位置上对应

  console.log(t1[0].split("")); // OK  ['h', 'e', 'l', 'l', 'o']
  console.log(t1[1].toFixed(2)); // OK 10.12
  //console.log(t1[1].split('')) // ERROR 类型“number”上不存在属性“split” (当访问一个已知索引的元素，会得到正确的类型)

  //////////////////////////////////////////////////////////////////////

  // 枚举  使用枚举类型可以为一组数值赋予友好的名字
  // 注意内部存的都是字符串值 但是书写的时候不需要加引号
  enum Fruit {
    apple,
    orange,
    peer,
  }

  // 枚举数值默认从 0 开始依次递增
  // 根据特定的名称得到对应的枚举数值
  console.log(Fruit.orange); // 1

  // 可以通过下标获取值
  console.log(Fruit[1]); // 'orange'

  // 手动赋值 (常见应用)
  enum Color {
    red = "Red",
    green = "Green",
    blue = "Blue",
  }

  console.log(Color.red); // "Red"
  console.log(Color["red"]); // "Red"

  //////////////////////////////////////////////////////////////////////

  // any 类型

  // 标记不明确类型的变量 可以任意赋值
  let anyVal: any = 1;
  anyVal = [1, 2];
  anyVal = "yes";

  // 并且当你只知道一部分数据的类型时，any 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

  let arr1: any[] = [1, "noo", null, [1, 2]];

  arr1[4] = false; // OK

  console.log(arr1); // [1, 'noo', null, Array(2), false]

  // 注意 如果赋值数组时不写类型注释, 可传入类型自动推断成联合类型 (string | number | number[] | null)
  let arr2 = [1, "noo", null, [1, 2]];

  // arr[4] = false      // ERROR: Boolean 不属于声明中类型的一种

  //////////////////////////////////////////////////////////////////////

  // 与any 相反 void 表示没有任何类型
  // 当一个函数没有返回值(undefined)时，你通常会见到其返回值类型是 void

  // 函数(): 后跟类型 表明了函数的返回值是什么类型
  function fn(): void {
    console.log("fn void");
    // return undefined // OK
    // return null // error
    // return 1 // error
  }
  fn();

  //////////////////////////////////////////////////////////////////////

  // object 类型 同 js

  // 这个函数传入 object 返回也是 object
  function fn2(o: object): object {
    console.log("fn2()", o);
    // return 123 ERROR
    return {
      ...o,
      test: "123",
    };
  }

  // console.log(fn2('abc')) // ERROR

  console.log(fn2({ a: 1, b: 2 })); // OK

  //////////////////////////////////////////////////////////////////////

  // unknown 类型 是TS3.0中新增的一个顶级类型, 被称作安全的any
  // 比 any 类型更语义化 表示 我现在不清楚这个变量的类型 但是又不想它是任意类型
  // 任何类型都可以赋值给unknown类型

  let un: unknown;
  un = 123;
  un = "abc";
  un = false;
  let un1: number[] = [1, 2, 3];
  un = un1;
  console.log("un:", un);

  //如果没有类型断言或基于控制流的类型细化, 那么不能将unknown类型赋值给其它类型
  let value1: unknown = 123;
  let value2: number;

  //value2 = value1; // ERROR: 不能将类型“unknown”分配给类型“number”
  value2 = value1 as number; // 类型断言

  // value1++ // ERROR: 对象的类型为 "unknown"。
  (value1 as number)++; // 类型断言

  if (typeof value1 === "number") {
    // 基于控制流的类型细化(类型缩小)
    value2 = value1;
    value1++;
  }
})();
