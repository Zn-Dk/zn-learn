exports.b = false

let a = require('./a')
console.log(`b.js 执行,现在a= ${a.a}`)
exports.b = true
console.log('b.js 执行完毕')