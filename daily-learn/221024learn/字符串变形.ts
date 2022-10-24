/*

对于一个长度为 n 字符串，我们需要对它做一些变形。

首先这个字符串中包含着一些空格，就像"Hello World"一样，
然后我们要做的是把这个字符串中由空格隔开的单词反序，同时反转每个字符的大小写。

比如"Hello World"变形后就变成了"wORLD hELLO"。

数据范围: 1 ≤ n ≤ 10^6  , 字符串中包括大写英文字母、小写英文字母、空格。

进阶：空间复杂度 O(n)O(n) ， 时间复杂度 O(n)O(n)

输入描述：
给定一个字符串s以及它的长度n(1 ≤ n ≤ 10^6)

返回值描述：
请返回变形后的字符串。题目保证给定的字符串均由大小写字母和空格构成。


示例1

输入：
"This is a sample",16
返回值：
"SAMPLE A IS tHIS"

示例2

输入：
"nowcoder",8
返回值：
"NOWCODER"

示例3

输入：
"iOS",3
返回值：
"Ios"

 */

export function trans(s: string, n: number): string {
  // write code here
  // 分割字符串
  let tmp = s
    .split(" ")
    .reverse()
    .map((item) => {
      // 子项分割 大小写倒转
      return item
        .split("")
        .map((i) => {
          return /[A-Z]/.test(i) ? i.toLowerCase() : i.toUpperCase(); // 正则判断
        })
        .join("");
      // let tmpItem = "";
      // for (let i = 0; i < item.length; i++) {
      //   // 小写字母 a ascii == 97 所以整体应大于等于97  // 直接使用ASCII判断
      //   tmpItem +=
      //     item[i].charCodeAt(0) >= 97 ? item[i].toUpperCase() : item[i].toLowerCase();
      // }
      // return tmpItem;
    });

  return tmp.join(" ").slice(0, n);
}
