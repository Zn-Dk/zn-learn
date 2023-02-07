const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  while ((line = await readline())) {
    let num = ~~line;
    const arr = []; //所有因子
    function isPrime(num) {
      // 是否素数
      for (var i = 2; i < num; i++) {
        if (num % i === 0) return false; //被某个数整除了
      }
      return true;
    }
    let i = 2;
    while (i <= num) {
      if (num % i == 0 && isPrime(i)) {
        arr.push(i);
        num /= i; //紧接着将这个数继续代入运算
        continue;
      }
      i++; // 否则素数++
    }
    console.log(arr.join(" "));
  }
})();

// 优化
// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

void (async function () {
  while ((line = await readline())) {
    let num = ~~line;
    const arr = []; //所有因子
    for (let i = 2; i < num; i++) {
      if (i > Math.sqrt(num) + 1) {
        i = num;
      }
      while (num % i == 0) {
        arr.push(i);
        num /= i; //紧接着将这个数继续代入运算
      }
    }
    console.log(arr.join(" "));
  }
})();
