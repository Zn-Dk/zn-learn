/*
    一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

    机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。

    现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

    网格中的障碍物和空位置分别用 1 和 0 来表示。


    输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
    输出：2
    解释：3x3 网格的正中间有一个障碍物。
    从左上角到右下角一共有 2 条不同的路径：
    1. 向右 -> 向右 -> 向下 -> 向下
    2. 向下 -> 向下 -> 向右 -> 向右

    提示：

    1 <= m, n <= 100

*/

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = function (obstacleGrid) {
  // m * n 矩阵 (row, col)

  // 动态规划
  // 1.dp 数组含义 到达 dp[i,j] 总共有多少条路径 同LC62

  // 2.递推公式 同LC62

  // 3.初始化**(关键)
  // 这次机器人会遇到障碍, 那么其实 如果障碍存在 路径的初始化是按照如下进行考虑的
  // [1, 1, "X", 0, 0];
  // [
  //   [1],
  //   [1],
  //   ["X"],
  //   [0],
  //   [0]
  // ];

  // 形成矩阵
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = Array(m)
    .fill()
    .map((item) => Array(n).fill(0)); // 数组要提前按 0 填充

  // 存在障碍的时候 循环要终止
  for (let i = 0; i < m && obstacleGrid[i]?.[0] !== 1; i++) {
    dp[i][0] = 1;
  }
  // 存在障碍的时候 循环要终止
  for (let i = 0; i < n && obstacleGrid[0]?.[i] !== 1; i++) {
    dp[0][i] = 1;
  }
  // 存在障碍的时候不计算 dp
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] !== 1) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
};

const obstacleGrid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
let res = uniquePathsWithObstacles(obstacleGrid);
console.log(res);
