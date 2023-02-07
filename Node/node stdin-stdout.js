let users = [
  { username: "jack", pw: "123" },
  { username: "john", pw: "1234" },
  { username: "mary", pw: "1235" },
];

// process.stdin -  node 输入流 | process.stdout -  node 输出流

// 实际使用时 我们会通过 readline 模块的 createInterface 方法
// 该方法帮助我们创建变量承接输入输入流 无需每次调用 stdin /stdout
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question("你今年几岁了?", (answer) => {
//   console.log("答:" + answer + " 岁");
//   // 手动结束
//   rl.close();
// });

function recur() {
  //就是给每一行设置一个提示符
  rl.setPrompt("请输入用户名:");
  //prompt方法就是在等待用户输入数据
  rl.prompt();
}
recur();
// "line", 持续监听输入流, 用户输完一行，按下回车后就会触发的事件
rl.on("line", (input) => {
  console.log("用户名倒序: " + [...input.trim()].reverse().join(""));
  recur();
});

// IO结束事件的监听
rl.on("close", () => {
  console.log("程序执行完毕!");
  process.exit(1);
});

// process.stdout.write("请输入用户名:");
// process.stdin.on("data", (input) => {
//   input = input.toString().trim();
//   if (!username) {
//     if (Object.keys(users).indexOf(input) === -1) {
//       process.stdout.write("用户名不存在" + "\n");
//       process.stdout.write("请输入用户名:");
//       username = "";
//     } else {
//       process.stdout.write("请输入密码:");
//       username = input;
//     }
//   }
//   //输入密码
//   else {
//     if (input === users[username]) {
//       console.log("登陆成功");
//     } else {
//       process.stdout.write("请输入密码" + "\n");
//     }
//   }
// });
