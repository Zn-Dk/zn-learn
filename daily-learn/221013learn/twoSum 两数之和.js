// Leetcode 求两数之和
/*

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。


示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

let nums = [1, 7, 12, 6, 15, 8];
let target = 18;

// 返回  [ i , j ]

// 题解 1 两遍循环 第一步将数组变为 { 值:下标 } 的对象 再循环取值 时间复杂度 O(2n)
// let twoSum = function (nums, target) {
//   let map = {};
//   for (let i = 0, len = nums.length; i < len; i++) {
//     // map 设置为数组 value , key => 得到 value 同时就能得到数组下标
//     map[nums[i]] = i;
//   }
//   for (let i = 0, len = nums.length; i < len; i++) {
//     let rest = target - nums[i];
//     // 遍历对象寻找下标 且不能为自身
//     if (map[rest] && map[rest] != i) {
//       return [map[rest], i];
//     }
//   }
// };

// 题解 2 使用 Map 速度提升 30%
// let twoSum = function (nums, target) {
//   let map = new Map(Array.from(nums, (item, index) => [item, index]));
//   for (let i = 0, len = nums.length; i < len; i++) {
//     let rest = target - nums[i];
//     // 遍历对象寻找下标
//     if (map.get(rest) && map.get(rest) != i) {
//       return [map.get(rest), i];
//     }
//   }
// };

// 题解 3
let twoSum = function(nums, target) {
  const map = new Map()
  for(let i = 0; i < nums.length; i++){
    if(map.has(target - nums[i])){
      return [map.get(target - nums[i]), i]
    }
    map.set(nums[i] , i)
  }
};

// twoSum(nums, target);

// console.log(twoSum([2, 7, 11, 15], 9));

console.log(twoSum([0, 4, 3, 0], 0)); // [0,3]
