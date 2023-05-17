/// <reference types="vite/client" />
declare module 'common' {
  const foo: number;
  const rdm: (num: number) => number;
  const fetchData: () => Promise<any>;
  export interface common {
    foo,
    rdm,
    fetchData
  }
}
