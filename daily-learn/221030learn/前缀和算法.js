/*
  给你一个数组 nums 。数组「动态和」的计算公式为：runningSum[i] = sum(nums[0]…nums[i]) 。

  请返回 nums 的动态和。

  提示：

  1 <= nums.length <= 1000
  -10^6 <= nums[i] <= 10^6

  示例 1：

  输入：nums = [1,2,3,4]
  输出：[1,3,6,10]
  解释：动态和计算过程为 [1, 1+2, 1+2+3, 1+2+3+4] 。
*/

// 传统暴力算法 O(N^2)
let nums = [1, 2, 3, 4];

function preSum(nums) {
  let len = nums.length;
  let tmp = [];

  for (let i = 0; i < len; i++) {
    let sum = 0;
    for (let j = 0; j < 1; j++) {
      sum += nums[j];
    }
    tmp[i] = sum;
  }
  return tmp;
}
