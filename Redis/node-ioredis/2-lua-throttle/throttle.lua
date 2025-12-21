-- ** 注意 **: 这个文件是redis的lua脚本,
-- Redis 7.0+ 引入了 脚本只读保护，禁止 Lua 脚本中声明或修改全局变量。
-- 因此，这里不能使用全局变量, 必须使用局部变量 local

-- KEYS 代表redis key
local key = KEYS[1]
-- ARGV 参数
-- interval 间隔时间
-- limit 限制次数
-- interval 30 limit 5 意味着30秒内最多5次
local interval = tonumber(ARGV[1] or 0)
local limit = tonumber(ARGV[2] or 0)

-- Redis Lua 只支持数字索引数组，不支持关联数组
-- 返回格式: { status, count, remaining, ttl }
-- status: 0=允许, 1=限流
-- ttl: 剩余冷却时间（秒）
if interval == 0 or limit == 0 then
  return { 1, 0, 0, 0 }
end

local count = tonumber(redis.call('get', key))
if count == nil then
  count = 0
end

-- 获取 key 的剩余过期时间（TTL）
local ttl = redis.call('TTL', key)
if ttl == -2 then
  -- key 不存在
  ttl = 0
elseif ttl == -1 then
  -- key 存在但没有设置过期时间
  ttl = interval
end

-- count >= limit 意味着限流
if count >= limit then
  -- { status, count, remaining, ttl }
  return { 1, count, 0, ttl }
else
  redis.call('SET', key, count + 1, 'EX', interval)
  -- 设置后重新获取 TTL
  ttl = redis.call('TTL', key)
  -- { status, count, remaining, ttl }
  return { 0, count + 1, limit - count - 1, ttl }
end
