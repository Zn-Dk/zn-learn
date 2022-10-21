// 自定义hook内同样的使用 setup 定义逻辑行为
import { onMounted, onUnmounted, reactive } from 'vue'

// 导出一个函数 返回最终需要的目标数据
// 也可以传入参数 让函数根据参数做预期的事情
export default function (selector) {
  if (typeof selector !== 'string') return
  console.log(selector)
  const coord = reactive({
    x: 0,
    y: 0,
  })

  // 节流
  function throttle(fn, delay) {
    let timer
    return function () {
      if (timer) return false
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, delay)
    }
  }

  // 获取坐标
  function getCoord(e) {
    coord.x = e.pageX
    coord.y = e.pageY
  }

  // 钩子
  onMounted(() => {
    document.querySelector(selector).addEventListener('mousemove', throttle(getCoord, 30))
  })
  onUnmounted(() => {
    document.querySelector(selector).removeEventListener('mousemove', throttle(getCoord, 30))
  })
  return { coord }
}
