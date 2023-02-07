const express = require("express");
const { readFileSync, fstat, statSync } = require("fs");
const path = require("path");
const app = express();

// 虚拟 etag
let etag = "ecbuwed2b3k4";

// 自带 static 中间件的配置
// 注意 maxAge 如果直接写数字 单位是 ms
// 可以使用字符串进行配置
const options = {
  maxAge: "3d", // 3天后过期
  etag: false,
  setHeaders(res, path, stat) {
    res.set("x-timestamp", Date.now());
    // 也可自定义 覆盖 cache-control
    //res.set("cache-control", "public;maxAge=10;must-revalidate");
  },
};
app.use(express.static(path.join(__dirname, "public"), options));

app.get("/test", (req, res, next) => {
  // 读取图片 modified 时间信息
  const fileStat = statSync(path.join(__dirname, "public/1.jpg"));
  let date = new Date(fileStat.mtime).toUTCString();

  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "PUT,GET,POST,OPTIONS");

  // 关键性的 control
  res.setHeader("Cache-control", "private,maxAge=10");
  // etag 或 last-modified 发给客户端 下一次客户端就会按响应头提供的信息请求对应header
  // etag -> if-none-match  |  last-modified -> If-Modified-Since
  res.setHeader("ETag", etag);
  res.setHeader("Last-Modified", date);

  // 服务端接收客户端的请求校验一下
  // 优先校验 if-none-match 然后是 if-modified-since
  const { "if-none-match": nMatch, "if-modified-since": modify } = req.headers;

  console.log(nMatch === etag, "etag checked");
  console.log(modify === date, "modify checked");

  // 如果 modified 和 etag 都通过了校验 则发送 304
  if (nMatch === etag && modify === date) {
    res.statusMessage = "Not Modified";
    res.sendStatus(304);
  } else {
    res.sendFile(path.join(__dirname, "public/1.jpg"));
  }
});

app.listen(3000);
