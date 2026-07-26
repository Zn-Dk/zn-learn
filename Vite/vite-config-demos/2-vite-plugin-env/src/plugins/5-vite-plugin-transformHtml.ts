import type { Plugin } from "vite"


const vitePluginTransformHtml = (env: Record<string,string>): Plugin => {
  return {
        name: 'vite-plugin-transformHtml',
        // apply: 'build', // build 仅在构建时应用
        // apply: (config, { command }) => {
        //   return command === 'build'
        // }

        // transformIndexHtml,
        // 默认情况下 order 是 undefined，这个钩子会在 HTML 被转换后应用。为了注入一个应该通过 Vite 插件管道的脚本，
        // order: 'pre' 指将在处理 HTML 之前应用。
        // order: 'post' 是在所有未定义的 order 的钩子函数被应用后才应用。
        // 比如这个插件使用了 ejs 的 template, 则需要让插件提前于其他插件处理 HTML。

        transformIndexHtml: {
            order: 'pre',
            handler(html, ctx) {
            // ctx: IndexHtmlTransformContext, which contains:
            // path: public path when served
            // filename: filename on disk
            // server?: ViteDevServer (only present during serve)
            // bundle?: rollup.OutputBundle (only present during build)
            // chunk?: rollup.OutputChunk
            // originalUrl?: string

            // 编译是在 nodejs 环境下, 故可以使用 process.env 而不是 import.meta.env
            // console.log("🚀 ~ process.env.NODE_ENV:", process.env.NODE_ENV); // 可以获取到
            // console.log("🚀 ~ process.env:", process.env); // 可以获取到
            // console.log(import.meta.env, 'html') // undefined

            // 默认可以使用 %% 语法, 如 %MODE%
            // 但是只能使用 import.meta.env 中的变量,
            // 若要使用自定义的变量(loadEnv 拓展), 则我们需要自行实现替换
            // 自定义的替换规则
            let newHtml = html
              .replace('{{ENV}}', process.env.NODE_ENV || 'unknown')

            for (const key in env) {
              newHtml = newHtml.replace(`%${key}%`, env[key])
            }

            return newHtml
          }
        }
  }
}

export default vitePluginTransformHtml