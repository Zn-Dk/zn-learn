// 3. cluster 是多线程吗？
/**
 *  Node 中提供了 cluster 模块，cluster 实现了对 child_process 的封装，
 *  通过 fork 方法创建子进程的方式实现了多进程模型。比如我们最常用到的 pm2 就是其中最优秀的代表。
 *  See demo
 */

const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length; // 列举本机 CPU 可用核数

if (cluster.isMaster) {
  console.log(`主线程${process.pid}正在运行`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // 利用全部的 CPU 建立 cluster 集群
  }

  cluster.on("fork", (worker) => {
    console.log(`工作进程${worker.process.pid}已创建`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`工作进程${worker.process.pid}已退出`);
    cluster.fork(); // 意外退出重启
  });
} else {
  // 工作进程可以共享任何 TCP 协议的连接
  // 比如 下面我们建立 http 服务器

  http
    .createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain;charset=utf-8");
      const route = (url) => {
        return `你访问了 ${url}, 工作进程 ${process.pid} 为您提供了服务`;
        // 当大量用户同时访问的时候 就会分配服务器
        // 为了看清效果 可以只建立两个子线程 然后同时 5 个用户访问 *
      };
      setTimeout(() => {
        res.end(route(req.url));
      }, 1000);
    })
    .listen(3333, () => {
      console.log(`工作进程 ${process.pid} 的 http 服务器已启动`);
    });
}

/*
  Print :

  主线程12592正在运行
  工作进程13884已创建
  工作进程23676已创建
  工作进程25364已创建
  工作进程9556已创建
  工作进程26436已创建
  工作进程25180已创建
  工作进程25816已创建
  工作进程27192已创建
  工作进程 13884 的 http 服务器已启动
  工作进程 23676 的 http 服务器已启动
  工作进程 9556 的 http 服务器已启动
  工作进程 25364 的 http 服务器已启动
  工作进程 26436 的 http 服务器已启动
  工作进程 25180 的 http 服务器已启动
  工作进程 25816 的 http 服务器已启动
  工作进程 27192 的 http 服务器已启动

  在任务管理器中, 我们也能看到多个运行的 node.exe

  所以无论 child_process 还是 cluster，都不是多线程模型，而是多进程模型。
  虽然开发者意识到了单线程模型的问题，但是没有从根本上解决问题，而且提供了一个多进程的方式来模拟多线程。
  从前面的实验可以看出，虽然 Node （V8）本身是具有多线程的能力的，但是开发者并不能很好的利用这个能力，更多的是由 Node 底层提供的一些方式来使用多线程。
*/
