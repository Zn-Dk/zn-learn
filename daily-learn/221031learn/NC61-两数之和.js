/*
  NC61 两数之和
  给出一个整型数组 numbers 和一个目标值 target，请在数组中找出两个加起来等于目标值的数的下标，返回的下标按升序排列。
（注：返回的数组下标从1开始算起，保证target一定可以由数组里面2个数字相加得到）

*/
function twoSum(numbers, target) {
  // 哈希map
  let map = new Map();
  let len = numbers?.length;
  for (let i = 0; i <= len; i++) {
    let diff = target - numbers[i];
    if (map.has(diff)) {
      // 差值刚好命中 返回当前的值和下标+1
      return [map.get(diff), i + 1];
    }
    map.set(numbers[i], i + 1); // 否则存取这个diff和下标
  }
}
let res = twoSum([3, 2, 4], 6);
console.log(res);
