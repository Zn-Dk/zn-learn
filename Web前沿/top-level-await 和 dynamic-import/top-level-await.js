/** 顶层 await + dynamic import 引入 js 建议 node 14 版本以上 */
const d = await import('./data.js');
console.log(d.a, d.b);

/** dynamic import JSON 文件需要 V8 引擎支持(建议node 17 版本以上，这是个实验性功能) */
/** 使用 json.default 取到 data */
const json = await import('./data-json.json', { assert: { type: 'json' } });
console.log(json.default.foo, json.default.bar);
