import type { Plugin } from "vite"





const vitePluginTransformHtml = (env: Record<string,string>): Plugin => {
  return {
        name: 'vite-plugin-mockApi',
        configServer(server, config, env) {
          server.middlewares.use((req, res, next) => {
            // req.url = '/api/users'
            // res.end(JSON.stringify({ users: [] }))
          })
        },
  }
}

export default vitePluginTransformHtml