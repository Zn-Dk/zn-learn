/**
 * 给一个网格，1 是陆地，0 是水，
 * 求有几个岛屿（相连的陆地算一个岛）。
 *
 * 网格：
    1 1 0 0
    1 0 0 1
    0 0 1 0

    答案：3 个岛屿
    岛A：(0,0)(0,1)(1,0)  ← 左上角三个1相连
    岛B：(1,3)            ← 右侧单独一个1
    岛C：(2,2)       ← 右下单独一个1
 */

function countIslands(grid: number[][]) {
  let count = 0
  const rows = grid.length
  const cols = grid[0]!.length

  // dfs 用淹没法
  const dfs = (r: number, c: number) => {
    // 边界
    if (r < 0 || c < 0 || r >= rows || c >= cols) return
    // 水(返回)
    if (grid[r][c] === 0) return

    // 淹没
    grid[r][c] = 0

    // 上下左右出发尝试淹没相邻土地
    dfs(r - 1, c)
    dfs(r + 1, c)
    dfs(r, c - 1)
    dfs(r, c + 1)
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        // 发现 1(岛屿) 先count++
        count++
        // dfs淹没相邻陆地
        // 直到整个岛屿被淹没完全(隔离开其他的岛)
        dfs(row, col)
      }
    }
  }

  return count
}

const grid1 = [
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 0, 1, 0],
]

const grid2 = [
  [1, 1, 0, 0],
  [1, 1, 0, 1],
  [0, 0, 1, 1],
]

console.log(countIslands(grid1)) // 3
console.log(countIslands(grid2)) // 2
