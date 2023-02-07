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

// 打包 CDN 引入 external 排除
import externalGlobals from 'rollup-plugin-external-globals'

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
      css: {
        // vite 自带 postcss 配置项
        // postcss: {
        //   plugins: [
        //     postcsspxtoviewport({
        //       unitToConvert: 'px', // 要转化的单位
        //       viewportWidth: 750, // UI设计稿的宽度
        //       unitPrecision: 4, // 转换后的精度，即小数点位数
        //     }),
        //   ],
        // },
        // 预处理器配置
        preprocessorOptions: {
          scss: {
            /** 如果引入多个文件，可以最外面括号括起
             * '@import "@/assets/scss/globalVariable1.scss"; @import"@/assets/scss/globalVariable2.scss";'
             **/
            // 如果是在 public 目录下的可以直接使用 /xxx.sass
            additionalData: '@import "@/assets/global.scss"; ',
          },
        },
      },
    }
  }

  if (command === 'build') {
    return {
      ...commonConfig,
      // 打包配置
      build: {
        // 库模式
        // lib: {
        //   entry: path.resolve(__dirname, 'src/main.ts'), // 入口文件位置
        //   name: 'my-app',
        //   fileName: (format) => `my-app.${format}.js`
        // },

        // outDir: 'dist', // 默认 dist - 指定输出路径

        assetsDir: 'static', // 默认 assets - 指定生成静态资源的存放路径,

        // assetsInlineLimit: 4096, // 默认: 4096(Byte) - assets 文件小于指定 Byte 时打包成 base64

        // chunkSizeWarningLimit: 1024, // 默认: 500(kb) - 打包 chunk 文件过大的警报阈值

        cssCodeSplit: true, // 默认 true - 是否拆分 css 启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。

        // sourcemap: false, // 是否生成sourcemap (生产环境禁用)

        // minify: 'esbuild', // 默认 esbuild - 混淆器，esbuild 打包速度最快, 它比 terser 快 20-40 倍，压缩率只差 1%-2% , 设置 'terser' 时必须先安装 Terse

        // 清除console和debugger
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },

        ssr: true, // 默认 undefined (boolean | string) 生成面向 SSR 的构建。

        // rollup 配置
        rollupOptions: {
          output: {
            //对静态文件进行打包处理（文件分类）
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
            assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          },
          // 排除的第三方库
          external: ['vue', 'ant-design-vue', 'moment', 'lodash'],
          plugins: [
            // key : 'vue' - 这里需要和external对应，这个字符串就是(import xxx from aaa)中的aaa，也就是包的名字
            // value: 'Vue' - 这个是第三方库 js 文件导出的全局变量的名字，比如说 vue 就是 Vue，需要查看源码或者参考作者文档
            externalGlobals({
              vue: 'Vue',
              lodash: '_',
              'ant-design-vue': 'antd',
              moment: 'moment',
            }),
          ],
        },
      },
    }
  }
})
