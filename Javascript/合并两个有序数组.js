/**
 * @param {number[]} nums
 * @param {number} startIdx
 * @param {number[]} appends
 * @param {number} deleteCount
 * @return {void}
 * Do not return anything, modify nums in-place instead. (不要返回 而是直接修改 nums)
 */

let merge = function (nums, startIdx, deleteCount, appends) {
  nums.splice(startIdx, deleteCount, ...appends); // splice 再补充nums2
  nums.sort((a, b) => a - b);
};

let nums = [1, 2, 3, 0, 0, 0],
  startIdx = 3,
  deleteCount = 3;
  appends = [2, 5, 6],

merge(nums, startIdx, deleteCount, appends);
console.log(nums);
