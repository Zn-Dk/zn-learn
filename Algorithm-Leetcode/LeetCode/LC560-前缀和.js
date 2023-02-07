/*
给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
示例 1 :
输入:nums = [1,1,1], k = 2
输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。

说明 :
数组的长度为 [1, 20,000]。
数组中元素的范围是 [-1000, 1000] ，且整数 k 的范围是 [-1e7, 1e7]。

*/

// 暴力法(O N^3)
const subArrCount = (nums, k) => {
  let len = nums.length;
  let count = 0;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (sum(nums, i, j) === k) {
        count++;
      }
    }
  }
  return count;
  function sum(arr, start, end) {
    let sum = 0;
    for (let i = start; i <= end; i++) {
      sum += arr[i];
    }
    return sum;
  }
};

//前缀和 1
const subArrCount2 = (nums, k) => {
  let len = nums.length;
  let count = 0;
  const preSum = getPreSum(nums);
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      // 遍历第i项到第j项的元素之和
      if (preSum[j] - preSum[i - 1] === k) {
        count++;
      }
    }
  }
  return count;
};
function getPreSum(arr) {
  let len = arr.length;
  let preSum = [arr[0]];
  // 得到这个数组的前缀和
  for (let i = 1; i < len; i++) {
    preSum[i] = preSum[i - 1] + arr[i];
  }
  preSum[-1] = 0; // i = 0  i-1要返回 0
  return preSum;
}
console.log(getPreSum([1, 1, 1])); // [ 1, 2, 3 ]
console.log(subArrCount2([1, 1, 1], 2)); // 2

//前缀和 2
/*
  内层循环的关键条件语句是preSum[j] - preSum[i-1] === k,根据等式的基本原理，移项可得 preSum[i-1] === preSum[j] - k，

  现在关键点来了，从j的角度考虑(要考虑任意的i<=j 这就是前面提醒读者注意边界条件的原因)：

  当j = 0时，我们要比较: preSum[-1] 是否等于 preSum[0] - k;
  当j = 1时，我们要比较: preSum[0] 是否等于 preSum[1] - k, preSum[-1] 是否等于 preSum[1] - k;
  当j = 2时，我们要比较: preSum[1] 是否等于 preSum[2] - k,preSum[0] 是否等于 preSum[2] - k, preSum[-1] 是否等于 preSum[2] - k;
  所以我们可以考虑用一个hash结构(es6里的map)来保存 preSum[i] - k， key => value 分别对应 preSum[i] - k => 出现次数。
...
*/
const subArrCount3 = (nums, k) => {
  let len = nums.length;
  let count = 0;
  const hash = new Map([[0, 1]]); // 预设 preSum[-1] = 0
  const preSum = getPreSum(nums);
  for (let i = 0; i < len; i++) {
    const key = preSum[i] - k;
    if (hash.has(key)) {
      //判断之前出现的前缀和中 是否已经有满足【当前前缀和】=【之前前缀和】- k的项
      count += hash.get(key);
    }
    // 当前前缀和放入 hash 顺序不能与上面相反
    hash.set(preSum[i], (hash.get(preSum[i]) || 0) + 1);
  }
  return count;
};
console.log(subArrCount3([1, 1, 1], 2)); // 2

// 去除preSum getPreSum的本质实质上也是对nums做了一次单层循环，并且在subarraySum函数里， 遍历到i时，我们只需要当前对应的preSum[i]即可**
const subArrCount4 = (nums, k) => {
  let len = nums.length;
  let count = 0;
  const hash = new Map([[0, 1]]); // 预设 preSum[-1] = 0
  // const preSum = getPreSum(nums);
  let currentSum = 0;
  for (let i = 0; i < len; i++) {
    currentSum += num[i];
    const key = currentSum - k;
    if (hash.has(key)) {
      count += hash.get(key);
    }
    hash.set(currentSum, (hash.get(currentSum) || 0) + 1);
  }
  return count;
};
console.log(subArrCount3([1, 1, 1], 2)); // 2
