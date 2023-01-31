import { a } from "./a.mjs";

console.log(`b.js 执行,现在a= ${a()}`);
console.log("b.js 执行完毕");

export function b() {
  return "bbb";
};
