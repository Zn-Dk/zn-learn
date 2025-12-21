import Redis from "ioredis";
import express from "express";
import fs from 'fs';
import path from "path";

const app = express();
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  password: "RedisPassword123!",
});
const scriptPath = path.resolve(__dirname, './throttle.lua');
const lua = fs.readFileSync(scriptPath);

app.use(express.static('.'))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
})

app.get('/api/lottery', (req, res) => {
  redis.eval(
    lua, // lua脚本
    1, // key的数量
    'lottery', // key
    5, // interval
    2, // max per interval
    (err, result) => {
      if (err) {
        console.log('err->', err);
        res.status(500).send(err);
        return
      }

      // result 是数组: [status, count, remaining, ttl]
      // status: 0=允许, 1=限流
      // ttl: 剩余冷却时间（秒）
      const [status, count, remaining, ttl] = result;
      // console.log({ status, count, remaining, ttl }, 'result');

      if (status === 1) {
        res.status(429).send({
          code: 429,
          message: '网络繁忙，请稍后重试',
          count,
          remaining,
          ttl, // 冷却倒计时（秒）
        });
      } else {
        res.status(200).send({
          code: 200,
          message: '请求成功',
          count,
          remaining,
          ttl,
        });
      }
    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});