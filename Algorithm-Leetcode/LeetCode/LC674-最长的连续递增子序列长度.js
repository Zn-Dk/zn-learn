/*
  以单调递增栈来讲解单调栈原理。假设当前元素为x，

  (1) 若x < 栈顶元素，那就不满足单调递增性，这时将栈中元素y弹出，若此时条件仍然不满足，则继续弹出栈顶元素，直到满足条件，再将x入栈;

  (2) 若x >= 栈顶元素，满足单调递增性，将x入栈；

  如此不断重复以上步骤，直到所有满足条件的元素都入栈。

  以一个具体例子[3, 5, 2, 6, 8]为例：

  （1）首先将3入栈，此时栈中元素为[3];

  （2）再将5入栈，此时栈中元素为[3, 5];

  （3）再将2入栈，发现此时2 < 5，不满足单调递增性，将5出栈，2入栈。此时栈中元素应为[3, 2]，依然不满足单调递增，继续（4）步骤;

  （4）将栈顶元素3出栈，再将2入栈，此时栈中元素为[2]；

  （5）将6和8依次入栈，最终栈中元素为[2, 6, 8]。

*/

// 最长的连续递增列的长度

// 1.贪心算法 O(n) (类似买卖股票的最佳时机 II LC-122)
var findLengthOfLCIS = (nums) => {
  let res = 1,
    max = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      res++; // 收集所有上坡段的长度累加
    } else {
      res = 1; // 下坡的时候重置
    }
    max = Math.max(max, res);
  }
  return max;
};

// 2. 滑窗 O(n)
var findLengthOfLCIS2 = (nums) => {
  let left = 0,
    right = 0,
    len = nums.length,
    res = 0;
  while (right < len) {
    // 如果移入窗口元素小于窗口前一个值(非递增)
    if (nums[right] <= nums[right - 1]) {
      left = right; // 左指针移动重置
    }
    res = Math.max(res, right - left + 1); // 更新窗口
    right++; // 右指针继续
  }
  return res;
};

console.log(findLengthOfLCIS2([1, 3, 5, 4, 7]));

//3. 动态规划 dp
var findLengthOfLCIS2 = (nums) => {
  const len = nums.length;
  const dp = new Array(len).fill(1);
  //从1位置遍历 如果后一个元素大于前一个元素 dp[i] 改变
  for (let i = 0; i < len; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1;
    }
  }
  return Math.max(...dp);
};
