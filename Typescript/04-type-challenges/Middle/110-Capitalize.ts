// 实现 Capitalize<T> 它将字符串的第一个字母转换为大写，其余字母保持原样。

// Uppercase 工具函数
type MyCapitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

// Capitalize 也是内置的工具函数
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
type capitalized2 = MyCapitalize<'hello world'> // expected to be 'Hello world'


const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

const TOKEN_FROM_MAP: Record<string, (s: string) => string[]> = {
  camel: s => s.split(/(?=[A-Z])/),
}
const TOKEN_TO_MAP: Record<string, (tokens: string[]) => string> = {
  camel: tokens =>
    [tokens[0], ...(tokens.slice(1).map(capitalize))].join(''),
  pascal: tokens => tokens.map(capitalize).join(''),
  kebeb: tokens => tokens.join('-').toLowerCase(),
}

const convert = (
  s: string,
  from: keyof typeof TOKEN_FROM_MAP,
  to: keyof typeof TOKEN_TO_MAP,
) => TOKEN_TO_MAP[to](TOKEN_FROM_MAP[from](s));

console.log(convert('helloWorld', 'camel', 'kebeb'));
