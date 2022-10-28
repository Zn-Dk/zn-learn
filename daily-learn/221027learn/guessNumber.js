// 猜一个 1-50 的数字

// While 循环 不能超过10次
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", guessNumber);

function getRandomNumber(min, max) {
  return Math.max(min, Math.min(max, ~~(Math.random() * max + 1)));
}

const target = getRandomNumber(1, 50);
let count = 0;
let min = 1;
let max = 50;
function guessNumber(input) {
  input = Math.max(1, Math.min(50, ~~input));
  count++;
  if (input !== target) {
    let isGreater = input > target;
    let say = isGreater ? "大" : "小";
    // 如果偏大 则以 input 作为范围界限
    if (isGreater) {
      max = input;
    } else {
      min = input;
    }
    console.log(
      `你输入的数字${input}偏${say}, 范围为 ${min}~${max} 当前你已经猜了${count}次`
    );
    if (count === 10) {
      count = 0;
      return console.log("游戏结束!");
    }
    return;
  }
  console.log(`很棒!就是${target},你总共猜了${count}次`);
}
