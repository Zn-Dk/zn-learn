import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'node:path';
// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),
    VitePWA({
      /** 使用的资源文件夹 */
      srcDir: 'public',
      outDir: 'dist',
      /** 基本信息 */
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#f90',
        icons: [
          //添加图标，注意路径(从 srcDir 开始)和图像像素正确
          {
            src: 'app_icon_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'app_icon_512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // 缓存相关静态资源
        runtimeCaching: [
          /*

          如果要针对特定业务/拓展名配置单独的缓存策略 globPatterns 可以不写, 可以按如下配置

            {
                urlPattern: ({ url }) => url.origin === 'https://app-api.id',
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'my-app-cache-api',
                  cacheableResponse: {
                    statuses: [200]
                  }
                }
              },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'my-app-cache-images',
                expiration: {
                  // 最多30个图
                  maxEntries: 30
                }
              }
            },
          */
          {
            //测试API， 这里配置缓存访问第三方API的资源
            // 缓存模式 'CacheFirst' | 'CacheOnly' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate';
            handler: 'CacheFirst',
            urlPattern: /^https:\/\/jsonplaceholder/, //注意，要修改成要测试的API。请使用正则表达式匹配
            method: 'GET',
            options: {
              cacheName: 'test-external-api', // 创建缓存名称
              expiration: {
                maxEntries: 10, // 最多缓存数，超过的按照LRU原则删除
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 最大缓存时间 365 days
              },
              cacheableResponse: {
                statuses: [0, 200], // <== 这里设置要符合的状态码
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
