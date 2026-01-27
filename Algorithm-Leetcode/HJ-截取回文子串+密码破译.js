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
    return right - left - 1; // 最后的回文数长度
  };

  let res = "";
  let start = 0; // 截取点
  let maxLen = 0;
  for (let i = 0; i < len; i++) {
    let len1 = centerSpread(str, i, i); //对应ABBA
    let len2 = centerSpread(str, i, i + 1); //对应ABCBA
    let len = Math.max(len1, len2);
    if (len > maxLen) {
      // i 为中心, 左边应该有(len - 1) / 2 个字符
      start = i - Math.floor((len - 1) / 2);
      maxLen = len;
    }
  }

  res = str.substring(start, start + maxLen);
  console.log(res); // 输出这个回文数或者长度随你
  return res;
});
