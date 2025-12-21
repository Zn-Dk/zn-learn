local fiboCache = {1, 1}
function fibo(n)
  if n <= 1 then
    return n
  end

  if fiboCache[n] then
    return fiboCache[n]
  end
  fiboCache[n] = fibo(n-1) + fibo(n-2)

  return fibo(n-1) + fibo(n-2)
end

-- 定义一个模块(table)
local Module = {
  name = "Module",
  fibo = fibo,
}

-- 直接返回模块即可
return Module