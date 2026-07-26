/*
给你一个字符串 s ，请你反转字符串中 单词 的顺序。

单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。

注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。



示例 1：

输入：s = "the sky is blue"
输出："blue is sky the"
示例 2：

输入：s = "  hello world  "
输出："world hello"
解释：反转后的字符串中不能存在前导空格和尾随空格。
示例 3：

输入：s = "a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。


提示：

1 <= s.length <= 104
s 包含英文大小写字母、数字和空格 ' '
s 中 至少存在一个 单词


进阶：如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 O(1) 额外空间复杂度的 原地 解法。

*/

// function reverseWords(s: string): string {
//   let words = s.trim().split(/\s+/)
//   let rev = '' + words.pop()
//   while (words.length) {
//     rev += ' ' + words.pop()
//   }
//   return rev
// }

function reverseWords(s: string): string {
  // 双指针 start 快, end 慢
  let end = s.length - 1
  let start = end
  let rev = ''

  while (end >= 0) {
    // 先跳过尾部空格
    while (s[end] === ' ') end--
    if (end < 0) break

    start = end
    // 遇到第一个空格之前, 快指针移动
    while (start >= 0 && s[start] !== ' ') start--
    // 第一次遇到空格时执行，故往 start 后一位开始截取就是单词开头
    // slice 需包含最后一个单词字符， 所以是 end+1
    const word = s.slice(start + 1, end + 1)
    rev += rev ? ' ' + word : word

    // 慢指针同步快指针
    end = start
  }

  return rev
}

console.log(reverseWords('the sky is blue'))
console.log(reverseWords('  hello world  '))
console.log(reverseWords('a good   example'))
console.log(reverseWords(' asdasd df f'))
