function mergeSort(arr) {
  let len = arr?.length;
  // 长度大于 1 的数组分而治之
  if (len > 1) {
    let mid = ~~(len / 2);
    // 数组分为左右两半 递归函数
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    // 合并排序
    arr = merge(left, right);
  }
  // 返回结果
  return arr;
}

/**
 * @description 将左右两个数组 合并 排序
 * @param {number[]} left 左数组
 * @param {number[]} right 右数组
 * @return {type} 返回值
 */
function merge(left, right) {
  //
  let i = 0;
  let j = 0;
  let res = []; // 结果数组

  while (i < left.length && j < right.length) {
    // 排序
    res.push(left[i] < right[j] ? left[i++] : right[j++]);
  }

  //合并 =>将 左右 数组 剩余的部分 concat
  // (例如 [2] , [3] => l < r => res == [2].concat([3]))
  // (例如 [5] , [1] => r < l => res == [1].concat([5]))
  return res.concat(i < left.length ? left.slice(i) : right.slice(j));
}

let ascArr = mergeSort([7, 6, 5, 6, 8, 4, 9, 3]);

console.log(ascArr);
