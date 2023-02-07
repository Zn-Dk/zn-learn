var longestConsecutive = function (nums) {
  // 排序去重
  let set = [...new Set(nums)].sort((a, b) => a - b);
  let left = 0;
  let right = 0;
  let max = 0;
  while (right < set.length) {
    if (set[right] !== set[right - 1] + 1) {
      left = right;
    }
    max = Math.max(max, right - left + 1);
    right++;
  }
  return max;
};

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));
