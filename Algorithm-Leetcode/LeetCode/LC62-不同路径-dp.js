/*
    一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

    机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

    问总共有多少条不同的路径？

    来源：力扣（LeetCode）
    链接：https://leetcode.cn/problems/unique-paths
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

    示例 2：

    输入：m = 3, n = 2
    输出：3
    解释：
    从左上角开始，总共有 3 条路径可以到达右下角。
    1. 向右 -> 向下 -> 向下
    2. 向下 -> 向下 -> 向右
    3. 向下 -> 向右 -> 向下
    示例 3：

    输入：m = 7, n = 3
    输出：28
    示例 4：

    输入：m = 3, n = 3
    输出：6
     

    提示：

    1 <= m, n <= 100

*/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
  // m * n 矩阵 (row, col)

  // 动态规划
  // 1.dp 数组含义 到达 dp[i,j] 总共有多少条路径

  // 2.递推公式
  // 假设到达 x,y 的中间位置 因为只能从左方一格 或者 从上方一格到达
  // 则 dp[x, y] = dp[x - 1][y] + dp[x][y - 1];

  // 3.初始化
  // 因为路径都是从左和从上方得到的, 初始化就是 第一行 和 第一列
  // 又因为机器人只能有两种行进方式 因此第一行[m,0] 第一列 [0,n]
  // 都是 1 种方法 => dp[m, 0] = 1 dp[0, n] = 1

  // 形成矩阵(js 没有严格意义的矩阵)
  const dp = Array(m)
    .fill()
    .map((item) => Array(n));

  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  for (let i = 0; i < n; i++) {
    dp[0][i] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
};

let res = uniquePaths(3, 5);
console.log(res);
