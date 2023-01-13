const cp = require("child_process");
const path = require("path");

// 消息计数器
let msgCount = 0;

// 创建子进程
const child = cp.fork(path.resolve(__dirname, "child"));

// 主进程 pid
const pid = process.pid;

// 主线程发送至子线程
child.send(`你好我是主进程 ${pid} main_process`, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("主线程发送消息");
});

// 接收子进程信息
child.on("message", (msg) => {
  console.log(`收到第 ${++msgCount} 条子进程信息: ${msg}`);
  let currCount = msgCount;
  setTimeout(() => {
    if (currCount === msgCount) {
      console.log("超时 1 秒没有接收到新消息,关闭子线程");
      child.disconnect();
    }
  }, 1000);
});
