// export type Equal<T, K> = T extends K ? (K extends T ? true : false) : false;
export type Expect<T extends true> = T
export type ExpectTrue<T extends true> = T
export type ExpectFalse<T extends false> = T
export type IsTrue<T extends true> = T
export type IsFalse<T extends false> = T

export type Equal<X, Y> = 
(<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true
  : false;

export type NotEqual<X,Y> = true extends Equal<X, Y> ? false : true