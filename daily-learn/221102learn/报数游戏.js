/*
    【报数游戏】100个人围成一圈，每个人有一个编码，编号从1开始到100。他们从1开始依次报数，报到为M的人自动退出圈圈，
  然后下一个人接着从1开始报数，直到剩余的人数小于M。请问最后剩余的人在原先的编号为多少？
  输入描述：输入一个整数参数M
  输出描述：如果输入参数M小于等于1或者大于等于100，输出“ERROR!”；否则按照原先的编号从小到大的顺序，以英文逗号分割输出编号字符串
  示例1：
  输入
  输出
  3
  58,91

*/

function countGame(n, M) {
  if (M <= 1 || M >= 100) return "ERROR";
  // 初始化编码
  let arr = Array.from(new Array(n), (_, k) => k + 1);
  // let tmp = arr; // 临时数组
  let i = 1;
  while (i <= n) {
    let res = []; // 结果数组
    if (arr[i] !== M) {
      res.push(arr[i]);
      i++;
    }
    i = 1;
    if (res.length < M) {
      console.log(res);
      return;
    }
  }
}

countGame(100, 3);
