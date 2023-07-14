fn main() {
    // let immutable_msg = "message_immutable";
    // immutable_msg = "new message"; // cannot mutate immutable variable `immutable_msg`

    // 可变变量 使用 mut(mutable) 标记
    let mut msg = "message";
    println!("{}", msg);

    msg = "new message";
    println!("{}", msg);
}
