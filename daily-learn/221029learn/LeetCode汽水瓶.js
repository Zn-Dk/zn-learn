const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

/*
  描述
  某商店规定：三个空汽水瓶可以换一瓶汽水，允许向老板借空汽水瓶（但是必须要归还）。
  小张手上有n个空汽水瓶，她想知道自己最多可以喝到多少瓶汽水。
   n 为[1,100]

   输入：
    3
    10
    81
    0

    输出：
    1
    5
    40

    说明：
    样例 1 解释：
      用三个空瓶换一瓶汽水，剩一个空瓶无法继续交换
    样例 2 解释：
      用 9 个空瓶换 3 瓶汽水，喝掉 3 瓶 + 原有 1 空瓶 剩 4 个空瓶
      再用 3 个空瓶换 1 瓶汽水，剩 1+1 = 2 个空瓶，向老板借一个空瓶再用 3 个空瓶换 1 瓶汽水喝完还给老板
      总共喝到 5瓶
*/

void (async function () {
  // Write your code here
  while ((bottle = await readline())) {
    bottle = Number(bottle);
    if (bottle > 0) {
      let count = recur(bottle);
      console.log(count);
    }
  }
})();

function recur(n) {
  // 剩 1 瓶 没有汽水
  if (n === 1) {
    return 0;
  }
  // 剩 2 / 3 瓶 则返回 1
  if (n === 2 || n === 3) {
    return 1;
  }
  // n - 2(n - 3 + 1) 代表了向店主借1个瓶子 余下瓶可以产出的汽水数
  return 1 + recur(n - 2);
}
