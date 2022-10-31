// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let encodes, decodes;
// rl.on("line", function (input) {
//   if (!encodes) {
//     encodes = input.split("");
//   } else {
//     decodes = input.split("");
//     console.log(trans(encodes, false));
//     console.log(trans(decodes, true));
//   }
// });

// // 策略模式 (是否解密)
// const strategies = (isDecode = false) => {
//   return [
//     {
//       reg: /\d/,
//       fn: (word) => {
//         // 解码的时候防止 0 变成负数
//         return isDecode ? (~~word + 10 - 1) % 10 : (~~word + 1) % 10;
//       },
//     },
//     {
//       reg: /[a-z]/,
//       fn: (word) => {
//         // 转码表
//         let trans = isDecode
//           ? "ZABCDEFGHIJKLMNOPQRSTUVWXY"
//           : "BCDEFGHIJKLMNOPQRSTUVWXYZA";
//         let origin = "abcdefghijklmnopqrstuvwxyz";
//         return trans[origin.indexOf(word)];
//       },
//     },
//     {
//       reg: /[A-Z]/,
//       fn: (word) => {
//         // 转码表
//         let trans = isDecode
//           ? "zabcdefghijklmnopqrstuvwxy"
//           : "bcdefghijklmnopqrstuvwxyza";
//         let origin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//         return trans[origin.indexOf(word)];
//       },
//     },
//   ];
// };

// function trans(words, isDecode) {
//   return words
//     .map((word) => {
//       let result;
//       strategies(isDecode).forEach(({ reg, fn }) => {
//         reg.test(word) && (result = fn(word));
//       });
//       return result;
//     })
//     .join("");
// }

/*
    描述
    对输入的字符串进行加解密，并输出。

    加密方法为：

    - 当内容是英文字母时则用该英文字母的后一个字母替换，同时字母变换大小写,如字母a时则替换为B；字母Z时则替换为a；
    - 当内容是数字时则把该数字加1，如0替换1，1替换2，9替换0；
    - 其他字符不做变化。

    解密方法为加密的逆过程。
    数据范围：输入的两个字符串长度满足 1 \le n \le 1000 \1≤n≤1000  ，保证输入的字符串都是只由大小写字母或者数字组成

    输入描述：
    第一行输入一串要加密的密码
    第二行输入一串加过密的密码

    输出描述：
    第一行输出加密后的字符
    第二行输出解密后的字符

    示例1
    输入：
    abcdefg
    BCDEFGH

    输出：
    BCDEFGH
    abcdefg

*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 直接查表完事儿了，就跟发电报一样
let decodeMap =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let encodeMap =
  "bcdefghijklmnopqrstuvwxyzaBCDEFGHIJKLMNOPQRSTUVWXYZA1234567890";
let data = [];
rl.on("line", function (line) {
  data.push(line);
  if (data.length == 2) {
    let decode = []; // 解密后的字符集合
    let encode = []; // 加密后的字符集合
    for (char of data[0]) {
      decode.push(encodeMap[decodeMap.indexOf(char)]);
    }
    console.log(decode.join(""));
    for (char of data[1]) {
      encode.push(decodeMap[encodeMap.indexOf(char)]);
    }
    console.log(encode.join(""));
  }
});
