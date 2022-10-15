/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 * Do not return anything, modify nums1 in-place instead. (不要返回 而是直接修改 nums1)
 */

// let merge = function (nums1, m, nums2, n) {
//   let arr1 = nums1.slice(0, m);
//   let arr2 = nums2.slice(0, n);
//   return [...arr1, ...arr2].sort((a, b) => a - b);
// };

let merge = function (nums1, m, nums2, n) {
  nums1.splice(m, n, ...nums2); // splice 再补充nums2
  nums1.sort((a, b) => a - b);
};

let nums1 = [1, 2, 3, 0, 0, 0],
  m = 3,
  nums2 = [2, 5, 6],
  n = 3;

merge(nums1, m, nums2, n);
console.log(nums1);
