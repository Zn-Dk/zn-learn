// DP 初始题 跳台阶

// 设有 n 级台阶, 一次可以跳 1 级或者 2 级, 问有多少种跳法


// 其实 f(n) = f(n-1) + f(n-2) == fibonacci 数列


const dfs = (x: number): number => {
  if (x == 1) return 1;
  if (x == 2) return 2;
  return dfs(x - 1) + dfs(x - 2);
}
