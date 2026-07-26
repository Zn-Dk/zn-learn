/**

LCR 098. 不同路径
中等
https://leetcode.cn/problems/2AoeFn/
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
问总共有多少条不同的路径？

输入：m = 3, n = 7
输出：28
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


  */
function uniquePaths(row: number, col: number): number {
   // dp[i][j] m/n-> row/col
   // 初始化dp
    let dp: number[][] = Array.from({length:row}, (_v, i) => {
        let cols
        // 到达第一行每一列的路径都是1种
        if (i === 0) {
        cols = new Array(col).fill(1)
        } else {
        // 其他初始化为0
        cols = new Array(col).fill(0)
        // 到达第一列也是一种解法
        cols[0] = 1
        }
        return cols
    })

    // 第二行开始
    for (let i = 1; i< row; i++) {
        for (let j = 1; j< col; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }

    // console.log(dp)
    return dp[row-1][col-1]
};

const res1 = uniquePaths(3, 7)
console.log(res1)