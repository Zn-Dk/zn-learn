// 2. 其他I/O模块对线程的使用?

// 2.1 可以修改这个线程池大小么?
// 手动更改线程池默认大小：
// process.env.UV_THREADPOOL_SIZE = 64;  // 更新 这个方法现在不好使

const fs = require("fs");

setInterval(() => {
  console.log(new Date().getTime());
}, 1000);

fs.readFile("test.html", (err, data) => {
  // fs.open("1.txt", "a", (err, fd) => {
  //   fs.write(fd, data, (err, written) => {
  //     console.log(written);
  //   });
  // });

  fs.writeFile("2.html", data, (err) => err);
});

/**
 * 引入 fs 模块读取/写入操作
 * 发现 node 线程数从 9 -> 13 增加了 4 个
 * 这是因为在 Node 中有一些 IO 操作（DNS，FS）和一些 CPU 密集计算（Zlib，Crypto）会启用 Node 的线程池，而线程池默认大小为 4
 */
