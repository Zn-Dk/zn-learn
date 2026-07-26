
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')


const norFn = `function foo () {
  console.log('foo')
}`
const arFn = `() => 1`
const arFn2 = `const arFn2 = (a, b) => {
  console.log('hello', a, b)
}`
const asyncArFn = `async (foo) => {
  console.log('async', foo)
}`

// type: ArrowFunctionExpression
// ...
// async: boolean
// generator: boolean
// params: ASTNode[]

const ast1 = parser.parse(arFn)
// console.log('AST1============================');
// console.log(JSON.stringify(ast1.program.body[0].expression, null, 2));

const ast2 = parser.parse(arFn2)
console.log('AST2============================');
console.log(JSON.stringify(ast2.program.body, null, 2));

// const ast3 = parser.parse(asyncArFn)
// console.log('AST3============================');
// console.log(JSON.stringify(ast3.program.body[0].expression, null, 2)); 1

const astNor = parser.parse(norFn)
console.log('AST Nor============================');
console.log(JSON.stringify(astNor.program.body[0], null, 2)); 1