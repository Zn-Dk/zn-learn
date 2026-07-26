import type { Plugin } from 'vite'

const defaultEmojiMap: Record<string, string> = {
  ':smile:': '😄',
  ':joy:': '😂',
  ':cry:': '😭',
}


// 最基础的插件, 可使用 vite 导出的类型标注 Plugin
// 允许接收自定义配置
export type EmojiOption = {
  customEmojiMap?: Record<string, string>
  /** 要处理的文件扩展名 */
  include?: RegExp
}

const DEFAULT_OPTIONS: Required<EmojiOption> = {
  customEmojiMap: {},
  include: /\.(tsx?|jsx?)(\?.*)?$/,
}

// 将 emoji 标注替换为对应的 emoji 字符
const vitePluginEmoji = (options: EmojiOption = DEFAULT_OPTIONS): Plugin => {
  // 要处理的文件拓展名, 支持自定义
  const include = options.include || DEFAULT_OPTIONS.include;

  const emojiMap = { ...defaultEmojiMap, ...options.customEmojiMap }
  const emojiRegexMap: Record<string, RegExp> = Object.fromEntries(
    Object.keys(emojiMap).map((key) => [key, new RegExp(key, 'gi')]),
  )

  // ✅ 优化点: 假如 emoji > 500 个, 匹配文件也有很多时, 可以将所有 key 合并成一个正则，一次扫描完成所有替换
  // const combinedRegex = new RegExp(
  //   Object.keys(emojiMap).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  //   'gi'
  // )
  // transform 中：
  // transform(code, id) {
  //   if (!include.test(id)) return null
  //   const result = code.replace(combinedRegex, (match) => emojiMap[match.toLowerCase()] ?? match)
  //   return result === code ? null : result
  // }

  return {
    // 插件名称
    name: 'vite-plugin-emoji',
    // 插件的 transform  hooks
    // code 是文件的原始内容
    // id 是文件的绝对路径
    transform(code, id) {
      // console.log('id: ', id);
      // id:  /data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin/src/main.tsx
      // id:  /data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=f4f7516d
      // id:  /data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin/src/emoji.tsx
      // id:  /data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin/node_modules/.vite/deps/chunk-P3M25OXZ.js?v=f4f7516d
      // id:  /data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin/node_modules/.vite/deps/react-dom_client.js?v=f4f7516d
      // id:  /data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin/node_modules/.pnpm/vite@7.3.1_@types+node@22.19.12/node_modules/vite/dist/client/client.mjs
      // id:  /data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin/node_modules/.pnpm/vite@7.3.1_@types+node@22.19.12/node_modules/vite/dist/client/env.mjs

      // console.log(
      //   '\n===== transform =====\n',
      //   id,
      //   '\n===== id =====\n',
      //   code,
      //   '\n===== code =====\n',
      // )

      if (!include.test(id)) return null // 代表不处理文件

      Object.keys(emojiMap).forEach((key) => {
        code = code.replace(emojiRegexMap[key], emojiMap[key])
      })

      // return code
      // 对象形式, 可以提供更多信息
      return {
        code,
        map: null, // 提供 source map 信息
      }
    }
  }
}
export default vitePluginEmoji