<template>
  <div class="progress-wrap">
    <div class="progress-bar" ref="progress"></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

let barHeight = ref('5px')

const progress = ref<HTMLElement>()
let timer = 0

const percent = ref(0)
const start = () => {
  progress.value.classList.remove('end')
  // requestAnimationFrame
  // 需要传递一个具名函数 然后递归调用(记得终止)
  // 返回一个id 需要有一个变量接收
  // 递归需要传递函数
  timer = window.requestAnimationFrame(function load() {
    if (percent.value < 90) {
      percent.value += 1
      progress.value.style.width = percent.value + '%'
      // 递归调用
      timer = window.requestAnimationFrame(load)
    } else {
      // 取消动画 cancelAnimationFrame 传递相关 id
      window.cancelAnimationFrame(timer)
    }
  })
}

const end = () => {
  percent.value = 100
  progress.value.style.width = percent.value + '%'
  setTimeout(() => {
    window.requestAnimationFrame(() => {
      percent.value = 0
      progress.value.style.width = percent.value + '%'
      progress.value.classList.add('end')
    })
  }, 500)
}

// onMounted(() => {
//   start()
//   setTimeout(() => {
//     end()
//   }, 2000)
// })

// 暴露方法
defineExpose({
  start,
  end
})

</script>

<style lang="scss">
.progress-wrap {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: v-bind(barHeight);

  .progress-bar {
    position: absolute;
    width: 0;
    background-color: aquamarine;
    height: inherit;
    box-shadow: 0 3px 6px #ccc;
    transition: .3s;
  }

  .end {
    right: 0;
  }
}
</style>