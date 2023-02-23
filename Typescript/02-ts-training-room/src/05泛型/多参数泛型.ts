
// 泛型参数可以是多种的

function fn1<K, V>(x: K, y: V): string | number | [K, V] {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y
  }
  if (typeof x === 'string' && typeof y === 'string') {
    return x + '_' + y
  }
  return [x, y]
}

console.log(fn1<number, number>(1, 2)) // 3

console.log(fn1<string, string>('1', '2')) // 1_2

console.log(fn1<string, number>('1', 1)) // ['1', 1]