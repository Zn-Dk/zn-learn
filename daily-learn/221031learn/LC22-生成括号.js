/*
  数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

   

  示例 1：

  输入：n = 3
  输出：["((()))","(()())","(())()","()(())","()()()"]
  示例 2：

  输入：n = 1
  输出：["()"]

  来源：力扣（LeetCode）
  链接：https://leetcode.cn/problems/generate-parentheses
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

// 回溯算法
function generateBracket(n) {
  const res = [];
  // dfs
  const dfs = (lCount, rCount, str) => {
    if (str.length === 2 * n) {
      // 构建完成的成对括号 肯定是 2n
      res.push(str);
      return;
    }
    // 有左括号 就可以选择
    if (lCount > 0) {
      dfs(lCount - 1, rCount, str + "(");
    }
    // 左括号少于右括号了 开始选择右括号
    if (lCount < rCount) {
      dfs(lCount, rCount - 1, str + ")");
    }
  };

  dfs(n, n, ""); // 入口, 空串开始

  return res;
}

console.log(generateBracket(2));
console.log(generateBracket(3));
