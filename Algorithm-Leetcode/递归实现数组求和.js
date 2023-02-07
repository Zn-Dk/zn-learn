// 通过递归实现数组求和
function sum(...args) {
  function add(n) {
    // 递归 如果 n 小于 数组长度就一直递归 并累加当前下标 args[n]
    return n >= args.length ? 0 : add(n + 1) + args[n];
  }
  // 返回结果
  return add(0);
}

let res = sum(1, 2, 3, 4, 5, 6);

console.log(res); // 21
