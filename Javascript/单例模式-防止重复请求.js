let count = 1;
let promiseFn = () =>
  new Promise((res) =>
    setTimeout(() => {
      res(count++);
    }, 1000)
  );

// 实现一个 firstPromise 函数 以防止用户重复点击行为导致触发重复请求。
// 传递请求方法（执行后返回promise），返回一个新方法。连续触发时，只执行一次。

// let firstFn = firstPromise(promiseFn);
// firstFn().then(console.log); // 1
// firstFn().then(console.log); // 1
// firstFn().then(console.log); // 1

// SOLUTION
/** @param {Promise<any>} promiseFn */
const firstPromise = (promiseFn) => {
  let instance = null;
  return (...args) => {
    // 单例模式
    // 初次请求时 执行 Promise 并在 finally 中清空函数实例对象
    // 后续多次请求时 如果未完成请求, 则持续返回这个实例Promise 直至请求完成再发送下一个Promise
    return instance
      ? instance
      : (instance = promiseFn
          .apply(this, args)
          .finally(() => (instance = null)));
  };
};

const p = firstPromise(promiseFn);
p().then(console.log); // 1
p().then(console.log); // 1
p().then(console.log); // 1

setTimeout(() => {
  p().then(console.log); // 2
  p().then(console.log); // 2
}, 2000);

// 调用了 5 次 实际请求只发生了两次（因为count只由1变成了2）
