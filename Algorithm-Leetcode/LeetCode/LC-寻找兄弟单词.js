/*
    描述
    定义一个单词的“兄弟单词”为：交换该单词字母顺序（注：可以交换任意次），而不添加、删除、修改原有的字母就能生成的单词。
    兄弟单词要求和原来的单词不同。例如： ab 和 ba 是兄弟单词。 ab 和 ab 则不是兄弟单词。
    现在给定你 n 个单词，另外再给你一个单词 x ，让你寻找 x 的兄弟单词里，按字典序排列后的第 k 个单词是什么？
    注意：字典中可能有重复单词。

    数据范围：1 \le n \le 1000 \1≤n≤1000 ，
    输入的字符串长度满足 1 \le len(str) \le 10 \1≤len(str)≤10  ， 1 \le k < n \1≤k<n

    输入描述：
    输入只有一行。 先输入字典中单词的个数n，再输入n个单词作为字典单词。 然后输入一个单词x 最后后输入一个整数k

    输出描述：
    第一行输出查找到x的兄弟单词的个数m 第二行输出查找到的按照字典顺序排序后的第k个兄弟单词，没有符合第k个的话则不用输出。
示例1

输入：
3 abc bca cab abc 1

输出：
2
bca  ( 从字典里找到兄弟单词 [bca cab] => arr[0] )

示例2

输入：
6 cab ad abcd cba abc bca abc 1

输出：
3
bca

说明：
从字典里找到的abc的兄弟单词有cab cba bca，所以输出3
经字典序排列后，变为bca cab cba，所以第1个字典序兄弟单词为bca

*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (input) {
  let params = input.split(" ");
  let n = params.shift();
  let k = params.pop();
  let x = params.pop();
  // 此时剩下字典

  // 输出兄弟数组
  let siblings = params.filter((word) => {
    // 相等的或者不同长度直接过滤
    if (word === x || word.length !== x.length) {
      return false;
    }
    // 比较是否是兄弟
    return isSibling(word, x);
  });
  // 排序兄弟数组
  siblings.sort();
  // 第一行 输出数组长度
  console.log(siblings.length);
  //2.查找 k 下标-1(没有不输出)
  siblings[k - 1] && console.log(siblings[k - 1]);
});

// abc cba 通过 split排序 然后检验
function isSibling(word, target) {
  let w = word.split("").sort();
  let t = target.split("").sort();
  for (let i = 0; i < t.length; i++) {
    if (t[i] !== w[i]) {
      return false;
    }
  }
  return true;
}
