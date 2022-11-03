// js 脚本将IP地址转换成整数形式的函数
// JS将IP地址转整数的函数

function ipToint(ip) {
  var num = 0;
  ip = ip.split(".");
  num =
    Number(ip[0]) * 256 * 256 * 256 +
    Number(ip[1]) * 256 * 256 +
    Number(ip[2]) * 256 +
    Number(ip[3]);
  // num = num >>> 0;
  return num;
}

let ip = "192.168.31.197";
console.log(ipToint(ip));
// 打印结果：
// 3232243653

// JS将整数形式转成IP地址段的方法
// js 整数转成IP地址段的函数
// 原理 二进制 -> 8 位

// 举例：一个ip地址为10.0.3.193

// 每段数字	相对应的二进制数
// 10	      00001010
// 0	      00000000
// 3	      00000011
// 193	    11000001
// 组合起来即为：00001010 00000000 00000011 11000001,
// 转换为10进制数就是：167773121，
// 所以
// 第一位 整数 位运算右移 8*3 24位
// 第二位 右移 24 再左移 8
// 以此类推
function intTOiP(num) {
  var str;
  var tt = [];
  tt[0] = (num >>> 24) >>> 0;
  tt[1] = ((num << 8) >>> 24) >>> 0;
  tt[2] = (num << 16) >>> 24;
  tt[3] = (num << 24) >>> 24;
  str =
    String(tt[0]) +
    "." +
    String(tt[1]) +
    "." +
    String(tt[2]) +
    "." +
    String(tt[3]);
  return str;
}

var ints = 3232243653;
console.log(intTOiP(ints));
// 打印结果：

// 192.168.31.197

// 其他方法 利用 toString

function ip2dec(ip) {
  const ipArr = ip.split(".");
  const newIpArr = ipArr.map((item) => {
    // 十进制转为二进制
    let ipPart = Number(item).toString(2);
    // 二进制高位补0
    while (ipPart.length < 8) {
      ipPart = "0" + ipPart;
    }
    return ipPart;
  });
  // 将32位二进制数转为十进制数，并打印
  console.log(parseInt(newIpArr.join(""), 2));
}

function dec2ip(dec) {
  // 十进制数转为二进制数
  let ipBinary = Number(dec).toString(2);
  // 二进制高位补0
  while (ipBinary.length < 32) {
    ipBinary = "0" + ipBinary;
  }
  let ip1 = parseInt(ipBinary.slice(0, 8), 2);
  let ip2 = parseInt(ipBinary.slice(8, 16), 2);
  let ip3 = parseInt(ipBinary.slice(16, 24), 2);
  let ip4 = parseInt(ipBinary.slice(24, 32), 2);
  console.log(`${ip1}.${ip2}.${ip3}.${ip4}`);
}
