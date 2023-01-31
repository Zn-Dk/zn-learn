import { b } from "../es6 module/b.mjs";

console.log(`a.js 执行,现在b= ${b()}`);
console.log("a.js 执行完毕");

export function a() {
  return "aaa";
};
