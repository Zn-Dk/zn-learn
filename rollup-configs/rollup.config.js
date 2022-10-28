import path from "path";

// 处理 node_modules 第三方库
import { nodeResolve } from "@rollup/plugin-node-resolve";

// 将 commonjs 库转换为 esm 导入
import commonjs from "rollup-plugin-commonjs";

// 处理 json 文件 json => es6 module 以便 tree-shaking
import json from "@rollup/plugin-json";

// import { terser } from "rollup-plugin-terser"; // 代码压缩
// plugin-minification (rollup 3.2 不能兼容 terser 目前github的替代方案2022-10)
import { terser } from "rollup-plugin-minification";

// 生成html模板 (类似HtmlWebpackPlugin)
import html from "@rollup/plugin-html";
// 模板传递函数
const template = ({ attributes, bundle, files, publicPath, title }) => {
  // console.log(files); 会列出所有需要打包的文件 jss[] css[]

  // 只添加 index 部分
  const jsFile = files.js.find((items) => {
    const reg = /index.*?.js$/;
    return reg.test(items.fileName);
  });
  const cssFile = files.css.find((items) => {
    const reg = /index.*?.css$/;
    return reg.test(items.fileName);
  });

  return `<!DOCTYPE html>
            <html lang="${attributes.html.lang}">
              <head>
                <title>${title}</title>
                <link rel="stylesheet" href="${cssFile.fileName}">
              </head>
              <body>
                <div id="app"></div>
                <p class="red">Red Font</p>
                <script src="${jsFile.fileName}"></script>
              </body>
          </html>`;
};

// babel
/*
  When using @rollup/plugin-babel with @rollup/plugin-commonjs in the same Rollup configuration,
  it's important to note that @rollup/plugin-commonjs must be placed before this plugin in
  the plugins array for the two to work together properly. e.g.
  也就是说如果与commonjs插件同时使用  **必须放在babel之前,否则不生效**
*/
import babel from "@rollup/plugin-babel";

// alias 别名
import alias from "@rollup/plugin-alias";
// 获取 __dirname 的 ESM 写法
import { fileURLToPath } from "url";
//const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __dirname = path.resolve();

// postcss  npm i -D postcss rollup-plugin-postcss
import postcssPlugin from "rollup-plugin-postcss";

export default {
  // 入口路径
  input: "src/index.js",
  // 输出路径
  output: {
    // 目录
    dir: "dist",
    // 自定义名称
    // file: "bundle.js",
    entryFileNames: "[name]-[hash].js",
    assetFileNames: ({ name }) => {
      const { ext, dir, base } = path.parse(name);
      if (ext !== ".css") return "[name].[ext]";
      return path.join(dir, "style", base);
    },
    format: "cjs",
    // 这些插件只需在打包时使用
    plugins: [
      terser(),
      html({
        // 预定义 html 标签属性
        attributes: { html: { lang: "zh-cn" }, link: null, script: null },
        fileName: "index.html",
        // 打包文件存放地 默认 ''
        // publicPath: "../public/",
        title: "My WebSite",
        template,
      }),
    ],
  },
  // 排除项
  // external: ["dayjs"],
  plugins: [
    // 别名
    alias({
      entries: [
        // { find: "utils", replacement: "../../../utils" },
        { find: "@", replacement: path.resolve(__dirname, "src") }, // 将 @ 识别为 ./src 目录
      ],
    }),
    json(),
    commonjs(),
    nodeResolve(),
    // 放在最后
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
      exclude: "node_modules/**", // 排除 node_modules 的优化
    }),
    postcssPlugin({
      // // Or with custom file name
      // extract: path.resolve('dist/my-custom-file-name.css')
      // 是否要将 css 与 js 分开
      extract: true,
      plugins: [],
    }),
  ],
};
