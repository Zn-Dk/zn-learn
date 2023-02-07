// CREATE
// REACT
// APP
// CONFIGURATION
// OVERRIDE
// CRACO 配置 用于覆盖默认设置 (比如配置 webpack alias)
const { resolve } = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
};
