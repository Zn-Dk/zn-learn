// 柯里化返回路径
const getURL = (protocol, host) => {
  return (path) => {
    return `${protocol}//${host}/${path}`;
  };
};

const collect = getURL("http", "www.baidu.com");

const pathList = ["s/wec.html", "d/foo/zz", "lz/vas/wrr", "xw/wvrw/scsa"];

const URLList = pathList.map(collect);

console.log(URLList);

// 柯里化实现

/**
 * @params {Function} fn 函数
 * @params {any} args 可以传入的初始参数
 * @params {any} newArgs 后续传入的初始参数
 */
function curry(fn, ...args) {
  return (...newArgs) => {
    // 缓存当前接受的参数
    let _args = [...args, ...newArgs];
    // 原函数应该接受的参数数
    let len = fn.length;
    // 如果当前传入的参数小于应传入的参数则递归返回原函数继续收集参数
    if (_args.length < len) {
      return curry(fn, ..._args);
    } else {
      // 满足参数条件 执行这个函数
      return fn.apply(null, _args);
    }
  };
}

// 普通函数
function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(1, 2, 3)); // 6



let currySum = curry(sum, 1); // 传入一个初始参数

console.log(currySum(2, 3)); // 6

console.log(currySum(2)(4)); // 7
