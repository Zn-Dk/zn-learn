import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        // 启用实验性 props 解构
        propsDestructure: true,
        // 启用 defineModel
        defineModel: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pub': path.resolve(__dirname, './public'),
    },
  },
});
