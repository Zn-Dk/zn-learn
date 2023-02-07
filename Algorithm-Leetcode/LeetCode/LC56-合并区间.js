/*
 * function Interval(a, b){
 *   this.start = a || 0;
 *   this.end = b || 0;
 * }
 */
/*

  给出一组区间，请合并所有重叠的区间。
请保证合并后的区间按区间起点升序排列。

数据范围：区间组数 0  ≤n≤2×10 5
5
区间内 的值都满足 0  ≤val≤2×10 5

要求：空间复杂度 O(n)O(n)，时间复杂度 O(nlogn)O(nlogn)
进阶：空间复杂度 O(val)O(val)，时间复杂度O(val)O(val)
  示例1
  输入：
  [[10,30],[20,60],[80,100],[150,180]]

  返回值：
  [[10,60],[80,100],[150,180]]

  示例2
  输入：
  [[0,10],[10,20]]

  返回值：
  [[0,20]]


*/

/**
 *
 * @param intervals Interval类一维数组
 * @return Interval类一维数组
 */
function merge(intervals) {
  if (intervals.length === 0) return [];
  // 起点位置排序
  intervals.sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }
    return a.end - b.end;
  });
  // 排序后的第一个区间
  let res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    let resEnd = res[res.length - 1].end; // 每个结果数组的末尾数
    let start = intervals[i].start; // 起点区间
    let end = intervals[i].end; // 终点区间
    if (start <= resEnd) {
      //开始区间重叠 比较两者区间的最大末尾值然后更新
      res[res.length - 1].end = Math.max(end, resEnd);
    }
    if (start > resEnd) {
      res.push(intervals[i]);
    }
  }
  return res;
}
