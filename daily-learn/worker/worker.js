// onmessage = (e) => {
//   // console.log(e); // e.data 接受信息
//   const arr = e.data;
//   if (Array.isArray(arr)) {
//     postMessage(arr.sort((a, b) => a - b));
//   }
// };

// SharedWorker
onconnect = function (e) {
  console.log(e);
  const port = e.ports[0];

  port.onmessage = function (e) {
    const arr = e.data;
    if (Array.isArray(arr)) {
      postMessage(arr.sort((a, b) => a - b));
    }
  };
};
