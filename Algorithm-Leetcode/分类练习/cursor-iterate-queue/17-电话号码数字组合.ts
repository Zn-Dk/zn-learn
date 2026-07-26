// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

// 示例 1：

// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 示例 2：

// 输入：digits = "2"
// 输出：["a","b","c"]

const digitMap = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};

// 迭代解法 BFS  O(3^n × 4^m)（n 为对应 3 字母的数字个数，m 为对应 4 字母的数字个数
function letterCombinations(digits: string): string[] {
  if (!digits) return []
  let combo: string[] = [];
  const rest = digits.split('');

  while (rest.length > 0) {
    const cur = rest.shift()!;
    const letters = digitMap[cur];
    if (combo.length === 0) {
      combo.push(...letters);
    } else {
      const newCombo: string[] = [];
      for (const item of combo) {
        for (const letter of letters) {
          newCombo.push(item + letter);
        }
      }
      combo = newCombo;
    }
  }
  return combo;
}

// 队列BFs
function letterCombinations2(digits: string): string[] {
  if (!digits) return []
  const queue = [''] // 预设一个占位, 保证可以循环

  for (const d of digits) {
    const len = queue.length // 固定队列的长度, 因为要动态push
    for (let i = 0; i < len; i++) {
      // 每次将队列已有项取出(队列顺序)
      const head = queue.shift()!
      for (const char of digitMap[d]) {
        queue.push(head + char)
      }
    }
  }

  return queue;
}

// 👍 回溯DFS
function letterCombinationsBT(digits: string): string[] {
  if (!digits) return []
  const res: string[] = []

  const backtrack = (index: number, path: string) => {
    if (index === digits.length) { // 回溯终止
      res.push(path)
      return
    }

    // 类似树的发散收集, 每次带上之前的路径+当前字符
    // 递归地选取每个数字对应的字母，到达末尾时收集结果
    for (const char of digitMap[digits[index]]) {
      backtrack(index + 1, path + char)
    }
  }

  backtrack(0, '')
  return res;
}

console.log("🚀 ~ letterCombinations('23'):", letterCombinations2('23'));
console.log("🚀 ~ letterCombinations('23'):", letterCombinationsBT('23'));
