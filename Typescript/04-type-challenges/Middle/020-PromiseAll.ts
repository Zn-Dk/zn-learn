import type { Equal, Expect, NotAny } from '@type-challenges/utils'

// 给函数PromiseAll指定类型，它接受元素为 Promise 或者类似 Promise 的对象的数组，
// 返回值应为Promise<T>，其中T是这些 Promise 的结果组成的数组。

const promise1 = Promise.resolve(3);
const promise2 = 42; // ⚠️ 注意这里不是Promise
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});
const plst = [promise1, promise2, promise3] as const 

// 两种写法
// declare function PromiseAll<T extends readonly any[]>(promises: T): Promise<{
//   -readonly [k in keyof T]: T[k] extends Promise<infer R> ? R : T[k]
// }>

declare function PromiseAll<T extends any[]>(promises: readonly [...T]): Promise<{
  [k in keyof T]: T[k] extends (Promise<infer R> | infer R) ? R : never
}>
// type PromiseAll = <T extends readonly any[]>(promises: readonly [...T]) => Promise<{
//  [k in keyof T]: T[k] extends Promise<infer R> ? R : T[k]
// }>
// type PromiseAll = <T extends readonly any[]>(promises: T) => Promise<{
//  -readonly [k in keyof T]: T[k] extends Promise<infer R> ? R : T[k]
// }>

// 应推导出 `Promise<[number, 42, string]>`
const p = PromiseAll(plst)