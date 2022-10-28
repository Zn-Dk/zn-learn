const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const move = [];
let count = 0;
rl.on("line", function (line) {
  let reg = /^([WASD])([1-9]?[0-9]?)$/;
  // 通过正则过滤不合法数字
  let matches = line.match(reg);
  count++;
  // A10 => ['A','10']
  if (matches) {
    move.push([matches[1], matches[2]]);
  }
  console.log(move);
  // 得到 二维数组 [['A',10],['S',5]]
  if (move.length === 9) {
    rl.close();
  }
});

// x,y 坐标
// D +x   A -x
// W +y   S -y
const movement = {
  W: [1, 1],
  S: [1, -1],
  A: [0, -1],
  D: [0, 1],
};

rl.on("close", function () {
  console.log(move);

  let result = move.reduce(
    (pt, action) => {
      console.log(pt, action);
      let direction = movement[action[0]][0];
      let distance = Number(action[1]);
      // 正负系数
      let r = movement[action[0]][1];
      // 选择x y 然后计算
      pt[direction] += r * distance;
      return pt;
    },
    [0, 0]
  );
  console.log(result[0] + "," + result[1]);
});

// A10; S20; W10; D30; X; A1A; B10A11; ; A10;
