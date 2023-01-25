function Rng(start, end) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          if (start < end) {
            return { value: start++, done: false };
          }
          return { value: end, done: true };
        },
      };
    },
  };
}

for (const n of Rng(0, 5)) {
  console.log(n); // 0 1 2 3 4
}

// 生成器函数也是一种迭代器
function* gen(start, end) {
  while (start < end) {
    yield "Number: " + start++;
  }
}
let g = gen(1, 5);

console.log(g.next().value);
console.log(g.next().value);
console.log(g.next().value);
console.log(g.next().value);
