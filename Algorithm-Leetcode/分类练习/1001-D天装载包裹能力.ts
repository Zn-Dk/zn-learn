
/**
 *
 * 传送带上的包裹必须在 days 天内从一个港口运送到另一个港口。
  传送带上的第 i 个包裹的重量为 weights[i]。每一天，我们都会按给出重量（weights）的顺序往传送带上装载包裹。我们装载的重量不会超过船的最大运载重量。
  返回能在 days 天内将传送带上的所有包裹送达的船的最低运载能力。

  示例 1：

  输入：weights = [1,2,3,4,5,6,7,8,9,10], days = 5
  输出：15
  解释：
  船舶最低载重 15 就能够在 5 天内送达所有包裹，如下所示：
  第 1 天：1, 2, 3, 4, 5
  第 2 天：6, 7
  第 3 天：8
  第 4 天：9
  第 5 天：10

  请注意，货物必须按照给定的顺序装运，因此使用载重能力为 14 的船舶并将包装分成 (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) 是不允许的。

*/
function shipWithinDays(weights: number[], days: number): number {
  // 方法模拟装载
  const canLoad = (capacity: number, days: number) => {
    let curLoaded = 0; // 当天装了多少
    let goodIdx = 0; // 当前运送的物品idx
    let needDays = 1; // 需要天数, 至少需要1天

    for (let i = 0; i < weights.length; i++) {
      if (curLoaded + weights[i] <= capacity) { // 装得下, 继续这一天的装载
        curLoaded += weights[i];
      } else { // 装不下, 下一天
        needDays++;
        curLoaded = weights[i];
      }
    }
    // canLoad 在days 里面货物是否都能装下
    return needDays <= days;
  };

  // 用二分查找, 找到最小的能装下所有物品的容量
  let left = Math.max(...weights);
  let right = weights.reduce((a, b) => a + b, 0);
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canLoad(mid, days)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return right;
}

shipWithinDays(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  5,
);
console.log('🚀 ~ ', shipWithinDays(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  5,
));
