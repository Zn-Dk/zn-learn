import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// import compressPlugin from "vite-plugin-compression"; //静态资源压缩
// import legacyPlugin from "@vitejs/plugin-legacy"; //浏览器兼容

// 自动引入 api
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 打包体积分析 npm i rollup-plugin-visualizer -D
import { visualizer } from 'rollup-plugin-visualizer'

// 参考 https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080, //vite项目启动时自定义端口
    open: true, //vite项目启动时自动打开浏览器
    hmr: true, //开启热更新
  },
  plugins: [
    vue(),
    // 打包体积分析
    visualizer({ open: true }),
    AutoImport({
      // 指定 vue 自动化导入 api (无需 import)
      // imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      // 创建声明文件的目录(否则生成在根目录下)
      dts: 'src/auto-import.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
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
      '@pub': path.resolve(__dirname, 'public'),
      // 'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  // 打包配置
  build: {
    // lib: {
    //   entry: path.resolve(__dirname, 'src/main.ts'), // 入口文件位置
    //   name: 'my-app',
    //   // fileName: (format) => `my-app.${format}.js`
    // },
    // sourcemap: true, // 是否生成sourcemap

    // outDir: 'dist', // 指定输出路径 默认 /dist

    assetsDir: 'static', // 指定生成静态资源的存放路径

    // chunkSizeWarningLimit: 1500, // 警报门槛，限制大文件大小

    minify: 'esbuild', // 混淆器，terser构建后文件体积更小

    // 清除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    rollupOptions: {
      output: {
        //对静态文件进行打包处理（文件分类）
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
