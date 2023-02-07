// 描述
// 一个完整的括号字符串定义规则如下:
// 1、空字符串是完整的。
// 2、如果s是完整的字符串，那么(s)也是完整的。
// 3、如果s和t是完整的字符串，将它们连接起来形成的st也是完整的。

// 例如，"(()())", ""和"(())()"是完整的括号字符串，"())(", "()(" 和 ")"是不完整的括号字符串。
// 牛牛有一个括号字符串s,现在需要在其中任意位置尽量少地添加括号,将其转化为一个完整的括号字符串。请问牛牛至少需要添加多少个括号。

// 输入描述：
// 输入包括一行,一个括号序列s,序列长度length(1 ≤ length ≤ 50). s中每个字符都是左括号或者右括号,即'('或者')'.

// 输出描述：
// 输出一个整数,表示最少需要添加的括号数

// 示例1
// 输入：
// (()(()
// 输出：
// 2

// 1.通过模拟栈

function bracketCount(str) {
  let left = 0,
    right = 0; // 存放左右括号数量
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      left++; //左括号数量增加
    } else {
      // 如果左括号数量大于0 就消去一个(配对)
      left > 0 ? left-- : right++;
    }
  }
  // 剩余的需要补充括号
  console.log("缺失的括号数", right + left);
}

bracketCount("(()())"); // 0
bracketCount("(()(()"); // 2

// 2. 通过replace (比较骚的操作)
// 不停替换成套的括号 知道括号补全

function bracketCount2(str) {
  while (/\(\)/.test(str)) {
    str = str.replace("()", "");
  }
  console.log(str.length);
}

bracketCount2("(()())"); // 0
bracketCount2("(()(()"); // 2
bracketCount2(""); // 0
bracketCount2("())("); // 2
bracketCount2("()("); // 1
bracketCount2(")"); // 1
bracketCount2(")("); // 2

// 判断是否有效括号
var isValid = function (s) {
  while (/\(\)/.test(s) || /\{\}/.test(s) || /\[\]/.test(s)) {
    s = s.replace("()", "").replace("{}", "").replace("[]", "");
  }
  return !s.length;
};
