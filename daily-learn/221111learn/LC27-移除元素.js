/*
    给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

    不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

    元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

    示例 1：

    输入：nums = [3,2,2,3], val = 3
    输出：2, nums = [2,2]
    解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
    示例 2：

    输入：nums = [0,1,2,2,3,0,4,2], val = 2
    输出：5, nums = [0,1,4,0,3]
    解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
     

    提示：

    0 <= nums.length <= 100
    0 <= nums[i] <= 50
    0 <= val <= 100

    // 双指针法 (快慢指针)示例 假定一个数组

    ↓ fast
   [1, 2, 3, 4, 3, 5]
    ↑ slow

    val = 3

    1. slow = 下标 0
    2. for 循环中让快指针出发
    3. if(nums[fast] !== val){
      nums[slow] = nums[fast]
      slow++;
    }
    4.那么当遇到需要移除的元素时 slow 指针不移动, 等到下一个
      不被移除的数值出现, 会将这个值进行覆盖
    5. 最后循环结束 慢指针的位置移动到了移除后的子数组 + 1 的位置 === newLength
        (这个时候如果想要获取这个去重的数组 直接 nums.slice(0,slow) 即可)
*/
/**
 * @param {number[]} nums number[]
 * @param {number} val 需要移除的值
 * @return {number} 新数组长度
 */
const removeElement = function (nums, val) {
  let slow = 0,
    fast = 0;
  for (; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
  }
  return slow;
};

let res1 = removeElement([3, 2, 2, 3], 3);
console.log(res1); // 2

let res2 = removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
console.log(res2); // 5
