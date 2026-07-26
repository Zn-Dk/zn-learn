// insertion sort

// 核心思想:
// 1. 假定第一个元素[0]已经排序
// 2. i = 1 从第 i 个元素开始, 与之前的元素比较, 找到合适位置插入
// 3. 重复以上步骤, 直到最后一个元素

const arr = [4, 3, 2, 8, 1, 5, 7, 1, 4]

// 1. 普通 for (最坏的情况是 O(n^2))
const insertSort = (arr: number[]) => {
  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i]
    let j = i - 1 // 查看前序节点
    while (j >= 0 && arr[j] > cur) {
      arr[j + 1] = arr[j] // 移动
      j--
    }
    // 结束后, j 是第一个小于 cur 的元素, 所以插入位置是 j + 1
    arr[j + 1] = cur
  }

  return arr
}

console.log(insertSort(arr))


// 2. 二分查找优化插入排序 (O(nlogn))
// 插入排序的一个重要特性是其稳定性。
// 例如，在序列[4a, 4b, 3, 5]中，即使 4a 和 4b 的值相等，
// 它们在排序后也应保持原有顺序。使用普通的二分查找可能会破坏这一稳定性，因为它可能会无视相同元素的原始顺序。为了维护稳定性，我们对二分查找进行调整，确保遇到相等元素时总是将搜索范围移至右侧。
// 这保证了我们可以定位到相等元素中最右侧的位置，并将新元素插入其后。
const arr2 = ['4a', 3, 2, 8, '4c', 1, 5, 7, 1, '4b']

const binSearchUnstable = (
  arr: (number | string)[],
  target: number | string,
  start: number,
  end: number
) => {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2)
    const midVal = parseInt(String(arr[mid]))
    if (midVal === parseInt(String(target))) {
      return mid  // 不稳定
      // 这意味着新元素会被插入到这个相等元素的前面
      // （因为后续的移位操作会把 mid 位置及之后的元素右移）。
    } else if (midVal < parseInt(String(target))) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return start
}

const binSearchStable = (
  arr: (number | string)[],
  target: number | string,
  start: number,
  end: number
) => {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2)
    const midVal = parseInt(String(arr[mid]))
    if (midVal === parseInt(String(target))) {
      start = mid + 1 
      // 当找到值相等的元素时，不立即返回，而是继续向右搜索。
      // 这样最终 start 会停在所有相等元素的最右侧之后的位置。
      // 确保稳定性
    } else if (midVal < parseInt(String(target))) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return start
}

const insertionSortWithUnstableBinSearch = (arr: (number | string)[]) => {
  let tmp = [...arr]

  for (let i = 1; i < tmp.length; i++) {
    const cur = tmp[i]
    let j = i - 1
    // 直接在前序数组中找到插入位置
    const insertPos = binSearchUnstable(tmp, cur, 0, j)
    while (j >= insertPos) { // 从后往前移动, 空出插入位置
      tmp[j + 1] = tmp[j]
      j--
    }
    tmp[insertPos] = cur
  }

  return tmp
}
// 这里用 arr2 做稳定性的演示
console.log(insertionSortWithUnstableBinSearch(arr2))
// [ 1, 1, 2, 3, "4b", "4c", "4a", 5, 7, 8 ]
// 可以看到, 顺序错误, 4a 和 4b 顺序反了(不可预测)

const insertionSortWithStableBinSearch = (arr: (number | string)[]) => {
  const tmp = [...arr]
  for (let i = 1; i < tmp.length; i++) {
    const cur = tmp[i]
    let j = i - 1
    // 直接在前序数组中找到插入位置
    const insertPos = binSearchStable(tmp, cur, 0, j)
    while (j >= insertPos) { // 从后往前移动, 空出插入位置
      tmp[j + 1] = tmp[j]
      j--
    }
    tmp[insertPos] = cur
  }

  return tmp
}
// 这里用 arr2 做稳定性的演示
console.log(insertionSortWithStableBinSearch(arr2))
// [ 1, 1, 2, 3, "4a", "4c", "4b", 5, 7, 8 ]
// 可以看到, 顺序正确