// 只能存整数
function countingSort(arr) {
  let count = [];
  let result = [];
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    // 将数字以索引存入数组中
    count[arr[i]] ? count[arr[i]]++ : (count[arr[i]] = 1);
  }
  // [5,2,4,3,2,1] =>count [1,2,1,1,1]
  // 再循环这个 count 数组 取出值
  for (let i = 0, countLen = count.length; i < countLen; i++) {
    // 计数 push
    for (let j = 0; j < count[i]; j++) {
      result.push(i);
    }
  }
  return result;
}

// 虽然计数排序看上去很强大，但是它存在两大局限性：

// 1.当数列最大最小值差距过大时，并不适用于计数排序

// 比如给定 20 个随机整数，范围在 0 到 1 亿之间，此时如果使用计数排序的话，就需要创建长度为 1 亿的数组，不但严重浪费了空间，而且时间复杂度也随之升高。

// 2.当数列元素不是整数时，并不适用于计数排序

// 如果数列中的元素都是小数，比如 3.1415，或是 0.00000001 这样子，则无法创建对应的统计数组，这样显然无法进行计数排序。

// 正是由于这两大局限性，才使得计数排序不像快速排序、归并排序那样被人们广泛适用。

// 不能排负数
let res = countingSort([-1, 5, 2, 4, 3, 2, 1]);

console.log(res);

// 选择排序
// 时间复杂度 O(N) 比冒泡排序少一个数量级O(N2)
// 空间复杂度 1 原地排序
// 不稳定 同值的位置可能会发生调换
function selectSort(arr) {
  // 最小项
  let min;

  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    // 假定最小项为 i (第一次循环时 假定为 0 然后从第0项往后查找)
    min = i;
    // 遍历数组剩余项
    for (let j = i; j < len; j++) {
      // 遍历寻找最小值 一旦有更小的就更新 min
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    // 内层循环结束 如果min发生改变, 交换位置
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
    // 从 i+1 重复执行排序 前面完成的不参与排序
  }
  return arr;
}

let res2 = selectSort([-1, 5, 2, 4, 3, 2, 1]);
console.log(res2);
