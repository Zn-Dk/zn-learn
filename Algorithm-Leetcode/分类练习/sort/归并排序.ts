const mergeSort = (arr: number[]) => {
  if (arr.length === 1) return arr;
  let res: number[] = []

  const mid = ~~(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  res = merge(left, right)

  return res
}

const merge = (left: number[], right: number[]) => {
  let i = 0, j = 0
  let res = []


  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i])
      i++
    } else {
      res.push(right[j])
      j++
    }
  }
  // 排序 case 1
  // 6 7 | 5 6
  // l0 < r0 ? -> push r[0], j= 1, res = [5]
  // l1 < r1 ? -> push r[1], j = 2, res = [5, 6]
  // break

  // 5 6 6 7 | 3 4 8 9
  // l0 < r0 -> [3], j = 1
  // l0 < r1 -> [3, 4] j = 2
  // l0 < r2 -> [3, 4, 5] i = 1
  // l1 < r2 -> [3, 4, 5, 6] i =2
  // [3, 4, 5, 6, 6] i = 3
  // [3, 4, 5, 6, 6, 7] i = 4
  // break

  // 拼接剩余部分
  // res1: [5, 6].concat([6, 7])
  // res2: [3, 4, 5, 6, 6, 7].concat([8, 9])
  return res.concat(
    // 余留的部分一定是最大的
    i < left.length ? left.slice(i) : right.slice(j)
  )
}


let ascArr = mergeSort([7, 6, 5, 6, 8, 4, 9, 3]);
// 7 6 5 6 | 8 4 9 3
// 7 6 | 5 6 || 8 4 | 9 3
// 7 | 6 | 5 | 6 || 8 | 4 | 9 | 3
// 6 7 | 5 6 || 4 8 | 3 9
// 5 6 6 7 | 3 4 8 9
console.log(ascArr);
