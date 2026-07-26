use wasm_bindgen::prelude::*;
use md5::{Md5, Digest};
use sha2::{Sha256, Digest as Sha2Digest};

// 导出算法类型枚举
#[wasm_bindgen]
pub enum Algorithm {
    MD5,
    SHA256,
}

// 哈希计算器结构体
// 必须保存中间状态，因为文件是切片传入的
#[wasm_bindgen]
pub struct Hasher {
    algo: Algorithm,
    md5_ctx: Option<Md5>,
    sha256_ctx: Option<Sha256>,
}

#[wasm_bindgen]
impl Hasher {
    // 构造函数：初始化特定算法的上下文
    #[wasm_bindgen(constructor)]
    pub fn new(algo: Algorithm) -> Hasher {
        match algo {
            Algorithm::MD5 => Hasher {
                algo,
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

    // 核心方法：增量更新
    // 接收 JS 传来的 Uint8Array 切片
    pub fn update(&mut self, chunk: &[u8]) {
        match self.algo {
            Algorithm::MD5 => {
                if let Some(ctx) = &mut self.md5_ctx {
                    ctx.update(chunk);
                }
            }
            Algorithm::SHA256 => {
                if let Some(ctx) = &mut self.sha256_ctx {
                    ctx.update(chunk);
                }
            }
        }
    }

    // 结束计算并输出 Hex 字符串
    pub fn digest(&mut self) -> String {
        let result = match self.algo {
            Algorithm::MD5 => {
                // take() 会取出 Option 中的值并将原值置为 None，防止重复调用
                if let Some(ctx) = self.md5_ctx.take() {
                    hex::encode(ctx.finalize())
                } else {
                    String::from("")
                }
            }
            Algorithm::SHA256 => {
                if let Some(ctx) = self.sha256_ctx.take() {
                    hex::encode(ctx.finalize())
                } else {
                    String::from("")
                }
            }
        };
        result
    }
}