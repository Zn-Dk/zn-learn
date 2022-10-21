// String .repeat(times)

// 指定一个字符串 输出指定重复次数的新字符串
console.log("a".repeat(5));

// 案例 phoneNum: 13670164413 => 136****4413
let phoneNum = 13670164413;

function pri(phoneNum: number | string, len: 3 | 4 | 5 | 6 | 7) {
  phoneNum = typeof phoneNum === "number" ? String(phoneNum) : phoneNum;
  return (
    phoneNum.slice(0, 3) + "*".repeat(len) + phoneNum.slice(-(11 - 3 - len))
  );
}

console.log(pri(phoneNum, 7));

// zhengz
