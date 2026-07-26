import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'
// https://vite.dev/config/

export default defineConfig({
  // 参数为子应用名称，必须与基座 registerMicroApps 中的 name 一致
  plugins: [
    qiankun('sub-vanilla', {
      useDevMode: true, // 开发模式下启用，确保 HMR 正常
    }),
  ],
  server: {
    port: 3003,
    // 关键：允许跨域，基座需要 fetch 子应用的 HTML
    cors: true,
    // 关键：指定 origin，确保资源路径正确
    origin: 'http://localhost:3003',
  },
})
