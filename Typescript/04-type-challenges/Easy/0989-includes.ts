import type { Equal, Expect, NotAny } from '@type-challenges/utils'

// 在类型系统里实现 JavaScript 的 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。

// ❌
// type Includes<Arr extends any[], Item> = Item extends Arr[number] 
// ? Arr[number] extends Item ? true : false
// : false

// 1.递归检查法 (On)
type Includes1<Arr extends any[], Item> = Arr extends [infer F, ...infer Rest] 
  ? Equal<F, Item> extends true 
    ? true
    : Includes1<Rest, Item>
  : false;

// 2. 转换为对象 (这个特别巧妙😀, 不过有几个case不通过)
type Includes<Arr extends readonly any[], Item> = {
  [key in Arr[number]]: 1 // 存在数组的都标记为 true(或者其他的)
}[Item] extends 1 ? true : false; // 用key取出 看是不是1

let test: Includes<[boolean, 2, 3, 5, 6, 7], false>;

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]