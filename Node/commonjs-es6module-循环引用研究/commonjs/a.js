exports.a = false

let b = require('../commonjs/b')
console.log(`a.js 执行,现在b= ${b.b}`)
exports.a = true
console.log('a.js 执行完毕')