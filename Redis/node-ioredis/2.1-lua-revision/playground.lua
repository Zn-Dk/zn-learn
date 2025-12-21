-- lua 脚本快速复习

-- 打印
print("hello world")

-- 变量 (默认是全局变量, 不需要声明类型, 可动态变化)
foo = "bar"
foo = 123
foo = true
foo = nil
-- 局部变量 do end 构成一个作用域
do
    local foo = "baz"
    print('inner foo: ',foo)
end
print('global foo: ',foo)

-- table(数组, 注意!! ==> index 从 1 开始)
foo = {"bar", 2, 3}
print(foo[1], foo[2], foo[3])
-- table(对象)
foo = {name = "bar", age = 123, isTrue = true}
-- 可以换行
-- foo = {
--   name = "bar",
--   age = 123,
--   isTrue = true
-- }
print(foo.name, foo.age, foo.isTrue)

-- 函数
function foo()
    print("foo")
end
foo()

function add(a, b)
    return a + b
end
print(add(1, 2))

-- 条件
uname = 'admin'
if uname == 'admin' then
    print('hello admin')
elseif uname == 'user' then
    print('hello user')
end

-- for 循环
for i = 1, 10 do
    print(i)
end
-- for 循环含步进
for i = 1, 10, 2 do
    print(i)
end
-- while
i = 1
while i < 10 do
    print('i: ',i)
    i = i + 1
end

-- table 遍历(pairs 迭代器)
foo = {
  name = "bar",
  age = 123,
  isTrue = true
}
print('obj->')
for k, v in pairs(foo) do
    print(k, v)
end

-- table 数组遍历(ipairs 数组迭代器)
foo = {2,3,4,5}
print('arr->')
for k, v in ipairs(foo) do
    print(k, v)
end

-- 字符串拼接 ..
print('con'..'cat')

-- 模块引用 require
local utils = require('./utils')
print(utils.name)
print(utils.fibo(10))

-- 文件操作
-- io.open(文件, 模式 r/w/a)
local file = io.open('foo.txt', 'w')
-- 语法糖: file:write == file.write(file, 'hello world')
file:write('hello world')
-- print('file: ', file:read('*a')) -- 报错 必须在 r 模式下才能读
file:close()

local file2 = io.open('foo.txt', 'r')
print('file2: ', file2:read('*a'))
file2:close()