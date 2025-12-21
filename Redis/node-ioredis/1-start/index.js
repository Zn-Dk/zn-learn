import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  password: "RedisPassword123!",
});

redis.set("key", "value");
// 获取操作 均为异步
redis.get("key").then((r) => console.log("redis get key:", r));

redis.keys("*").then((r) => console.log("redis keys *:", r));

(async () => {
  await redis.del("users");
  await redis.sadd("users", "newUser", "newUser", "newUser2");
  const users2 = await redis.smembers("users");
  console.log("redis get users:", users2);
})();
