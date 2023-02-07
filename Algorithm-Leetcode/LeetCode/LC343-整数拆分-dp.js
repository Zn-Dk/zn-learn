/*
    343. 整数拆分
    给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。

    返回 你可以获得的最大乘积 。



    示例 1:

    输入: n = 2
    输出: 1
    解释: 2 = 1 + 1, 1 × 1 = 1。
    示例 2:

    输入: n = 10
    输出: 36
    解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。


    提示:

    2 <= n <= 58
*/

/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  // dp 推导
  // dp[n] <= n 可获得的最大乘积

  // dp[n] = j * (n - j) // 仅拆两部分
  // dp[n] = j * dp[n - j] // 拆成多部分

  // 初始化
  // dp[0] = dp[1] = 0
  // dp[2] = 1  第一个有效的
  const dp = new Array(n + 1).fill(0); // 注意数组长度应该是 n + 1
  dp[2] = 1;
  if (n === 2) return 1;
  for (let i = 3; i <= n; i++) {
    // 优化1 应尽可能拆成大小类似的子数 所以 i 可以只循环到 i/2
    for (let j = 1; j <= ~~(i / 2); j++) {
      dp[i] = Math.max(j * (i - j), j * dp[i - j], dp[i]);
    }
  }
  return dp[n];
};
