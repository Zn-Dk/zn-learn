
// 最基础可用版本

// 缺点: 未优化空间
// 每次都创建了新的 less 和 greater 数组, 空间复杂度高

// 缺点 时间复杂度可能很高
// 每次都选择了固定位置的基准, 在某些极端情况下(比如已经有序的数组)会退化成 O(n^2) 的时间复杂度

// 快速排序的性能很大程度上取决于基准值（pivot）的选择：
// 基准恰好是中位数	O(n log n)	每次都能均匀分割
// 基准恰好是最值	O(n²)	最坏情况，退化成冒泡排序

function quickSort (n: number[]): number[] {
  if (n.length <= 1) return n;

  const less = []
  const greater = []
  const pivotIndex = Math.floor(n.length / 2); // 选择一个基准位置, 比如中间
  const pivot = n[pivotIndex]

  for (let i = 0; i < n.length; i++) {
    if (i === pivotIndex) continue;

    if (n[i] < pivot) less.push(n[i]);      // 比基准小 → 放入 less
    else greater.push(n[i]);                 // 比基准大或等于 → 放入 greater
  }

  // 递归这个过程
  return [...quickSort(less), pivot, ...quickSort(greater)]
}

const res = quickSort([1,4,6,3,5,3,7,2])
console.log('res', res)

// 优化版示例
// 三数取中选基准, 从数组的首、中、尾三个位置取值，选择其中的中位数作为基准。
function medianOfThree(arr: number[], s: number, m: number, e: number): number {
  const valS = arr[s];
  const valM = arr[m];
  const valE = arr[e];

  // 找出中位数的索引
  if ((valS - valM) * (valE - valS) >= 0) return s; // valS 是中位数 m < s < e
  if ((valM - valS) * (valE - valM) >= 0) return m; // valM 是中位数 s < m < e
  return e;
}

function quickSortOptimized1 (n: number[]): number[] {
  if (n.length <= 1) return n;

  const less = []
  const greater = []
  // 优化1 取值
  const pivotIndex = medianOfThree(n, 0, Math.floor(n.length / 2), n.length - 1);
  const pivot = n[pivotIndex]

  for (let i = 0; i < n.length; i++) {
    if (i === pivotIndex) continue;

    if (n[i] < pivot) less.push(n[i]);      // 比基准小 → 放入 less
    else greater.push(n[i]);                 // 比基准大或等于 → 放入 greater
  }

  // 递归这个过程
  return [...quickSort(less), pivot, ...quickSort(greater)]
}
console.log(quickSortOptimized1([1,4,6,3,5,3,7,2]));


/** 原地分区的思路
不创建新数组，而是通过交换元素位置，在原数组上完成分区：
  选择基准值
  用双指针从两端向中间扫描
  左指针找到 >= pivot 的元素，右指针找到 < pivot 的元素
  交换它们的位置
  重复直到指针相遇
*/


/**
 * 交换数组中两个元素
 */
function swap(arr: number[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * 原地分区函数（Lomuto 分区方案）
 * 返回基准值最终所在的索引
 */
function partition(arr: number[], left: number, right: number): number {
  // 三数取中优化
  const mid = Math.floor((left + right) / 2);
  const pivotIdx = medianOfThree(arr, left, mid, right);

  // 把基准值藏到最右边, 遍历的时候不需要被处理
  swap(arr, pivotIdx, right);
  const pivot = arr[right];

  // 规则: i 左边的元素都 < pivot, j 用于扫描                      │
  // 遇到 < pivot 的元素就交换到 i 的位置，然后 i 右移               │
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i++;
    }
  }

  // 把基准值换回原来的位置
  swap(arr, i, right);

  return i; // 返回i的最终位置
}

/**
 * 原地分区快速排序
 * 空间复杂度从 O(n) 优化到 O(log n)（递归栈）
 */
function quickSortInPlace (n: number[], left = 0, right = n.length - 1): number[] {
  if (n.length <= 1) return n;

  // 递归终止条件, 左右指针相遇
  if (left >= right) return n; 

  const pivot = partition(n, left, right);
  // 在分区函数中得到基准点, 
  // 交换前:
  // [ 3,  2,  1,  7,  6,  5 ]
  //               ↑       ↑
  //               i     pivot

  // 交换后:
  // [ 3,  2,  1,  5,  6,  7 ]
  //               ↑
  //           pivot
  //           i=3 (返回值)
  // 此时 i 左边的元素都 < pivot, i 右边的元素都 >= pivot

  // 递归排序基准值左右两侧的子数组
  quickSortInPlace(n, left, pivot - 1);
  quickSortInPlace(n, pivot + 1, right);

  return n;
}

console.log(quickSortInPlace([1,4,6,3,5,3,7,2]));