// Node 10.5.0 的发布，官方给出了一个实验性质的模块 worker_threads 给 Node 提供真正的多线程能力。

const {
  isMainThread, // isMainThread: 是否是主线程，源码中是通过 threadId === 0 进行判断的。
  parentPort, // parentPort: 在 worker 线程里是表示父进程的 MessagePort 类型的对象，在主线程里为 null
  workerData, // workerData: 用于在主进程中向子进程传递数据（data 副本）
  threadId, // threadId: 线程 ID。
  MessageChannel, // MessageChannel: 用于创建异步、双向通信的通道实例。
  MessagePort, // MessagePort: 用于线程之间的通信，继承自 EventEmitter。
  Worker, // Worker: 用于在主线程中创建子线程。第一个参数为 filename，表示子线程执行的入口。
} = require("worker_threads");

// 判断是否主线程
if (isMainThread) {
  mainThread();
} else {
  workerThread();
}

// 运行本代码, 查看 node.exe 线程数, 刚好是 9(基础) + 5(worker_threads) = 14
function mainThread() {
  console.log("主线程运行");
  for (let i = 0; i < 5; i++) {
    const worker = new Worker(__filename, { workerData: i });
    worker.on("exit", (code) => {
      console.log(`main: worker stopped with exit code ${code}`);
    });
    worker.on("message", (msg) => {
      console.log(`接收主线程发来的消息: receive ${msg}`);
      worker.postMessage(msg + 1);
    });
  }
}

function workerThread() {
  console.log(`worker名称:  ${workerData}`);
  parentPort.on("message", (msg) => {
    console.log(`接收子线程 worker 的消息: receive ${msg}`);
  }),
    parentPort.postMessage(workerData);
}

/*
  主线程运行
  worker名称:  1
  接收主线程发来的消息: receive 1
  worker名称:  3
  接收主线程发来的消息: receive 3
  worker名称:  0
  接收主线程发来的消息: receive 0
  接收子线程 worker 的消息: receive 2
  接收子线程 worker 的消息: receive 4
  接收子线程 worker 的消息: receive 1
  worker名称:  2
  接收主线程发来的消息: receive 2
  接收子线程 worker 的消息: receive 3
  worker名称:  4
  接收主线程发来的消息: receive 4
  接收子线程 worker 的消息: receive 5
*/
