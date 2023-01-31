// 函数重载: 函数名相同, 而形参不同的多个函数
// 需求: 我们有一个add函数，它可以接收2个string类型的参数进行拼接，
// 也可以接收2个number类型的参数进行相加 但是必须是成对出现


// 重载声明

function add(x: number, y: number): number
function add(x: string, y: string): string

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

    这个意思是告诉你 只能同时传成对的 number | string 否则就不接受
    假如不写函数重载 这个函数就会返回第二种字符串拼接的结果(如果是其他情况 往往会报错)

*/