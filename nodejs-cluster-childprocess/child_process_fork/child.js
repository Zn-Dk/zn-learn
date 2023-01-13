const { spawn, exec } = require("child_process");
const { stdout, stderr } = require("process");

// 子进程 pid
const pid = process.pid;

process.on("message", (msg) => {
  console.log(`子线程 ${pid} 收到主进程信息: ${msg}`);
  process.send(`子线程 ${pid} 发送消息1到主进程`);
  setTimeout(() => {
    process.send(`子线程 ${pid} 发送消息2到主进程`);
  }, 500);
});
