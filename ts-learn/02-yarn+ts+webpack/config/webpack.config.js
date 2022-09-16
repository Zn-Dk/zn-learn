const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const isProd = process.env.NODE_ENV === "production"; // 是否生产环境

function resolve(dir) {
  return path.resolve(__dirname, "..", dir);
}

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    main: "./src/main.ts",
  },

  output: {
    path: resolve("dist"),
    filename: "[name].[contenthash:8].js",
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

  plugins: [
    new CleanWebpackPlugin({}),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  devtool: isProd ? "cheap-module-source-map" : "eval",

  devServer: {
    host: "localhost", // 主机名
    static: path.join(__dirname, "../public"), //public资源
    port: 8080,
    open: true,
  },
};
