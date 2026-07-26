const fs = require("fs");


setTimeout(() => { console.log("setTimeout"); }, 0);

setImmediate(() => { console.log("setImmediate"); });

Promise.resolve().then(() => { console.log('Resolve Promise'); })

process.nextTick(() => { console.log("processNextTick"); })

fs.readFile("./test.txt", () => {
  console.log("I/O callback");

  setTimeout(() => { console.log("setTimeout inside I/O"); }, 0);

  setImmediate(() => { console.log("setImmediate inside I/O"); });
});

console.log("Synchronous log");











/*

Start
Synchronous log
processNextTick (优先级最高)
Resolve Promise
setTimeout (timers)
I/O callback
setImmediate
setImmediate inside I/O  在 I/O 回调内部，setImmediate 总是优先于 setTimeout
setTimeout inside I/O 下次timer

*/