/*
  括号匹配的字符串：

  ads[dsad{dsad(dsads)dsadsa}dsad]

  括号不匹配的字符串：

  asda(ds[dshd]ds(dsad])


  使用数组模拟栈 进行匹配

  如果匹配正确,返回 -1
  如果匹配错误,返回 出现错误的索引值

  如果是单纯的判断,也可以改成 布尔值.
*/

function bracketMatch(str) {
  if (!str?.trim()) return false;

  const stack = []; // 借助数组模拟栈
  const MATCHES = {
    "]": "[",
    "}": "{",
    ")": "(",
  };
  const leftBracket = "{[("; // 左括号
  let isError = -1;

  for (let i = 0, len = str.length; i < len; i++) {
    const s = str[i];
    if (leftBracket.includes(s)) {
      // 如果出现左括号，压栈
      stack.push(s);
    } else if (MATCHES[s]) {
      // 如果出现右括号，需要判断栈顶元素与之是否匹配，是否需要出栈
      // 如果栈空/符号匹配 跳过 | 如果栈非空 MATCHES 查找是否不等于栈顶元素
      if (!stack.length || MATCHES[s] != stack.pop()) {
        // 不匹配 存储序号 终止循环
        isError = i;
        break;
      }
    }
  }

  return isError > -1 ? isError : stack.length - 1;
}

// 简单版 返回布尔值
function bracketMatchBol(str) {
  if (!str?.trim()) return false;

  const stack = []; // 借助数组模拟栈
  const MATCHES = {
    "]": "[",
    "}": "{",
    ")": "(",
  };
  const leftBracket = "{[("; // 左括号

  for (let i = 0, len = str.length; i < len; i++) {
    const s = str[i];
    if (leftBracket.includes(s)) {
      stack.push(s);
    } else if (MATCHES[s]) {
      if (!stack.length || MATCHES[s] != stack.pop()) {
        return false;
      }
    }
  }

  return true;
}

// 测试
console.log(bracketMatchBol("a{dsa}(sas)[dsa]")); // true
console.log(bracketMatchBol("a{dsa}(sas[)dsa]")); // false
console.log(bracketMatchBol("([}}])")); // false
console.log(bracketMatchBol("a{dsa}(sas)[dsa]]]")); // false

function foo(arr, n) {
  let len = arr.length;
  n = n > len ? len : n;
  let slice = arr.splice(len - n);
  return slice.concat(arr);
}

console.log(foo([1, 2, 3, 4, 5], 3));
