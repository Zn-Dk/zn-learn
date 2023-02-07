const btn = document.querySelector("button");
const source = document.querySelector("#source");
const result = document.querySelector("#result");
const arr = [5, 7, 4, 2, 1, 6];

source.textContent = arr;

// 指派 Worker
//const wk = new Worker("worker.js");
// 共享 SharedWorker
const wk = new SharedWorker("worker.js");

btn.addEventListener("click", () => {
  // 向 wk 发送消息, 注意数据是深拷贝的
  // wk.postMessage(arr);

  // 共享 wk 需要发送对应的端口 这里是 .port
  wk.port.postMessage(arr);
});

// 接收 worker 发送的消息
// wk.onmessage = (e) => {
wk.port.onmessage = (e) => {
  result.textContent = e.data;
};
