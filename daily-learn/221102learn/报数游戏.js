/*
    【报数游戏】100个人围成一圈，每个人有一个编码，编号从1开始到100。他们从1开始依次报数，报到为M的人自动退出圈圈，
  然后下一个人接着从1开始报数，直到剩余的人数小于M。请问最后剩余的人在原先的编号为多少？
  输入描述：输入一个整数参数M
  输出描述：如果输入参数M小于等于1或者大于等于100，输出“ERROR!”；否则按照原先的编号从小到大的顺序，以英文逗号分割输出编号字符串
  示例1：
  输入
  3
  输出
  58,91

*/

function countGame(n, M) {
  if (M <= 1 || M >= 100) return "ERROR";
  // 初始化编码
  let arr = Array.from(new Array(n), (_, k) => k + 1);
  let index = 0;
  let i = 1;
  while (arr.length > 2) {
    if (i !== M) {
      // 如果没有到编号 双指针同时移动
      index++;
      i++;
    } else {
      i = 1; // 重置 并移除 index 元素
      arr.splice(index, 1);
    }
    if (index === arr.length) {
      index = 0;
    }
  }
  console.log(arr);
}

countGame(100, 3);
