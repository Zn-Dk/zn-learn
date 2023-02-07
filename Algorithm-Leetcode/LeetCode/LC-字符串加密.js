const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
    有一种技巧可以对数据进行加密，它使用一个单词作为它的密匙。下面是它的工作原理：首先，选择一个单词作为密匙，如TRAILBLAZERS。如果单词中包含有重复的字母，只保留第1个，将所得结果作为新字母表开头，并将新建立的字母表中未出现的字母按照正常字母表顺序加入新字母表。如下所示：
    A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

    T R A I L B Z E S C D F G H J K M N O P Q U V W X Y (实际需建立小写字母的字母表，此字母表仅为方便演示）

    上面其他用字母表中剩余的字母填充完整。在对信息进行加密时，信息中的每个字母被固定于顶上那行，并用下面那行的对应字母一一取代原文的字母(字母字符的大小写状态应该保留)。因此，使用这个密匙， Attack AT DAWN (黎明时攻击)就会被加密为Tpptad TP ITVH。

    请实现下述接口，通过指定的密匙和明文得到密文。

    数据范围：1 \le n \le 100 \1≤n≤100  ，保证输入的字符串中仅包含小写字母

    输入 nihao
    输出 ni

*/

let alphabet = "abcdefghijklmnopqrstuvwxyz";
// nihao + alphabet => 'nihaoabc....' => set 去重 "nihaobcdefgjklmpqrstuvwxyz"
let data = [];
rl.on("line", function (line) {
  data.push(line);
  if (data.length === 2) {
    let key = data[0];
    let plain = data[1];
    //将key与字母表拼合去重  截取成26位
    let secret = key + alphabet;
    secret = [...new Set([...secret])].join("");
    let encode = "";
    // console.log(secret);
    for (let i = 0; i < plain.length; i++) {
      // 提取对应位置的密码
      encode += secret[alphabet.indexOf(plain[i])];
    }
    console.log(encode);
  }
});
