// 1047. 删除字符串中的所有相邻重复项
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给出由小写字母组成的字符串 s，重复项删除操作会选择两个相邻且相同的字母，并删除它们。

// 在 s 上反复执行重复项删除操作，直到无法继续删除。

// 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

// 示例：

// 输入："abbaca"
// 输出："ca"
// 解释：
// 例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。
// 之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。

// 解题思路, 使用栈做判断

function removeDuplicates(s: string): string {
  const stack: string[] = []
  for (const item of s.split('')) {
    if (stack.at(-1) === item) {
      stack.pop()
      continue // 删掉重复项, 并跳过此项
    }
    stack.push(item)
  }

  return stack.join('')
}

console.log(removeDuplicates('abbaca'))
