let promiseList = [];

for (let i = 0; i < 5; i++) {
  promiseList.push(
    new Promise((resolve) => {
      let wait = Math.random() * 3000;
      setTimeout(
        (wait) => {
          resolve({ i, wait });
        },
        wait,
        wait
      );
    })
  );
}

// then
Promise.all(promiseList).then((resolveList) =>
  resolveList.forEach((r) => {
    console.log(r);
  })
);

// async await
async function logPromises() {
  const resolveList = await Promise.all(promiseList);
  resolveList.forEach((r) => {
    console.log(r);
  });
}

logPromises();
