import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// import compressPlugin from "vite-plugin-compression"; //静态资源压缩
// import legacyPlugin from "@vitejs/plugin-legacy"; //浏览器兼容

// 自动引入 api
// import AutoImport from 'unplugin-auto-import/vite'

// 移动端vw适配配置
// import postcsspxtoviewport from 'postcss-px-to-viewport' //插件

// 打包体积分析 npm i rollup-plugin-visualizer -D
import { visualizer } from 'rollup-plugin-visualizer'

// 参考 https://vitejs.dev/config/

// 使用函数配置形式 更加灵活
export default defineConfig(({ command, mode, ssrBuild }) => {
  // common 公共配置
  const commonConfig = {
    // 自定义 .env 文件的前缀 可以是 string[] (默认 'VITE_')
    envPrefix: ['VITE_', 'VUE_', 'BASE_'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@pub': path.resolve(__dirname, 'public'),
        // 'vue': 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: [
      vue(),
      // 打包体积分析
      visualizer({ open: true }),

      // AutoImport({
      //   // 指定 vue 自动化导入 api (无需 import)
      //   imports: ['vue'],
      //   // 创建声明文件的目录(否则生成在根目录下)
      //   dts: 'src/auto-import.d.ts',
      // }),

      // // gzip静态资源压缩
      // compressPlugin({
      //   verbose: true, // 默认即可
      //   disable: false, //开启压缩(不禁用)，默认即可
      //   deleteOriginFile: false, //删除源文件
      //   threshold: 10240, //压缩前最小文件大小
      //   algorithm: "gzip", //压缩算法
      //   ext: ".gz", //文件类型
      // }),

      // // 兼容插件
      // legacyPlugin({
      //   targets: ["chrome 52"], // 需要兼容的目标列表，可以设置多个
      //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 面向IE11时需要此插件
      // }),
    ],
  }

  if (command === 'serve') {
    return {
      ...commonConfig,
      server: {
        port: 8080, //vite项目启动时自定义端口
        open: true, //vite项目启动时自动打开浏览器
        hmr: true, //开启热更新
      },
      // css: {
      //   // vite 自带 postcss 配置项
      //   postcss: {
      //     plugins: [
      //       postcsspxtoviewport({
      //         unitToConvert: 'px', // 要转化的单位
      //         viewportWidth: 750, // UI设计稿的宽度
      //         unitPrecision: 4, // 转换后的精度，即小数点位数
      //       }),
      //     ],
      //   },
      // },
    }
  }

  if (command === 'build') {
    return {
      ...commonConfig,
      // 打包配置
      build: {
        // lib: {
        //   entry: path.resolve(__dirname, 'src/main.ts'), // 入口文件位置
        //   name: 'my-app',
        //   // fileName: (format) => `my-app.${format}.js`
        // },
        // sourcemap: false, // 是否生成sourcemap (生产环境禁用)

        // outDir: 'dist', // 指定输出路径 默认 /dist

        assetsDir: 'static', // 指定生成静态资源的存放路径

        // chunkSizeWarningLimit: 1500, // 警报门槛，限制大文件大小

        // assetsInlineLimit: 4096, // assets 文件小于指定 Byte 时打包成 base64 默认: 4096 => 4kb

        cssCodeSplit: true, // 是否拆分 css

        // minify: 'esbuild', // 混淆器，默认 esbuild 打包速度最快, terser 构建后文件体积更小(需要手动安装)

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
    }
  }
})
