class MyPromise {
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";

  // 接收函数
  constructor(executor) {
    // 默认状态
    this.status = MyPromise.PENDING;
    this.result = null; // 成功值
    this.reason = null; // 失败原因

    this.onRejectedCallBacks = [];
    this.onFulfilledCallBacks = [];

    const resolve = (result) => {
      // 状态完成后 可以执行
      if (this.status === MyPromise.PENDING) {
        // 改变状态为 fulfilled
        this.status = MyPromise.FULFILLED;
        // 将执行结果传入 result
        this.result = result;
        // 异步 resolve 执行之前的结果
        this.onFulfilledCallBacks.forEach((func) => func());
      }
    }

    const reject = (err) => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECTED;
        this.reason = err;
        this.onRejectedCallBacks.forEach((func) => func());
      }
    }

    // 执行传入的函数
    try {
      executor(resolve, reject);
    } catch (error) {
      reject("Error: 未传入正确函数");
    }
  }


  // then 方法可以传入两个参数 其中第二个为可选
  then(_onFulfilled, _onRejected) {
    // 判断是否为函数以防止外部报错
    const onFulfilled = typeof _onFulfilled === "function" ? _onFulfilled : (v) => v;
    const onRejected = typeof _onRejected === "function" ? _onRejected : (reason) => { throw reason; };

    // 返回一个新的 Promise 实例实现链式调用
    const _p = new MyPromise((resolve, reject) => {
      // 核心: 微任务API
      // 现代浏览器 -> queueMicrotask
      // Node.js -> process.nextTick 模拟
      // fallback -> setTimeout

      // 封装 fulfilled 的微任务执行逻辑
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.result);
            // 内部处理 promise 的结果
            // 简单实现, 可以调用完 onFulFilled 就停止
            // 但是如果 onFulfilled 返回一个 promise 则需要继续处理
            this.resolvePromise(_p, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 封装 rejected 的微任务执行逻辑
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(_p, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 如果执行到 then 的时候还是 pending 状态则代表 resolve可能处于异步的状态
      // 需要将传入的函数放入内部 callback列表 (用包装好的微任务函数)
      // 这个函数列表等到 resolve 执行的时候 forEach 调用
      if (this.status === MyPromise.PENDING) {
        this.onFulfilledCallBacks.push(fulfilledMicrotask);
        this.onRejectedCallBacks.push(rejectedMicrotask);
      }
      if (this.status === MyPromise.FULFILLED) {
        fulfilledMicrotask();
      }
      if (this.status === MyPromise.REJECTED) {
        rejectedMicrotask();
      }

    });

    return _p;
  }

  resolvePromise(p, x, resolve, reject) {
    if (p === x) { // 循环引用
      return reject(new TypeError("Chaining cycle detected for promise"));
    }

    if (x instanceof MyPromise) {
      // 如果 x 是一个 Promise，等待它解决
      x.then(resolve, reject);
      return;
    }

    // TODO x是对象 ->
    // 函数(thenable)
    // 这是一个"类 Promise"对象（thenable），原生 Promise 会像处理真正的 Promise 一样处理它。
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      let fnCalled = false;
      try {
        const then = x.then;
        if (typeof then === "function") {
          // TODO
          then.call(x, res => { }, rej => { })
        } else { // object
          resolve(x);
        }
      } catch (error) {
        reject(error);
        fnCalled = true;
      }

      return;
    }

    // 普通值直接 resolve
    resolve(x);
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) => MyPromise.resolve(callback()).then(() => { throw reason; })
    );
  }

  // 实现静态 resolve 方法
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }

  // 实现静态 reject 方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
}

console.log(1);
let p = new MyPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    console.log(4);
    if (Math.random() > 0.4) {
      resolve(3);
    } else {
      reject("出错啦");
    }
  }, 500);
});

let p1 = p
  .then(res => {
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(res + 10);
      }, 500);
    });
  })
  .then(
    (res) => {
      console.log("Promise 状态:" + p.status);
      console.log(res);
    },
    (rej) => {
      console.log("Promise 状态:" + p.status);
      console.log(rej);
    }
  );

//链式调用测试