// 在 Rust 中，如果你要调用一个 trait（特征/接口） 定义的方法，
//就必须把那个 trait 导入到当前作用域。
// 所以 Digest 看上去直接没有调用, 但是需要引入
// md5 和 sha2 的 Digest 方法相同
use md5::{Digest as Md5Digest, Md5};
use sha2::{Digest as Sha26Digest, Sha256};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub enum Algorithm {
    // 导出枚举
    MD5,
    SHA256,
}

#[wasm_bindgen]
pub struct Hasher {
    algo: Algorithm,            // 算法类型
    md5_ctx: Option<Md5>,       // MD5上下文 (可选)
    sha256_ctx: Option<Sha256>, // sha256上下文 (可选)
}

#[wasm_bindgen]
impl Hasher {
    // 创建类 允许被 js 调用

    #[wasm_bindgen(constructor)]
    // -> Hasher: 函数的"返回值类型声明", 表示这个函数返回一个 Hasher 类型的值
    // 类似 TS: function new(algo: Algorithm): Hasher { ... }
    pub fn new(algo: Algorithm) -> Hasher {
        // switch - case
        match algo {
            // => Hasher { ... }: 这里的 Hasher 是"构造一个 Hasher 实例"(结构体字面量)
            // 类似 JS: return { algo, md5_ctx: ..., sha256_ctx: ... }
            // 区别总结:
            //   -> Hasher     = 返回值类型声明 (告诉编译器: 我会返回 Hasher 类型)
            //   => Hasher {}  = 创建 Hasher 实例 (实际构造并返回一个 Hasher 对象)
            // 注意: Rust 中最后一个表达式自动作为返回值, 不需要写 return
            Algorithm::MD5 => Hasher {
                algo,
                // 因为声明的struct 表明了 md5_ctx 是可选的
                // enum Option<T> {
                //     Some(T),  // 有值，包裹着一个 T 类型的值
                //     None,     // 没有值（类似其他语言的 null/undefined）
                // }
                // 所以这里需要初始化时包裹 Some(T), 表明这有值, 包了一个 Md5 实例
                md5_ctx: Some(Md5::new()),
                sha256_ctx: None,
            },
            Algorithm::SHA256 => Hasher {
                algo,
                md5_ctx: None,
                sha256_ctx: Some(Sha256::new()),
            },
        }
    }

    // 更新(增量)
    // worker -> U8Arr 切片
    // &mut self: 类似于 JS 的 this, &mut 表示可变借用(可写引用), 因为 update 会修改内部状态
    // chunk: &[u8]: 接收一个 u8 类型的切片引用(类似 JS 的 Uint8Array)
    pub fn update(&mut self, chunk: &[u8]) {
        // match: switch-case
        match self.algo {
            Algorithm::MD5 => {
                // if let Some(ctx) = &mut self.md5_ctx 做了两件事:
                // 1. 判断: self.md5_ctx 是 Some(...) 还是 None?  (等价于 JS: if (this.md5_ctx !== null))
                // 2. 取值: 如果是 Some, 把里面包裹的 Md5 实例取出来, 绑定到变量 ctx
                // 注意: 这里的 = 不是赋值, 而是"模式匹配" (尝试用左边的模式去匹配右边的值)
                // ctx 是 context(上下文) 的缩写, 只是一个自定义变量名, 代表取出来的 Md5 哈希器实例
                // &mut: 需要可变借用, 因为 ctx.update() 会修改 Md5 的内部哈希状态
                if let Some(ctx) = &mut self.md5_ctx {
                    ctx.update(chunk);
                }
                // 如果是 None, 匹配失败, 什么都不做(直接跳过)
            }
            Algorithm::SHA256 => {
                if let Some(ctx) = &mut self.sha256_ctx {
                    ctx.update(chunk);
                }
            }
        }
    }

    // 完成计算, 返回 Hex 字符串
    pub fn digest(&mut self) -> String {
        let result = match self.algo {
            Algorithm::MD5 => {
                // take() 会取出 Option 中的值并将原值置为 None，防止重复调用
                if let Some(hasher) = self.md5_ctx.take() {
                    hex::encode(hasher.finalize())
                } else {
                    "".to_string()
                }
            }
            Algorithm::SHA256 => {
                if let Some(hasher) = self.sha256_ctx.take() {
                    hex::encode(hasher.finalize())
                } else {
                    "".to_string()
                }
            }
        };
        // 最后一个表达式不能用分号结尾, 否则会报错
        result
    }
}
