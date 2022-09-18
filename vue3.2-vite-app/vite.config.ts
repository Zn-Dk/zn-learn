import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 自动引入 api
// import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    vue(),
    // AutoImport({
    //   // 指定 vue 自动化导入 api (无需 import)
    //   imports: ['vue'],
    //   // 创建声明文件的目录(否则生成在根目录下)
    //   dts: 'src/auto-import.d.ts',
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
