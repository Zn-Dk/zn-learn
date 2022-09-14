<template>
  <h2>自定义钩子实现对一系列行为的封装 类似Mixin</h2>
  <br />
  <h3>获取鼠标坐标</h3>

  <div class="mouse-point"></div>
  <p>当前坐标: X {{ coord.x }} | Y {{ coord.y }}</p>
</template>

<script>
// 自定义 hook 一般以 use.. 开头

import useMouseCoord from './hooks/useMouseCoord'
export default {
  setup() {
    // 只需要引入 然后执行函数拿到函数的返回值
    // 类似 mixin
    const { coord } = useMouseCoord('test')
    /*

    将整个业务代码抽离到单独的文件中 (业务逻辑清晰 方便修改)
   const coord = reactive({
      x: 0,
      y: 0,
    })

    function throttle(fn, interval) {
      let timer
      return function () {
        if (timer) return false
        timer = setTimeout(() => {
          fn(...arguments)
          timer = null
        }, interval)
      }
    }
    function getCoord(e) {
      coord.x = e.pageX
      coord.y = e.pageY
      console.log(123)
    }
    onMounted(() => {
      document.querySelector('.mouse-point').addEventListener('mousemove', throttle(getCoord, 30))
    })
    onUnmounted(() => {
      document
        .querySelector('.mouse-point')
        .removeEventListener('mousemove', throttle(getCoord, 30))
    })
    return { coord }
    */

    return { coord }
  },
}
</script>

<style>
.mouse-point {
  width: 300px;
  height: 300px;
  border: 1px solid pink;
}
</style>
