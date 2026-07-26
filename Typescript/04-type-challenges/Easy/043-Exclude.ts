import type { Equal, Expect, NotAny } from '@type-challenges/utils'


// ❌ 这里写反了,
// 事实上检查要排除的类型是否包含在被排除的类型中
// 这与 Exclude 的语义相反
// 返回值错了. 要返回的是 T 中没有被排除的部分
type MyExcludeWrong<T, Ex> = Ex extends T ? never : Ex;

type MyExclude<T, Ex> = T extends Ex ? never : T;
// 当 T = 'a' | 'b' | 'c', U = 'a'
// 实际上会这样展开：
// ('a' extends 'a' ? never : 'a') | 
// ('b' extends 'a' ? never : 'b') | 
// ('c' extends 'a' ? never : 'c')

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]
