/* 
    编写一个函数，计算字符串中含有的不同字符的个数。字符在 ASCII 码范围内( 0~127 ，包括 0 和 127 )，换行表示结束符，不算在字符里。不在范围内的不作统计。多个相同的字符只计算一次
    例如，对于字符串 abaca 而言，有 a、b、c 三种不同的字符，因此输出 3 。

    数据范围： 1 \le n \le 500 \1≤n≤500 
    输入描述：
    输入一行没有空格的字符串。

    输出描述：
    输出 输入字符串 中范围在(0~127，包括0和127)字符的种数。

    abc => 3   aaa => 1


*/

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        // 正则校验+字符串长度校验 优化性能
        line = String(line)
        if( line.length === 1 || /^(.*)\1+$/.test(line)){
            console.log(1)
        }else{
            // 否则进行验证最简单的是 去重
           let set = new Set([...line])
           console.log(set.size)
        }

    }
}()
