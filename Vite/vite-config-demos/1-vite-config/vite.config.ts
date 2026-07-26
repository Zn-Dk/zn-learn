import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 插件配置
  plugins: [react()],

  define: {
    // 定义全局变量, 在项目中直接使用 MY_APP_TITLE, 打包时会被替换成对应的值 (常量需要加引号代表字符串)
    'process.env.MY_APP_TITLE': '"ABC"',
    // 'MY_APP_TITLE': process.env.VITE_APP_TITLE,
    'process.env.SECRET_WORD': '"123456"',
  },

  // 解析配置
  resolve: {
    // 路径别名 (用于编译识别)
    // 在 tsconfig.app.json 中需要同步配置 paths (用于代码类型检查, IDE 识别)
    alias: {
      '@': '/src',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  // 开发服务器
  server: {
    host: '0.0.0.0', // 服务器监听地址, 0.0.0.0 => localhost
    // port: 8080, // 默认端口为 5173, 可以自定义端口
    // 本地代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  css: {
    modules: {
      scopeBehaviour: 'local', // 全局样式默认不开启模块化, 开启后需要在文件名中添加 .module.css 后缀才会生效
    } // 开启 css 模块化
  },

  // 构建配置
  build: {
    outDir: 'build2', // 输出目录 默认 dist, 也可以在 rollupOptions.output.dir 中配置 (优先级低于 rollupOptions)
    assetsDir: 'assets', // 静态资源目录 默认 assets
    sourcemap: true, // 生成 sourcemap 文件 默认 false
    // minify: 'terser', // 压缩代码 默认 esbuild, 也可以配置为 'terser'
    // terserOptions: {
    //   compress: {
    //     drop_console: true, // 删除 console.log 等语句
    //     drop_debugger: true, // 删除 debugger 语句
    //   }
    // },
    rollupOptions: {
      output: {
        dir: 'build', // 输出目录 默认 dist

        // 手动分块(简单配置), 把 react 相关的模块放到 react 这个 chunk 中
        // manualChunks: {
        //   'react': ['react', 'react-dom/client']
        // }

        // 手动分块(复杂配置函数), 把 react 相关的模块放到 react 这个 chunk 中
        manualChunks(id) { // 模块
          const cwd = process.cwd();
          // console.log("🚀 ~ id:", id);
          // e.g.:
          // 🚀 ~ id: /data/home/zndkqiu/learn/2026-Job/proj/react/2-basic/index.html
          // 🚀 ~ id: /data/home/zndkqiu/learn/2026-Job/proj/react/2-basic/node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react.production.js
          // 🚀 ~ id: /data/home/zndkqiu/learn/2026-Job/proj/react/2-basic/src/demo/8-customHook.tsx

          // 过滤出 src 目录下的模块
          if (id.includes(`${cwd}/src`)) {
            const paths = id.split(`${cwd}/src`)[1].split('/')
            // console.log("🚀 ~ paths:", paths);
            const pathId = paths.at(-1)?.split('.')[0]
            return pathId
          }

          // 过滤出 node_modules 目录下的模块
          if (id.includes('node_modules')) {
            // 过滤出 react 相关的模块(react, react-dom)
            if (id.includes('react')) {
              return 'react'
            }
            // 其他的模块(如: axios, lodash 等)
            return 'vendor'
          }

          // 不 return，让 Rollup 自己处理虚拟模块('vite' 开头的模块等)
        }
      }
    }
  }
})
