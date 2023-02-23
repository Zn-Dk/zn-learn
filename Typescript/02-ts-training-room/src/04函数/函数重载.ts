// 函数重载: 函数名相同, 而形参不同的多个函数

// 案例 1
// 需求: 实现一个add函数，
// 它可以接收2个string类型的参数进行拼接，
// 也可以接收2个number类型的参数进行相加
// 但是必须是成对出现**

// 如果我们这么写 显然是要报错的
// function add(x: number | string, y: number | string): number | string {
//    return x + y; // 运算符“+”不能应用于类型“string | number”和“string | number”
// }

// 一般的解决方案: 通过类型守卫严格判断两个参数的类型; 但这种方法过于麻烦了
function add(x: number | string, y: number | string): number | string {
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  }
  return <string>x + <string>y;
}

console.log(add("1", "2")); // 12

console.log(add(1, 2)); // 3

console.log(add(1, "2")); // 12 <- 这是不对的,函数做了断言,导致没有限定成功

// 通过重载声明 解决上面的问题
function declaredAdd(x: number, y: number): number;
function declaredAdd(x: string, y: string): string;
function declaredAdd(x: number | string, y: number | string): number | string {
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  }
  return <string>x + <string>y;
}
// console.log(declaredAdd(1, "2"));
/*

报错:
  没有与此调用匹配的重载。
  第 1 个重载(共 2 个)，“(x: number, y: number): number”，出现以下错误。
    类型“string”的参数不能赋给类型“number”的参数。
  第 2 个重载(共 2 个)，“(x: string, y: string): string”，出现以下错误。
    类型“number”的参数不能赋给类型“string”的参数。

    这个意思是告诉你 只能同时传成对的 number | string 否则就不接受
    假如不写函数重载 这个函数就会返回第二种字符串拼接的结果(如果是其他情况 往往会报错)

*/

// 案例2
// 有一API getData
// 希望在一个函数里实现 getDataList 返回多组数据和 getDataById 返回一组数据
interface IData {
  name: string;
  age: string;
}

function getData(ID: string | string[]): IData | IData[] {
  let data: unknown;
  // fetchData...
  if (Array.isArray(ID)) {
    return data as IData[];
  } else {
    return data as IData;
  }
}

// 当我们要找一个变量接收这个值时
let resData: IData[];

// ERROR : 不能将类型“IData | IData[]”分配给类型“”。类型“IData”缺少类型“IData[]”的以下属性: length, pop, push, concat 及其他 29 项。

// TS 没有这么智能，它确实不知道你到底是想一个一个字符串 返回==>一个数据，还是 一个字符串 返回==> 多个数据。
// TS 目前的推断是会返回 IData[] 或者 IData
// resData = getData(["hello", "world"]);

// 解决方法1 断言 BUT NOT ELEGANTTO!
resData = getData(["hello", "world"]) as IData[];

// 解决方法2 函数重载

// 1.重载签名
// 重载签名的意思就是只需要你提供一个函数的参数类型和返回值类型，不需要你提供函数体
function getData2(ID: string): IData;
function getData2(ID: string[]): IData[];
// 2.实现签名 以上已经声明好了入参和返回值的对应情景
// 实现签名其实就是一个带有函数体的同名函数。并且这个函数的参数类型要完全包含函数签名的所有类型。
// 函数重载可以有多个重载签名，但是只允许有一个实现签名。说白了就是一个函数名只能有一个函数体。
function getData2(ID: string | string[]): IData | IData[] {
  let data: unknown;
  // fetchData...
  if (Array.isArray(ID)) {
    return data as IData[];
  } else {
    return data as IData;
  }
}
let resData2: IData[];
resData2 = getData2(["zz", "kk"]); // 这时候就无需断言了
