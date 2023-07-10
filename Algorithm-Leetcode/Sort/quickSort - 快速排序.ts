/**
 * 快速排序
 * 快速排序的3个基本步骤：
 * 1. 从数组中选择一个元素作为基准点
 * 2. 排序数组，所有比基准值小的元素摆放在左边，而大于基准值的摆放在右边。每次分割结束以后基准值会插入到中间去。
 * 3. 最后利用递归，将摆放在左边的数组和右边的数组在进行一次上述的1和2操作。
 */

/** 快排 数组首基准 */
export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  // 指定数组首/尾均可, 只是为了寻找一个基准(指定尾部)
  const pivot = arr[0];
  // small large 分别存放本阶段数组中比基准值 小/大的数
  const small: number[] = [];
  const large: number[] = [];

  // 指定数组首位(0), 则从 1 位正向遍历
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      small.push(arr[i]);
    } else {
      large.push(arr[i]);
    }
  }
  console.log(small, large);
  // 以基准支点 递归这一过程
  return [...quickSort(small), pivot, ...quickSort(large)];
}

const res = quickSort([3, 1, 2, 2, 3, 2, 1]);
console.log(res);

// ---------------------------------------------------------------------

// 1. 输入数组, 左右边界为数组起始
// (如果左边界大于或等于右边界，说明子数组的元素个数为 0 或 1, 这意味着子数组已经是有序的，无需再进行排序)
function quickSort2(arr: number[], left = 0, right = arr.length - 1): number[] {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort2(arr, left, pivotIndex - 1); // 排序: 起始 - 基准点左一位
    quickSort2(arr, pivotIndex + 1, right); // 排序: 基准点右一位 - 结束
  }
  return arr;
}

function partition(arr: number[], left: number, right: number): number {
  const pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
    console.log(arr);
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 小于基准值, 交换
      i++; // 移动 i 的位置
    }
  }

  // console.log(arr[i], arr[right]);
  [arr[i], arr[right]] = [arr[right], arr[i]];
  // console.log(arr[i], arr[right]);
  return i;
}

const unsortedArray = [34, 56, 1, 12, 9, 87, 23, 45];
const sortedArray = quickSort2(unsortedArray);

console.log(sortedArray);

/*

更稳定的快排 - 引入随机 pivot

function randomQuickSort(arr: number[], left: number = 0, right: number = arr.length - 1): number[] {
  if (left < right) {
      const pivotIndex = randomPartition(arr, left, right);
      randomQuickSort(arr, left, pivotIndex - 1);
      randomQuickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function randomPartition(arr: number[], left: number, right: number): number {
  const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;
  [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
  return partition(arr, left, right);
}

function partition(arr: number[], left: number, right: number): number {
  const pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          i++;
      }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

const unsortedArray: number[] = [34, 56, 1, 12, 9, 87, 23, 45];
const sortedArray: number[] = randomQuickSort(unsortedArray);
console.log(sortedArray);
 */
