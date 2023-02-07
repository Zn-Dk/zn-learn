// Promise all
// every promises must succeed
const p1 = new Promise((res, rej) => {
  if (Math.random() > 0.3) {
    res("p1 success");
  } else {
    rej("p1 failed");
  }
});

const p2 = new Promise((res, rej) => {
  if (Math.random() > 0.3) {
    res("p2 success");
  } else {
    rej("p2 failed");
  }
});

let all = Promise.all([p1, p2]);
all.then((res) => console.log(res)).catch((err) => console.log(err));
// 成功的情况 打印数组  [ 'p1 success', 'p2 success' ]

// Promise race
// Return the fastest one
const p3 = new Promise((res, rej) => {
  setTimeout(() => res("p3 success"), 1000);
});
const p4 = new Promise((res, rej) => {
  setTimeout(() => res("p4 success"), 500);
});

let race = Promise.race([p3, p4]);
race.then((res) => console.log(res));
// p4 success

// Promise any
// Once succeed, all succeed
const p5 = new Promise((res, rej) => {
  setTimeout(() => res("p5 success"), 1100);
});
const p6 = new Promise((res, rej) => {
  setTimeout(() => rej("p6 failed"), 900);
});
const p7 = new Promise((res, rej) => {
  setTimeout(() => rej("p7 success"), 1300);
});

let any = Promise.any([p5, p6, p7]);
any.then((res) => console.log(res));
// p5 success 返回最先成功的那个

// Rejections with AggregateError
// 如果没有 promise 被兑现，那么 Promise.any() 所返回的 promise 就会切换至被拒状态，并以 AggregateError 实例来作为拒因。

const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

Promise.any([pErr]).catch((err) => {
  console.log(err);
});
// 期望输出："AggregateError: All promises were rejected"
