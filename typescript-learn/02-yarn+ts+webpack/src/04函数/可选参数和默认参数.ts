
/*

可选参数与默认参数:
  TypeScript 里的每个函数参数都是必须的。
  这不是指不能传递 null 或 undefined 作为参数，
  而是说编译器检查用户是否为每个参数都传入了值。
  编译器还会假设只有这些参数会被传递进函数。
  简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

  JavaScript 里，每个参数都是可选的，可传可不传。
  没传参的时候，它的值就是 undefined。
  在TypeScript 里我们可以在参数名旁使用 ? 实现可选参数的功能。

*/


// 1. y 可选
function optional(x: number, y?: number): number {
  console.log('y is: ' + y);
  return y ? (x + y) : (x ** 2)
}

console.log(optional(10)) // 100   y is: undefined

console.log(optional(5, 10)) // 15  y is: 10



// 2. y 有默认值
function optional2(x: number, y: number = 5): number {
  console.log('y is: ' + y);
  return x + y
}

console.log(optional2(10)) // 15   y is: 5

console.log(optional2(5, 10)) // 15  y is: 10

///////////////////////////////////////////////////////

// 剩余参数 REST
// 与 JS ES6规则类似

function rest(x: boolean, y: number, ...args: string[]) {
  console.log('x is: ' + x);
  console.log('y is: ' + y);
  console.log('args is:')
  console.log(args)
}

rest(true, 100, 'a', 'b', 'c')