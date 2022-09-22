import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// import compressPlugin from "vite-plugin-compression"; //静态资源压缩
// import legacyPlugin from "@vitejs/plugin-legacy"; //浏览器兼容

// 自动引入 api
// import AutoImport from 'unplugin-auto-import/vite'

// 参考 https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080, //vite项目启动时自定义端口
    open: true, //vite项目启动时自动打开浏览器
    hmr: true, //开启热更新
  },
  plugins: [
    vue(),
    // AutoImport({
    //   // 指定 vue 自动化导入 api (无需 import)
    //   imports: ['vue'],
    //   // 创建声明文件的目录(否则生成在根目录下)
    //   dts: 'src/auto-import.d.ts',
    // }),
    // compressPlugin({
    //   //gzip静态资源压缩
    //   verbose: true, // 默认即可
    //   disable: false, //开启压缩(不禁用)，默认即可
    //   deleteOriginFile: false, //删除源文件
    //   threshold: 10240, //压缩前最小文件大小
    //   algorithm: "gzip", //压缩算法
    //   ext: ".gz", //文件类型
    // }),
    // legacyPlugin({
    //   targets: ["chrome 52"], // 需要兼容的目标列表，可以设置多个
    //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 面向IE11时需要此插件
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  // 打包配置
  build: {
    // 清除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    //警报门槛，限制大文件大小
    // chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        //对静态文件进行打包处理（文件分类）
        //此处打开后会导致背景图路径有问题，所以暂时隐藏，未找到合适的解决方案
        // chunkFileNames: 'assets/js/[name]-[hash].js',
        // entryFileNames: 'assets/js/[name]-[hash].js',
        // assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
