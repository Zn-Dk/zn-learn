// 引入 wasm 桥接模块
use wasm_bindgen::prelude::*;
// 引入 image 库
use image::ImageOutputFormat;
use std::io::Cursor;

// 注册 panic 捕获钩子
#[wasm_bindgen(start)]
pub fn install_panic_hook() -> Result<(), String> {
    console_error_panic_hook::set_once();
    Ok(())
}

#[wasm_bindgen] // pub 导出函数, 用于在 JavaScript 中调用
pub fn hello() -> String { // -> String 表示返回值为 String 类型
    // 注意: Rust 中最后一个表达式自动作为返回值, 不需要写 return
    // 最后一个表达式不能用分号结尾, 否则会报错
    "Hello, world!".to_string()
}

#[wasm_bindgen]
pub fn greeting(name: &str) -> String {
    format!("Hello, {}", name)
}

// 处理图像, 传入 arrayBuffer(uint8), 返回处理后的 arrayBuffer(uint8)
#[wasm_bindgen]
pub fn process_image(
    buffer: &[u8],
    quality: Option<u8>,
    grayscale: bool,
) -> Result<Vec<u8>, JsValue> {
    // 1. 从 arrayBuffer 加载图像
    let img = image::load_from_memory(buffer).map_err(|e| JsValue::from(e.to_string()))?;

    // 2. 图像调整: 缩放图像 / 滤镜...
    let mut processed = img.resize(
        img.width() / 2,
        img.height() / 2,
        // 使用 Lanczos3 缩放算法
        image::imageops::FilterType::Lanczos3,
    );
    if grayscale {
        processed = processed.grayscale();
    }

    // 3. 保存处理后的图像
    let mut output = Vec::new();
    // 内存中的像素数据
    // => ImageOutputFormat::Jpeg(80%) 编码器, 编码为 JPEG 格式  压缩质量 q
    // => Cursor::new(&mut output) 内存中的像素数据写入 output 中
    // => 合法的 JEPG 二进制
    let q = quality.unwrap_or(80); // 默认压缩质量 80%
    processed
        .write_to(&mut Cursor::new(&mut output), ImageOutputFormat::Jpeg(q))
        .map_err(|e| JsValue::from_str(&format!("图片编码失败: {}", e)))?;

    Ok(output)
}
