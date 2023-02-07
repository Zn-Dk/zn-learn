// 出入栈结构
// function _comma(number) {
//   // 绝对值
//   let abs = Math.abs(number);
//   if (abs < 1000) {
//     return number.toString();
//   }
//   // 保存符号
//   let sign = number < 0 ? "-" : "";
//   // 模拟栈 首先将数字填入
//   let arr = [abs];
//   // 如果现在的 abs 大于1000 第一位出栈
//   while (abs > 1000) {
//     abs = arr.shift();
//     // 首先记录余数 然后除以 1000
//     r = String(abs % 1000).padStart(3, "0"); //padStart 保证 '000'
//     abs = Math.floor(abs / 1000);
//     // 压入堆栈
//     arr.unshift(abs, r);
//   }
//   return sign + arr.join(",");
// }

let res1 = _comma(12345);
let res2 = _comma(1234567);
let res3 = _comma(-123);
let res4 = _comma(-1234567);
let res5 = _comma(10000000000);

console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);
console.log(res5);

// 递归法
// 比如 1234567
// floor/1000 是前半部分 1234  <==> mod 则是后半 567
// (注意 mod 结果需要补 0 到 3位) 所以使用 padStart
// 扔入递归函数中
function _comma(number) {
  // 绝对值
  let abs = Math.abs(number);
  if (abs < 1000) {
    return number.toString();
  }
  // -符号
  let sign = number < 0 ? "-" : "";

  //递归
  const recur = (n) => {
    return (
      recur(Math.floor(n / 1000)) +
      "," +
      (recur(n % 1000) == 0 ? "000" : recur(n % 1000))
    );
  };
  recur(abs);
  return recur;
}

// 正则法 n 2n 3n 对应三种情况
// 长度
// 如果是 3n+1的倍数 4 7... => /(?<=\d{1})(\d{3})/g
// 如果是 3n+2的倍数 5 8... => /(?<=\d{2})(\d{3})/g
// 如果是 3n+3的倍数 6 9... => /(?<=\d{3})(\d{3})/g
// function _comma(number) {
//   if (number < 1000) {
//     return number.toString();
//   }
//   // -符号
//   let sign = number < 0 ? "-" : "";
//   // 绝对值
//   let abs = Math.abs(number);
//   // 数字长度
//   let len = ~~Math.log10(abs) + 1;

//   let reg;
//   switch (len % 3) {
//     case 1:
//       reg = /(?<=\d{1})(\d{3})/g;
//     case 2:
//       reg = /(?<=\d{2})(\d{3})/g;
//     case 3:
//       reg = /(?<=\d{3})(\d{3})/g;
//   }

//   String(number).match(reg)

// }
