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


// 调用 直接  namespace.属性

const test1: B.Attrs = [1, 2, 3]

const test2: A.Attrs = 123


//如果有相同的命名空间 则会进行属性的合并
namespace B {
  export const c = 111
}
console.log(B.c)

const freeD = A.C.D.free

// 上面的名字太长 可以简化命名空间
import ACD = A.C.D
const easyFreeD = ACD.free

console.log(freeD) // free

console.log(easyFreeD) // free


import { another } from './namespace2'
// 引入已经导出命名空间的模块
console.log(another.name)

