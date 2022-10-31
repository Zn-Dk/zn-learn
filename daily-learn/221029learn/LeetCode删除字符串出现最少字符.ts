/*
    描述
    实现删除字符串中出现次数最少的字符，若出现次数最少的字符有多个，则把出现次数最少的字符都删除。输出删除这些单词后的字符串，字符串中其它字符保持原来的顺序。

    数据范围：输入的字符串长度满足 1 ≤ n ≤ 20  ，保证输入的字符串中仅出现小写字母
    输入描述：
    字符串只包含小写英文字母, 不考虑非法输入，输入的字符串长度小于等于20个字节。

    输出描述：
    删除字符串中出现次数最少的字符后的字符串。

    示例1

    输入：
    aabcddd

    输出：
    aaddd




*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
interface O {
  [k: string]: number;
}
rl.on("line", function (str: string) {
  // 统计字符串出现次数
  let res: O = [...str].reduce((acc, cur) => {
    acc[cur] ? acc[cur]++ : (acc[cur] = 1);
    return acc;
  }, <O>{});
  // 得到最小数
  let min = Math.min(...Object.values(res));
  // 输出次数大于最小数的
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    // 循环字符串 如果字符串这一位在统计表里的次数比最小次数大 就输入新字符串
    if (res[str[i]] > min) {
      newStr += str[i];
    }
  }
  console.log(newStr);
});
