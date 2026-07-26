import type { Plugin } from 'vite'


export type Option = {
  customModules: Record<string, string>
}

const DEFAULT_OPTIONS: Option = {
  customModules: {
    'virtual:module': 'export const hello = "hello virtual module"'
  },
}

// 虚拟模块插件
const vitePluginVirtualModule = (pluginOptions: Option = DEFAULT_OPTIONS): Plugin => {
  return {
    name: 'vite-plugin-virtual-module',
    // 
    options(this, options) {
      console.log('/// ===== vite-plugin-virtual-module [hooks:buildStart]')

      console.log("🚀 ~ vitePluginVirtualModule ~ options:", options);
    },
    // 插件在构建开始时调用
    buildStart(this, options) {
      console.log('/// ===== vite-plugin-virtual-module [hooks:buildStart]')
      // console.log("🚀 ~ vitePluginVirtualModule ~ options.input:", options.input);
      // options.config
      // options.fs
      // options.jsx('react-jsx')
      // options.cache
    },
    // resolveId, load 和 transform 都是在 vite
    // 接收传入的模块请求时调用的钩子函数
    resolveId(id) {
      // 这里的 id 是导入的模块名或路径
      if (id in pluginOptions.customModules) {
        return id
      }
    },
    load(id) {
      // console.log("🚀 ~ vitePluginVirtualModule ~ id:", id);
      if (id in pluginOptions.customModules) {
        return pluginOptions.customModules[id]
      }
    },
  }
}
export default vitePluginVirtualModule