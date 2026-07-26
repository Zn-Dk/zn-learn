import { defineConfig, loadEnv } from 'vite'
import vitePluginEmoji from './src/plugins/1-vite-plugin-emoji'
import vitePluginVirtualModule from './src/plugins/2-vite-plugin-virtual-module'
import vitePluginMiddleware from './src/plugins/3-vite-plugin-middleware'
import vitePluginAlias from './src/plugins/4-vite-plugin-alias'
import vitePluginTransformHtml from './src/plugins/5-vite-plugin-transformHtml'
import { mockApiConfig } from './src/mock'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log("🚀 ~ defineConfig mode:", mode);
  // mode = 'development' | 'production'
  if (mode === 'development') {
    // 开发环境下的配置
  }
  else if (mode === 'production') {
    // 生产环境下的配置
  }
  // 自定义 mode:
  // vite build --mode [your_mode_name]
  // 自定义 mode 下的配置
  else if (mode === 'release') {
    // 预发布环境下的配置
  }

  // Vite 使用 dotenv 从你的 环境目录 中的下列文件加载额外的环境变量：
  // env 加载原则:
  // .env                # 所有情况下都会加载
  // .env.local          # 所有情况下都会加载，但会被 git 忽略
  // .env.[mode]         # 只在指定模式下加载
  // .env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
  // 根据mode决定使用 .env.development / .env.production
  // 同名变量, dev/prod环境下的变量会覆盖 .env 中的变量
  const env = loadEnv(
    mode,
    process.cwd(),
    // 默认加载 VITE_ 开头的变量
    // 可以通过第三个参数指定其他前缀的变量
    ['VITE_', 'FOO_']
  )

  // console.log("🚀 ~ defineConfig env:", env);
  // console.log("🚀 ~ process.env:", process.env);

  return {
    plugins: [
      // vite 常用的插件 hooks
      {
        name: 'vite-plugin-hooks-test',
        // 1. config 配置阶段
        // 参数: config 读取用户的 vite.config.ts 配置
        // env 环境变量
        config(config, env) {
          console.log('config')
        },
        // 2. configResolved 配置解析完成
        // 参数: resolvedConfig 解析后的配置(包含默认值)
        configResolved(resolvedConfig) {
          console.log('configResolved')
        },
        // 3. buildStart 构建开始(DEV 也会用)
        // 同样的 还有 resolveId, load
        buildStart() {
          console.log('buildStart')
        },
        // 4. transform 转换
        // 参数: code 代码
        // id 文件路径
        transform(code, id) {
          console.log('transform')
        },
        // 5. transformIndexHtml 转换 html
        transformIndexHtml() {
          console.log('transformIndexHtml')
        },
        // 6. buildEnd 构建结束
        buildEnd() {
          console.log('buildEnd')
        },
        // 7. closeBundle 关闭 bundle
        closeBundle() {
          console.log('closeBundle')
        },
        // 8. configServer 配置开发服务器 拦截请求
        configServer(server, config, env) {
          console.log('configServer')
        },
      },

      vitePluginEmoji({
        customEmojiMap: {
          ':thumbs_up:': '👍',
          ':heart:': '❤️',
        },
      }),
      vitePluginVirtualModule({
        customModules: {
          'virtual:module2': `export default function () {
            console.log('hello virtual:module2')
        }`,
        },
      }),
      vitePluginMiddleware([
        (req, res, next) => {
          // if (req.url === '/') {
          //   res.end('<h1>You have been intercepted by vite-plugin-middleware</h1>')
          //   return;
          // }
          next()
        },
        (req, res, next) => {
          const { url } = req
          // 模拟 vite-mock 插件的逻辑
          if (url && url in mockApiConfig) {
            res.end(JSON.stringify(mockApiConfig[url].response()))
          } else {
            next()
          }
        },
      ]),
      vitePluginTransformHtml(env),
      vitePluginAlias({
        aliasPrefix: '@',
        srcDir: 'src',
      }),
    ],
  }
})
