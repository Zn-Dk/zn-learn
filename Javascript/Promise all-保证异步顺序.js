// 使用 Promise.all 确保异步顺序为固定状态
let promiseList = [];

for (let i = 0; i < 5; i++) {
  promiseList.push(
    new Promise((resolve) => {
      // 这里的等待时长是随机的
      let wait = Math.random() * 3000;
      setTimeout(() => {
        resolve({ i, wait });
      }, wait);
    })
  );
}

// then 形式
Promise.all(promiseList).then((resolveList) =>
  resolveList.forEach((r) => {
    console.log(r);
  })
);

// async await 形式
async function logPromises() {
  const resolveList = await Promise.all(promiseList);
  resolveList.forEach((r) => {
    console.log(r);
  });
}

logPromises();
/*
  { i: 0, wait: 2664.219314522852 }
  { i: 1, wait: 525.215121826671 }
  { i: 2, wait: 1106.920327042562 }
  { i: 3, wait: 2259.102951341934 }
  { i: 4, wait: 2136.0755538890317 }
*/
