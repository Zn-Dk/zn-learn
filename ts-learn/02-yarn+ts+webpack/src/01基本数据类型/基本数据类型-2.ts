(() => {



  // 可选参数

  // 定义一个tuple 最后一位 number 可省略
  type point = [number, number, number?]

  let point_2D: point = [1, 2]

  let point_3D: point = [1, 2, 3]



  //////////////////////////////////////////////////////////////////////



  // 非空断言操作符

  // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue - decorator中的@Prop
  // 变量后使用 ！：表示类型推断排除null、undefined

  let element: HTMLElement
  // element = document.querySelector("#id") // 不能将类型“HTMLElement | null”分配给类型“HTMLElement”。

  // 如果已经确定这是一个有返回值的变量
  element = document.querySelector("#id")!


  let x: string | null | undefined
  let y: string
  // x = y //错误
  x = y!//正确，y！表示y排除null undefined类型


  function myFunc(maybeString: string | undefined | null) {
    // const onlyString: string = maybeString; //Error
    const ignoreUndefinedNull: string = maybeString!;//Ok
  }



  //////////////////////////////////////////////////////////////////////



  // 联合类型 表示取值可以为多种类型中的一种

  // 使用 | 将 不同的类型分隔开


  let union: number | string | boolean = 123
  union = 'foo' // OK
  union = false // OK
  //union = [1] // ERROR

  // 定义一个函数得到一个数字或字符串值的字符串形式值
  function toString(x: number | string): string {
    return x.toString()
  }

  console.log(toString(1234)) // '1234'

  console.log(toString('foo'))


  // 数组声明(要用括号括起来)
  let arr1: (number | string | boolean)[] = [1, '2', '3']

  // 数组声明时不指定类型 也会得到一个推断出的联合类型数组 (string | number | number[])[]
  let arr2 = [1, '2', '3', [1]]

  //注意 和元组的区别(限制了长度和对应位类型)
  //let arr3: [string, number] = [2, '1'] //ERROR



  //////////////////////////////////////////////////////////////////////



  // 类型断言

  // 告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构
  // 它没有运行时的影响，只是在编译阶段起作用。 TypeScript 会假设你，程序员，已经进行了必须的检查。


  // 定义一个函数得到一个数字或字符串值的长度 并使用类型断言优化
  function getLen(x: number | string): number {
    //return x.toString() 字符串类型没有必要toString

    // 断言有两种方式 不过两者在紧跟调用方法时都要用括号括起来

    // 1. 尖括号  (<type>x)
    if ((<string>x).length) {

      // 2. x as type tsx中只能用这种方式
      return (x as string).length
    } else {
      return x.toString().length
    }
  }

  console.log(getLen('foobarfoo')) // 9

  console.log(getLen(12334)) // 5



  //////////////////////////////////////////////////////////////////////



  // 类型推断

  // 1. 变量的类型会在赋值时被推断为第一次赋值的类型
  let a = 1
  // a = false ERROR
  a = 2

  let b = [1, 2, 3]
  b = [1, 2, 4]
  //b = 5 ERROR
  console.log(b)

  // 2. 如果不赋初始值 变量的类型会被推断成 any (应当避免)
  let c
  // 以下赋值都会正常进行 而不类型报错
  c = false
  c = 'ttt'
  c = [1, 2, 3]



  //////////////////////////////////////////////////////////////////////



  // 文字类型 (字面量类型)

  let word: 'hello'
  // word = 'world' // ERROR 不能将类型“"world"”分配给类型“"hello"”

  let gender: 'male' | 'female'

  let dice: 0 | 1 | 2 | 3 | 4 | 5 | 6


  // 使用文字联合类型

  function showDirection(direction: 'north' | 'south' | 'west' | 'east') {
    return `Your direction is ${direction}`
  }

  console.log(showDirection('south'))
  // console.log(showDirection('zzzz')) // 报错 因为不符合这四种值的一个


  function showAnyMsg(msg: 'hello' | number[] | false) {
    return `You have ${msg}`
  }

  console.log(showAnyMsg([1, 2, 3]))
  console.log(showAnyMsg('hello'))
  console.log(showAnyMsg(false))
  // console.log(showAnyMsg(true)) //ERROR


  let req = {
    url: 'http://localhost',
    method: 'POST' as 'POST', // 强制类型推断
  }

  type Request = {
    url: string,
    method: 'GET' | 'POST' | 'PUT'
  }
  function fetchData(REQ: Request) {
    console.log('URL:' + REQ.url)
    console.log('METHOD:' + REQ.method)
  }

  fetchData(req)

})()
