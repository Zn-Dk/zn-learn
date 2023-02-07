const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (str) {
  // 最终数组
  let arr = [];
  // 放英文字母
  let tmp = [];
  let reg = /[^a-zA-Z]/;
  for (let i = 0; i < str.length; i++) {
    // 非英文字符先放入最终对应位置
    if (reg.test(str[i])) {
      arr[i] = str[i];
    } else {
      // 在最终数组里做位置标记 并将字母放进 tmp
      arr[i] = -1;
      tmp.push(str[i]);
    }
  }
  // 排序字母数组
  tmp.sort((a, b) => {
    // 统一转成小写 查ASCII 升序
    let la = a.toLowerCase().charCodeAt(0);
    let lb = b.toLowerCase().charCodeAt(0);
    return la - lb;
  });
  // 将排序后的数组 按顺序插入 arr 数组
  for (let i = 0, len = arr.length; i < len; i++) {
    // 模拟堆栈 让tmp依次出栈
    arr[i] === -1 && (arr[i] = tmp.shift());
  }
  console.log(arr.join(""));
});
