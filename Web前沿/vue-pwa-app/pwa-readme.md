# vue-pwa-app

## 配置 PWA 插件

```sh
    pnpm i vite-plugin-pwa -D
```

具体配置见 `vite.config.ts`

## PWA 效果测试

- 运行 build 对 App 进行打包
- Live Server / 手机 Chrome,Edge 浏览器访问页面时 可以看到地址栏右侧或者手机内 message 提示安装应用
- 在安装应用的信息中就可以查看 manifest 清单配置的效果 包括 图标 软件名称
- Enjoy and Experience the modern like PWA tech to transfer your WebPage into an actual App.

## PWA + Service Worker 缓存机制

> 缓存配置见 插件配置项 ：
> （1）urlPattern: 通过正则，字符或者函数形式匹配要缓存的资源类型 
> （2）cacheName: 自定义缓存的类型名称 
> （3）cacheableResponse: 缓存状态码正确的资源，比如 200 的 
> （4）expiration: 设置缓存的时间，数量。超过数量就删除之前的 
> （5）method: 默认是缓存 get 请求的资源，想缓存 post 的可以配置 
> （6）handler: 取缓存的策略，有五种
>
> - NetworkFirst：网络优先 
> - CacheFirst：缓存优先 
> - NetworkOnly：仅使用正常的网络请求 
> - CacheOnly：仅使用缓存中的资源 
> - StaleWhileRevalidate：从缓存中读取资源的同时发送网络请求更新本地缓存 
>
> 常用 推荐 NetworkFirst

- 脱机时我们可以看到通过 Service Worker 缓存了 Vue 组件
- 在 Test Api 这个页面, 我们可以在联机时访问获得数据, Service Worker 会缓存到本地
- 下一次脱机时 Service Worker 就会将之前的结果缓存返回给用户
- 更有意思的是，这个缓存机制在手机上运用后（安装PWA应用），手机离线也可以预览之前缓存的资源了
