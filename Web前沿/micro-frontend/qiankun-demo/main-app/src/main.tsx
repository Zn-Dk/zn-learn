import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { registerMicroApps, start, initGlobalState } from 'qiankun'

// 1. 先渲染基座自身
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// 2. 注册子应用（路由自动调度模式：一个路由对应一个子应用）
registerMicroApps(
  [
    {
      name: 'sub-vanilla',
      entry: '//localhost:3003', // HTML Entry：子应用的开发服务器地址
      container: '#sub-app-container', // 子应用挂载的 DOM 容器
      activeRule: '/vanilla', // 路由匹配规则,
    },
    {
      name: 'sub-vue',
      entry: '//localhost:3002',
      container: '#sub-app-container',
      activeRule: '/vue',
      props: {
        initCount: 123,
      },
    },
  ],
  {
    // 全局生命周期钩子（可选，用于观察子应用加载流程）
    beforeLoad: [async app => console.log('[qiankun] beforeLoad', app.name)],
    beforeMount: [async app => console.log('[qiankun] beforeMount', app.name)],
    afterMount: [async app => console.log('[qiankun] afterMount', app.name)],
    afterUnmount: [async app => console.log('[qiankun] afterUnmount', app.name)],
  },
)

// 3. 全局状态通信
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'admin',
  theme: 'dark',
  count: 0, // 用于演示子应用 → 主应用的状态同步
})

onGlobalStateChange((state, prev) => {
  console.log('[qiankun] 主应用监听到状态变化：', state, prev)
})

// 暴露给 React 组件使用（通过 window 传递，避免模块循环依赖）
;(window as any).__QIANKUN_GLOBAL__ = { onGlobalStateChange, setGlobalState }

// 修改状态（子应用可通过 props.onGlobalStateChange 监听）
setGlobalState({ theme: 'light' })

// 4. 启动 qiankun
start({
  prefetch: 'all', // 预加载所有子应用资源
  sandbox: {
    experimentalStyleIsolation: true, // 开启 Scoped CSS 隔离
  },
})
