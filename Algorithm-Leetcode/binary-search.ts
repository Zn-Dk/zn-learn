// 二分查找 适用有序数组

import { it } from "node:test";

const binarySearch = (arr: number[], val: number) => {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === val) return mid;
    if (arr[mid]! < val) {
      left = mid + 1;
    } else {
      right = mid + 1;
    }
  }

  return -1;
}

console.log(binarySearch([2,3,4,5,16,17,18,19], 5))

// 延伸问题 寻找满足条件的最小值（不需要数组有序
// 有一批货物需要运输，每件货物有固定重量
// 货物必须按顺序装载（不能打乱顺序）
// 现有不同型号的货船, 容量越大费用越高
// 必须在 x 天内运完所有货物
// 目标：找到能在规定天数内完成运输的最小船只容量（最节省成本）

const findMinimumCapacity = (goodWeights: number[], days: number) => {
  // 指定容量是否可以装载完
  const canShip = (capacity: number) => {
    let daysNeeded = 1;
    let curLoaded = 0;
    for (const item of goodWeights) {
      if (item > capacity) return false;

      if (curLoaded + item > capacity) {
        daysNeeded += 1; // 需要多一天
        curLoaded = item;
      } else {
        curLoaded += item;
      }
    }

    return daysNeeded <= days;
  }

  // 这个范围将货物重量 -> 船只容量
  // 二分查找最小容量
  let left = Math.max(...goodWeights); // 最小的船容量为最大货物重量
  let right = goodWeights.reduce((a, b) => a + b, 0); // 最大为所有货物重量之和

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canShip(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// 测试用例
console.log('=== 船运货物问题测试 ===');
console.log(findMinimumCapacity([1,2,3,4,5,6,7,8,9,10], 5)); // 应输出 15
console.log(findMinimumCapacity([3,2,2,4,1,4], 3)); // 应输出 6
console.log(findMinimumCapacity([1,2,3,1,1], 4)); // 应输出 3


// ==================== 变体问题

/**
  有 n 根木头，第 i 根长度为 lengths[i]
  需要切割出 k 根相同长度的木棍
  求：能切出的最大长度是多少？
 */
// 1,2,3,4,5,6 |  k = 4
const maxSplitLen = (items: number[], k: number) => {
  if (k <= 0) return -1;
  const canCut = (len: number) => {
    let total = 0;
    for (const item of items) {
      total += Math.floor(item / len);
      if (total >= k) return true;
    }
    return total >= k;
  }

  let left = 1;
  let right = Math.max(...items);
  let curLen = 0;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canCut(mid)) {
      curLen = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return curLen;
}
console.log('=== 切割木头问题测试 ===');
console.log(maxSplitLen([1,2,3,4,5,6], 4));
