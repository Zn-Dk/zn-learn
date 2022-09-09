(() => {
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


})()