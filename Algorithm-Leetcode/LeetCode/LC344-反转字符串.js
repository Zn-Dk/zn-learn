/*
    343. 整数拆分
    ‌题目要求：‌ 给定一个字符数组 s，将其元素顺序反转，
    例如输入 ["h","e","l","l","o"]
    应输出 ["o","l","l","e","h"]。
    约束条件包括数组长度至少为 1，且所有字符均为ASCII 可打印字符。‌

    题目描述
    编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
    必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

*/

// O (1) 原地修改, 则使用双指针法出发

const reverseStr = (str) => {
  let left = 0;
  let right = str.length - 1;
  let s = str

  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]]
    left++
    right--;
  }

  return s;
}

console.log(reverseStr('hello world'.split('')));
console.log(reverseStr('abcdedfghi'.split('')));

// 如果传入的是 string, js中字符串是不可变的,
// 则需要内部函数先 split('') 再join
// 或者临时一个变量

const reverseStr2 = (str) => {
  let res = '';
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i]
  }
  return res;
}
console.log(reverseStr2('hello world'));
console.log(reverseStr2('abcdedfghi'));
