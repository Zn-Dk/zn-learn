
// 泛型也可以应用在类上

abstract class GenericNumber<T>{
  abstract add(x: T, y: T): T
  abstract toString(n: T): string
  abstract fixed(n: T, digit: T): string
}

class myNum extends GenericNumber<number>{
  add(x: number, y: number) {
    return x + y
  }
  toString(n: number) {
    return n.toString()
  }
  fixed(n: number, digit: number) {
    return n.toFixed(digit)
  }
}

let m = new myNum()

console.log(m.add(1, 2))

console.log(m.toString(12414512))

console.log(m.fixed(123.23, 1))