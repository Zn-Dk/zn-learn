module.exports = {
  // 回文数
  // 0-9 true
  // < 0 false
  // toString然后比较
  isPalindrome(n) {
    if (n < 0) return false;
    if (n < 10) return true;
    let str = n.toString();
    return [...str].reverse().join("") === str;
  },
  compareNum(a, b) {
    if (Number(a) && Number(b)) {
      return !(a - b);
    }
  },
  // 更高效的方式
  isPalindrome2(x) {
    if (x < 0 || (x !== 0 && x % 10 === 0)) {
      return false;
    } else if (0 <= x && x < 10) {
      return true;
    }
    x = "" + x;
    for (let i = 0; i < Math.floor(x.length / 2); i++) {
      // 正序倒序同时比较
      if (x[i] !== x[x.length - i - 1]) {
        return false;
      }
    }
    return true;
  },
};
