// Pinia 插件是一个函数，可以选择返回要添加到 store 的属性。
// 它需要一个可选参数，一个 context：
import { PiniaPluginContext, Store } from 'pinia'

// 兜底KEY
const DEFAULT_KEY = '__PINIA__'

// 设置存储
const setStorage = (type = 'localStorage', key = DEFAULT_KEY, value: any) => {
  let stor: Storage
  stor = window[type]
  value = typeof value === 'object' ? JSON.stringify(value) : value
  stor && stor.setItem(key, value)
}

// 获取存储
const getStorage = (type = 'localStorage', key = DEFAULT_KEY) => {
  let stor: Storage
  stor = window[type]
  if (stor) {
    return stor.getItem(key) ? JSON.parse(stor.getItem(key)) : {}
  }
}

// 状态持久化插件实现
// 函数柯里化返回给 pinia.use
interface Options {
  type?: 'localStorage' | 'sessionStorage'
  customPrefix?: string
}
export default function (options: Options) {
  return (ctx: PiniaPluginContext) => {
    // context.pinia // 使用 `createPinia()` 创建的 pinia
    // context.app // 使用 `createApp()` 创建的当前应用程序（仅限 Vue 3）
    // context.store // 插件正在扩充的 store
    // context.options // 定义存储的选项对象传递给`defineStore()`
    // console.log(context, 'ctx')
    const store = ctx.store

    // id Prefix-storeId 形式
    const id = `${options?.customPrefix ?? DEFAULT_KEY}-${store.$id}`
    // 每次重载前 尝试获取 store
    const data = getStorage(options.type, id)

    // 全局订阅所有store 如果发生改变 则存储
    // Storage key 使用 store.$id / mutation.storeId
    store.$subscribe((mutation, state) => {
      setStorage(options.type, id, state)
    })

    // 返回存储状态 覆盖原始值
    return {
      ...data,
    }
  }
}
