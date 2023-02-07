/*
  假如我们有这样一串数字：43243232.3232143，我们需要把它格式化为43,243,232.3232143
*/

let num = 43243232.3232143;

// 1 最简单的原生自带方法 toLocaleString 返回这个数字在特定语言环境下的表示字符串。
let res1 = num.toLocaleString();
console.log(res1);

// 2 正则 比较麻烦
// let reg = /(?!\.)()(?\d{3})/
// let res2

const num2 = 2333333;
num2.toLocaleString("zh", { style: "decimal" }); // 2,333,333 默认 十进制
num2.toLocaleString("zh", { style: "percent" }); // 233,333,300%
num2.toLocaleString("zh", { style: "currency" }); // 报错
num2.toLocaleString('zh', { style: 'currency', currency: 'CNY' });    //￥2,333,333.00
num2.toLocaleString('zh', { style: 'currency', currency: 'cny', currencyDisplay: 'code' });      //CNY2,333,333.00
num2.toLocaleString('zh', { style: 'currency', currency: 'cny', currencyDisplay: 'name' });      //2,333,333.00人民币
