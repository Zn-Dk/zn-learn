/*
    密码验证, 要求:

    1.长度超过8位 (pw > 8)

    2.包括大写字母.小写字母.数字.其它符号（注：其他符号不含空格或换行）,以上四种至少三种

    3.不能有长度**大于**2的包含公共元素的子串重复 比如 AbcAbcAbc

    数据范围：输入的字符串长度满足 1<=n<=100

    输入描述：
    一组字符串。

    输出描述：
    如果符合要求输出："OK"，否则输出 "NG"
*/

function passwordVaild(pw) {
  // 正则列表(用两套正则过)
  let regList = [/^.{1,8}$/, /(.{3,}).*\1+.*/];
  let firstCheck = regList.every((reg) => !reg.test(pw));
  // 这里需要至少 3 个 true
  if (!firstCheck) {
    console.log("NG");
  } else {
    // 这里需要至少 3 个 true length>=3
    let regList2 = [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z\d\n\s]/];
    let secCheck = regList2.filter((reg) => reg.test(pw));
    let flag = secCheck.length >= 3 ? "OK" : "NG";
    console.log(flag);
  }
}

passwordVaild("021Abc9000");
passwordVaild("021Abc9Abc1");
passwordVaild("021ABC9000");
passwordVaild("021$bc9000");
passwordVaild("Q~7T&(4^$OXz725(3!Xl(3+s*");
