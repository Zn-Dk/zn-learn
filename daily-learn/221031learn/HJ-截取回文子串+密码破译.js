const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 截取最大回文子串
// 对应华为机试题 HJ32 密码截取
rl.on("line", function (str) {
  let len = str.length;
  const centerSpread = (s, left, right) => {
    // 每次符合条件 都向外扩散
    while (left >= 0 && right < len && s[left] === s[right]) {
      left--;
      right++;
    }
    return s.substr(left + 1, right - left - 1); //将最后的回文数截取出来
  };
  let res = "";
  for (let i = 0; i < len; i++) {
    let s1 = centerSpread(str, i, i); //对应ABBA
    let s2 = centerSpread(str, i, i + 1); //对应ABCBA
    res = s1.length > res.length ? s1 : res;
    res = s2.length > res.length ? s2 : res;
  }
  console.log(res); // 输出这个回文数或者长度随你
});
