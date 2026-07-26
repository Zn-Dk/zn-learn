console.log('stack [1]');
setTimeout(() => console.log("macro [2]"), 0);
setTimeout(() => console.log("macro [3]"), 1);

const p = Promise.resolve();

for (let i = 0; i < 3; i++) p.then(() => {
  setTimeout(() => {
    console.log('stack [4]')
    setTimeout(() => console.log("macro [5]"), 0);
    p.then(() => console.log('micro [6]'));
  }, 0);
  console.log("stack [7]");
});

console.log("macro [8]");

// Log:
// sync: [1] [8] [7]*3 [2] [3] ([4] [6] *3) [5]*3
// micro: p6
// marco: m2 mPthen*3  m3,1 


/*
为什么 macro[3] 在 for 循环的 setTimeout 之前？
关键原因：setTimeout 的延迟是从"注册时刻"开始计算的，而不是从"开始执行宏任务队列"时计算。

时间线：

code
T=0ms:  注册 macro[2] (延迟0ms，到期时间 T=0)
T=0ms:  注册 macro[3] (延迟1ms，到期时间 T=1)
...同步代码和微任务执行...
T=Xms: 微任务中注册 for 循环的 3 个 setTimeout (延迟0ms，到期时间 T=X)
当 JavaScript 引擎开始处理宏任务队列时（假设此时已经过了几毫秒），macro[2] 和 macro[3] 都已经到期了（因为 1ms 很快就过去了）。

它们是按照注册顺序（先进先出）排列的：

macro[2] - 先注册
macro[3] - 后注册，但在 for 循环的 setTimeout 之前注册
而 for 循环中的 setTimeout 是在微任务执行时才注册的，
所以虽然它们延迟是 0ms，但注册时间晚，排在队列后面。

简单总结
任务	注册时机	延迟	队列位置
macro[2]	同步阶段	0ms	1
macro[3]	同步阶段	1ms	2
stack[4] ×3	微任务阶段	0ms	3, 4, 5

结论：setTimeout 的执行顺序主要取决于注册时间 + 延迟时间，
而不仅仅是延迟时间。1ms 的延迟在实际执行中几乎可以忽略不计，
所以 macro[3] 排在 for 循环产生的宏任务之前。

但是:**如果这个延迟时间改长一点点, 比如 10ms, [3] 就基本上确认是最后输出的,
这题有点坑

所以面试遇到这种题，要注意：
setTimeout 的最小延迟在浏览器中通常是不确定的, 0-4ms, >4ms(嵌套5层时)
1ms 和 0ms 在实际执行中几乎没区别
关键看注册时机和到期时间的综合比较
*/