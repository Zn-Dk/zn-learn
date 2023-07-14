
// 主函数 入口
fn main() {
  // 结尾带有感叹号的是宏 一般为 rust 自带
  // println! 打印
  println!("Hello, world!");

  let message = "message";
  let message2 = "message2";

  // 打印变量时 使用 "{}" 承载变量
  println!("{}", message);

  // 多个变量同理
  println!("1: {} 2: {}",message, message2); // 1: message 2: message2
}
