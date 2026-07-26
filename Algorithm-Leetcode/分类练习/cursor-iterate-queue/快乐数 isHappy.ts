/** 
 * 编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」 定义为：

对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果这个过程 结果为 1，那么这个数就是快乐数。
如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
 */
function isHappy(n: number): boolean {
  if (n === 1) return true;
  const getNext = (n: number) => n
    .toString()
    .split('')
    .map(Number)
    .reduce((acc, cur, idx) => acc + cur ** 2, 0)

  let cur = getNext(n)
  const seen = new Set() // 检测循环
  seen.add(cur)
  while (cur !== 1 && !seen.has(cur)) {
    seen.add(cur)
    cur = getNext(cur)
  }
  return cur === 1;
};

console.log("🚀 ~ isHappy(51):", isHappy(51));
