// 这是一道大题目，把考点拆成了4个小项；需要侯选人用递归算法实现（限制15行代码以内实现；限制时间10分钟内完成）：
// a) 生成一个长度为5的空数组arr。
// b) 生成一个（2－32）之间的随机整数rand。
// c) 把随机数rand插入到数组arr内，如果数组arr内已存在与rand相同的数字，则重新生成随机数rand并插入到arr内[需要使用递归实现，不能使用for/while等循环]
// d) 最终输出一个长度为5，且内容不重复的数组arr。

// 常规的递归
function genRndArr(max, min, len) {
  let tmp = [];
  //let count = 0;
  recur();
  function recur() {
    if (tmp.length === len) return;
    let rnd = ~~Math.max(min, Math.random() * max);
    if (!tmp.includes(rnd)) {
      // 其实这里includes底层源码也是遍历 没有想到更好的方法 其实可以用对象模拟 或者 map/set

      tmp.push(rnd);
    }
    //count++;
    return recur();
  }
  //console.log("经历次数:" + count);
  return tmp;
}
console.log(genRndArr(2, 32, 10));

// 使用 set 去重

function returnRandomArr(max, min, length, arr = []) {
  arr.push(Math.floor(Math.random() * (max - min)) + min);
  arr = Array.from(new Set(arr));
  // 检查是否满足长度
  return arr.length < length ? returnRandomArr(max, min, length, arr) : arr;
}
let arr = returnRandomArr(32, 2, 5);
console.log(arr);
