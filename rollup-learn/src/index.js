import { b, foo } from "../test/foo";

import { reverse } from "lodash-es";

import { users } from "../test/a.json";

const arr = [1, 3, 24, 52, 53, 2];

let rev = reverse(arr);
console.log(rev);

console.log("user" + users[0].user);

console.log("Hello Rollup");
console.log(b);

// commonjs plugin test  将第三方库编译为esm
import dayjs from "dayjs";
function getDate() {
  return dayjs().toJSON();
}
console.log(getDate());

const fz = 123;
const bz = "bbc";
console.log(fz + bz);
// const req = require("../test/common");
// const res = req.isPalindrome(5);
// console.log(res);

const jz = () => {
  console.log("jz");
};
jz();

import "@/assets/global.css";
