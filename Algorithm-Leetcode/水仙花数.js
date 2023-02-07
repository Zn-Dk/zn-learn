// N [3,7]
// M 返回 第 0 下标
// M > 个数 返回最后一个数和 M的成绩

/*
  题目描述：

    所谓的水仙花数是指一个n位的正整数其各位数字的n次方的和等于该数本身
    例如例如153=1^3+5^3+3^3,153是一个三位数,153是一个三位数
  输入描述：

    第一行输入一个整数N，表示N位的正整数N在3-7之间包含3,7
    第二行输入一个正整数M，表示需要返回第M个水仙花数

  输出描述：

    返回长度是N的第M个水仙花数，个数从0开始编号
    若M大于水仙花数的个数返回最后一个水仙花数和M的乘积
    若输入不合法返回-1

  示例

    输入：
      3
      0
    输出：
      153
    说明：
      153是第一个水仙花数

    输入：
      9
      1
    输出
      -1

*/

function getNarcissistic(N, M) {
  N = parseInt(N);
  if (N >= 3 && N <= 7) {
    // 遍历寻找
    let result = [];
    // 从第一位开始 比如3位数 应该从 100 开始...
    for (let i = N * 10; i < Math.pow(10, N); i++) {
      // 如果是用数字的解法可以参考如下:
      // 比如 3 位数 985
      // 985 % 10 =5 个位
      // 985 % 100 = 85 截取1位
      // 985 % 1000 = 985 截取1位

      // 我这里使用字符串 + split 的方法
      let nums = [...String(i)];
      // 使用 reduce 求和
      let sum = nums.reduce((acc, cur) => {
        acc += Math.pow(~~cur, 3);
        return acc;
      }, 0);

      if (sum === i) {
        result.push(i);
      }
    }
    let logNum = result[M] ? result[M] : result.at(-1) * M;
    console.log(logNum);
  }
  return -1;
}

// 三位数有 [ 153, 370, 371, 407 ]
getNarcissistic(3, 0); // log 153
getNarcissistic(3, 10); // log 4070
getNarcissistic(9, 1); // -1
