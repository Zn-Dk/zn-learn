import type { Alike, Equal, Expect, NotAny } from '@type-challenges/utils'

// 实现一个泛型MyReadonly2<T, K>，它带有两种类型的参数T和K。
// 类型 K 指定 T 中要被设置为只读 (readonly) 的属性。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。

type MyReadonly2<T, K extends keyof T = keyof T> =
{ readonly [P in K]: T[P] }
& { [Other in keyof T as (Other extends K ? never: Other)]: T[Other] }

type Test = MyReadonly2<Todo1, 'title' | 'description'>;

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}