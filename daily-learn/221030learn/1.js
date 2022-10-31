const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (str) {
  // 回文数
  let newStr = [];
  let len = str.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (str[i] !== str[len - i - 1]) {
      console.log(str[i], str[len - i - 1]);
      newStr = [];
    }
    newStr.push(str[i]);
  }
  console.log(newStr);
});
