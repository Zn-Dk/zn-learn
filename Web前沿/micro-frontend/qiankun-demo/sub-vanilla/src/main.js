import { setupCounter } from './counter.js'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

// 获取挂载节点
function getContainer(props) {
  return props?.container
    ? props.container.querySelector('#root')
    : document.querySelector('#root')
}

function render(props) {
  const container = getContainer(props)
  if (!container) {
    console.error('vanilla 子应用: 找不到挂载节点 #root')
    return
  }
  console.log('🚀 ~ vanilla render ~ container:', container)

  container.innerHTML = `
<section id="center">
  <div>
    <h1>Vanilla 子应用</h1>
    <p>Edit <code>src/main.js</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>
`
  setupCounter(container.querySelector('#counter'))
}

// 使用 vite-plugin-qiankun 提供的 renderWithQiankun 注册生命周期
renderWithQiankun({
  bootstrap() {
    console.log('VanillaJS 子应用 bootstrap')
  },
  mount(props) {
    console.log('VanillaJS 子应用 mount，收到 props：', props)
    // 动态导入样式，确保在 qiankun 沙箱环境中加载
    import('./style.css')
    render(props)
  },
  unmount(props) {
    console.log('VanillaJS 子应用 unmount')
    // 清理 DOM 内容
    const container = getContainer(props)
    if (container) {
      container.innerHTML = ''
    }
  },
  update(props) {
    console.log('VanillaJS 子应用 update', props)
  },
})

// 独立运行时直接渲染
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  import('./style.css')
  render()
}
