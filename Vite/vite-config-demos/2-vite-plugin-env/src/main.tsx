// 其他plugin测试
import './test/emoji'
import './test/alias'
import './test/mockApi'

// 这里的 virtual:module 是一个 Vite 虚拟模块;
// 参考 plugin / vite-plugin-virtual-module.ts
// @ts-ignore
// import { hello } from 'virtual:module'
// console.log(hello);
import hello2 from 'virtual:module2'
hello2()


// 这里是一个语法糖, 可以在浏览器中直接使用 (VITE 仅支持这个替换, 不像 webpack 支持 process.env)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// console.log('VITE_API_URL', process.env.VITE_API_URL)
// main.ts:3  Uncaught ReferenceError: process is not defined

// ⚠️ 需要用 import.meta.env
console.log('import.meta.env', import.meta.env)
console.log('DEV', import.meta.env.DEV) // boolean
console.log('VITE_API_URL', import.meta.env.VITE_API_URL) // /api

try {
  fetch(`${import.meta.env.VITE_API_URL}/test`)
  fetch('/report')
} catch (error) {
}
