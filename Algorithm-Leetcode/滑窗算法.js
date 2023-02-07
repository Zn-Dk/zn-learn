/**
 * 给定一个整数数组，计算长度为‘k’的连续子数组的最大总和。
 *
 * 是连续子数组 不是任意子数组
 * 如果是任意的 推荐直接排序输出 k
 *
 * 输入：arr = [100, 200, 300, 400];
 * k = 2;
 * 输出：700
 * 解释：300 + 400 = 700
 */

const arr = [100, 200, 300, 400];

// 1.暴力破解法是嵌套循环 时间复杂度 O(k * n)
function getMaxSum1(arr, k) {
  let maxSum = 0;
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    // 另 j 为后一项
    for (let j = i + 1; j < len; j++) {
      maxSum = maxSum > arr[i] + arr[j] ? maxSum : arr[i] + arr[j];
    }
  }
  return maxSum;
}

console.log(getMaxSum1(arr, 2));

// 2.使用滑窗算法 时间复杂度 O(n)
function getMaxSum2(arr, k) {
  let sum = 0,
    maxSum = 0;
  const len = arr.length;

  // 减少计算
  if (k < 0) return false;
  if (k > len) k = len;

  // 计算出第一个窗口的值 并用 maxSum 记录
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  maxSum = sum;

  // 从 k 开始(比如2 就是第一个窗口的下一位)
  for (let i = k; i < len; i++) {
    // 下一个窗口和 = 新进入的值(arr[k] 如 arr[2])  - 出窗口的值(arr[i-k] 如 arr[0])
    // 比如 [100,200] => [100] <- [200] <- [300] => [200,300] => ... => [300,400]
    sum += arr[i] - arr[i - k];
    maxSum = sum > maxSum ? sum : maxSum;
  }
  return maxSum;
}

const arr2 = [1000, 100, 600, 500, 700, 900, 200];
console.log(getMaxSum2(arr2, 2));

// sort 计算任意之和 注意和上面的(连续之和)的区别
function getMaxSum3(arr, k) {
  let tmp = arr;
  tmp.sort((a, b) => b - a);
  return tmp.slice(0, k).reduce((pre, cur) => pre + cur);
}
console.log(getMaxSum3(arr2, 2));
