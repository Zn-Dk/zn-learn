/**
 * @param {string} str
 * @return {string[][]}
 */
var partition = function (s) {
  let len = s.length;
  let res = [],
    path = [];

  backTrack(0);
  return res;
  //从头到尾依次切割
  function backTrack(i) {
    // 尾部终止
    if (i >= len) {
      res.push([...path]);
      return;
    }
    for (let j = i; j < len; j++) {
      if (!isPalindrome(s, i, j)) {
        continue;
      }
      // 每次截取一个字符
      path.push(s.substr(i, j - i + 1));
      console.log(path);
      //回溯
      backTrack(j + 1);
      path.pop();
    }
  }
};

function isPalindrome(str, start, end) {
  for (let i = start, j = end; i < j; i++, j--) {
    if (str[i] !== str[j]) {
      return false;
    }
  }
  return true;
}

let r = partition("aab");
console.log(r);
