import Progress from '@/02-router/components/02导航守卫/ProgressBar.vue'
import { createVNode, render } from 'vue'

// 渲染VNode 到 body 后导出 在 router 内导入
const VNode = createVNode(Progress, { height: 3 })

render(VNode, document.body)

type Progress = {
  start: () => void
  end: () => void
}

export default VNode?.component?.exposed as Progress
