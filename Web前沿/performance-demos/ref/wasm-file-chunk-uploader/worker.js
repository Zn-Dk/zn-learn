// 引入 WASM 胶水代码
import init, { Hasher, Algorithm } from "./pkg/wasm_hash_pro.js";

let hasherInstance = null;

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  switch (type) {
    case "init":
      // 1. 初始化 WASM 环境
      await init();
      // 2. 创建 Hash 上下文
      const algo = payload === "SHA-256" ? Algorithm.SHA256 : Algorithm.MD5;
      hasherInstance = new Hasher(algo);
      self.postMessage({ type: "ready" });
      break;

    case "update":
      if (hasherInstance && payload) {
        // 3. 增量计算
        // payload 是一个 Uint8Array
        // 注意：这里直接传入 WASM，Rust 会自动处理内存映射
        hasherInstance.update(payload);

        // 反馈进度，不回传数据（数据已消费）
        self.postMessage({ type: "progress" });
      }
      break;

    case "digest":
      if (hasherInstance) {
        // 4. 获取最终结果
        const hash = hasherInstance.digest();
        // 5. 手动释放 Rust 内存对象
        hasherInstance.free();
        hasherInstance = null;
        self.postMessage({ type: "result", payload: hash });
      }
      break;
  }
};
