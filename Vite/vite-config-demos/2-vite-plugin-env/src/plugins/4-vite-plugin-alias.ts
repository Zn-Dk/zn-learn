import path from 'path'
import * as fs from 'node:fs/promises';
import type { Plugin } from 'vite'

const resolveFolderAlias = async (base: string, aliasPrefix: string) => {
  const dirInfo = await fs.readdir(base, { withFileTypes: true /** 追加信息, 可以少一次 fs.stat调用 */ })
  const dirFolders = dirInfo.filter(item => item.isDirectory())

  return Object.fromEntries(dirFolders.map(folder => [
    `${aliasPrefix}${folder.name}`,
    path.resolve(base, folder.name),
  ]))
}

/** 自动读取项目 src 结构 生成 alias 配置 */
const vitePluginAlias = ({
  aliasPrefix = '@',
  srcDir = 'src',
} = {}): Plugin => {
  return {
    name: 'vite-plugin-my-alias',
    /** config 参数 - 当前用户的配置 */
    async config(config, env) {
      const base = config.root ? path.resolve(config.root) : process.cwd();
      const srcDirPath = path.resolve(base, srcDir)
      const resolvedAlias = await resolveFolderAlias(srcDirPath, aliasPrefix)
      //   '@assets': '/data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin-env/src/assets',
      //   '@components': '/data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin-env/src/components',
      //   '@hooks': '/data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin-env/src/hooks',
      //   '@plugins': '/data/home/zndkqiu/learn/2026-Job/proj/devops/vite/2-vite-plugin-env/src/plugins'

      // 返回的配置会合并到用户的配置中
      return {
        resolve: {
          alias: {
            ...resolvedAlias,
          }
        }
      }
    }
  }
}

export default vitePluginAlias