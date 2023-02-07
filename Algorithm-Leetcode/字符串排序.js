/*
  编写函数，计算输入中单词的出现次数。
  Ⅰ按次数降序输出，
  Ⅱ相同次数的按字母顺序升序排序。
  New to Python or choosing between Python 2 and Python 3? Read Python 2 or Python 3
  正确结果为：
  Python : 5
  2 : 2
  or : 2
  3 : 1
  3? : 1
  New : 1
  Read : 1
  and : 1
  between : 1
  choosing : 1
  to : 1


*/

let s =
  "New to Python or choosing between Python 2 and Python 3? Read Python 2 or Python 3";

function stat(s) {
  s = s.split(" ");
  let res = s.reduce((acc, cur) => {
    if (acc[cur]) {
      acc[cur]++;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});
  return Object.entries(res).sort((a, b) => {
    // 次数降序
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    // 相同
    if (a[0] > b[0]) {
      return 1;
    } else {
      return -1;
    }
  });
}

let r = stat("3 no ne");
console.log(r);
r = stat(s);
console.log(r);
