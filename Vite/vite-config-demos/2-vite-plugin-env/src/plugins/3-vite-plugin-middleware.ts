import type { Connect, Plugin } from 'vite'


const report = (req: Connect.IncomingMessage) => {
  console.log('上报成功: ', Date.now(), req.url)
}

// 开发服务器中间件插件
const vitePluginMiddleware = (middlewares?: Connect.NextHandleFunction[]): Plugin => {
  return {
    name: 'vite-plugin-middleware',
    configureServer(server) {
      //  配置开发服务器中间件

      middlewares?.forEach((middleware) => {
        server.middlewares.use(middleware)
      })

      // Can be used to attach custom middlewares to the dev server.
      // Can also be used as the handler function of a custom http server or as a middleware in any connect-style Node.js frameworks
      server.middlewares.use((req, res, next) => {
        // 访问 /report 时打印日志, 上报...
        if (req.url === '/report') {
          // 获取参数
          report(req)
        }
        next()
      })
    }
  }
}
export default vitePluginMiddleware
