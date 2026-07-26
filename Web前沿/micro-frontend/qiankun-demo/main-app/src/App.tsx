import { useState, useEffect } from 'react'

/**
 * qiankun 基座 UI
 * 最简模式：使用 history.pushState 导航 + registerMicroApps 路由自动调度
 */
function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 订阅 qiankun 全局状态变化，同步子应用的 count 到主应用
    const globalApi = (window as any).__QIANKUN_GLOBAL__
    if (globalApi) {
      globalApi.onGlobalStateChange((state: any) => {
        if (state.count !== undefined) {
          setCount(state.count)
        }
      })
    }
  }, [])

  // 使用 history.pushState 导航，qiankun 会自动监听路由变化并加载对应子应用
  const navigateTo = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    window.history.pushState(null, '', path)
    // 手动触发 popstate，让 qiankun（基于 single-spa）感知路由变化
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div>
      <header style={{ background: 'royalblue', color: 'white', padding: '12px 20px' }}>
        <h2 style={{ margin: 0 }}>Qiankun 基座应用</h2>
        <nav style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
          <a
            href="/"
            onClick={navigateTo('/')}
            style={{ color: 'white' }}
          >
            首页
          </a>
          <a
            href="/vanilla"
            onClick={navigateTo('/vanilla')}
            style={{ color: 'white' }}
          >
            Vanilla 子应用
          </a>
          <a
            href="/vue"
            onClick={navigateTo('/vue')}
            style={{ color: 'white' }}
          >
            Vue 子应用
          </a>
        </nav>
        {/* 展示从子应用同步过来的 count */}
        <p style={{ margin: '8px 0 0', fontSize: '16px' }}>
          📡 主应用同步的 Count：<strong>{count}</strong>
        </p>
      </header>

      <main style={{ padding: '20px' }}>
        <p>↓ 子应用挂载容器 ↓</p>
        {/* 子应用挂载容器：registerMicroApps 中配置的 container */}
        <div id="sub-app-container"></div>
      </main>
    </div>
  )
}

export default App
