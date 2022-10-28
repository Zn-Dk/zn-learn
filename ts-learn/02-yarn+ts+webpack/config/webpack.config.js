// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const isProd = process.env.NODE_ENV === "production"; // 是否生产环境

function resolve(dir) {
  return path.resolve(__dirname, "..", dir);
}
module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    main: resolve("src/main.js"),
  },

  output: {
    path: resolve("dist"),
    filename: "[name].[contenthash:8].js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [resolve("src")],
      },
    ],
  },

  optimization: {
    // 在开发模式下可以观察 tree-shaking (生产模式默认shaking)
    usedExports: true,
  },

  plugins: [
    //new CleanWebpackPlugin({}), Webpack5 之后可以在output 里启用 clean 选项

    new HtmlWebpackPlugin({
      template: resolve("public/index.html"),
    }),
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  devtool: isProd ? "cheap-module-source-map" : "eval",

  devServer: {
    host: "localhost", // 主机名
    static: resolve("public"), //public资源
    port: 8080,
    open: true,
    hot: false, // 启用HMR 热模块替换
  },
};
