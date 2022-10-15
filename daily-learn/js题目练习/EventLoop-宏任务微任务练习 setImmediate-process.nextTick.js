//setImmediate -- node 独有宏任务 类似timeout 但是不能设定延时
//process.nextTick -- node 独有微任务
//如果 process.nextTick 与 promise 同时存在 会优先执行

setTimeout(() => {
  console.log(1)

  Promise.resolve().then(() => {
    console.log(11)
  })
  process.nextTick(() => {
    console.log(2)
  })
})

console.log(3)

new Promise((resolve) => {
  console.log(4)
  resolve(5)
}).then((n) => {
  console.log(n)
})


Promise.resolve().then(() => {
  console.log(6)
  setTimeout(() => {
    console.log(7)
  })
})

setImmediate(() => {
  console.log(8)
  process.nextTick(() => {
    console.log(9)
  })
})

console.log(10)











//3 4 10 5 6 1 2 11 8 9 7