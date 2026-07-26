

// 去掉左侧空格 
type TrimLeft<S extends string> = S extends ` ${infer Rest}` ? TrimLeft<Rest> : S;
// 去掉右侧空格 
type TrimRight<S extends string> = S extends `${infer Rest} ` ? TrimRight<Rest> : S;

// 去掉两侧空格 
type TrimBoth<S extends string> = S extends ` ${infer Rest}` | `${infer Rest} `
  ? TrimBoth<Rest>
  : S;

type trimmed = TrimBoth<'  Hello World  '> // expected to be 'Hello World'
type trimmedLeft = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
type trimmedRight = TrimRight<'  Hello World  '> // expected to be '  Hello World'