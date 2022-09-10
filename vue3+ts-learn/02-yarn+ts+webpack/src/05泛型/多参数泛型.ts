
// 泛型参数可以是多种的

function fn1<K, V>(x: K, y: V): string | [K, V] {
  if (typeof x === 'number' || typeof x === 'number' ||
    typeof y === 'string' || typeof y === 'string') {
    return x as string + y as string
  }
  return [x, y]
}

console.log(fn1<number, number>(1, 2)) // 3

console.log(fn1<string, string>('1', '2')) // 12

console.log(fn1<string, number>('1', 1)) // ['1', 1]