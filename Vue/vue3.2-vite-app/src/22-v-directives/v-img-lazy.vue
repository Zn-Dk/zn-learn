<script setup lang="ts">
import { ref, Directive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
const imgSrc = 'https://pica.zhimg.com/v2-9cf13b7bec593b48edf43df85480631e_r.jpg?source=1940ef5c'
// 图片懒加载 v-img-lazy="src"
const imgList = ref([
  {
    src: imgSrc,
    visible: false,
    hasShow: false,
  },
  {
    src: imgSrc,
    visible: false,
    hasShow: false,
  },
  {
    src: imgSrc,
    visible: false,
    hasShow: false,
  },
  {
    src: imgSrc,
    visible: false,
    hasShow: false,
  },
])

// 搭配 vueUse - use
const vImgLazy: Directive = {
  mounted(el: HTMLImageElement, binding) {
    const { src, idx } = binding.value;

    // 返回一个 stop 方法以停止监听
    const { stop } = useIntersectionObserver(
      el, // 监听目标 img 标签
      ([{ isIntersecting }], observerElement) => {
        // isIntersecting 是否视图可见
        imgList.value[idx].visible = isIntersecting;
        console.log(src,idx,isIntersecting);

        // 初次赋值
        if (isIntersecting && !imgList.value[idx].hasShow) {
          imgList.value[idx].hasShow = true;
          el.src = src;
          // stop();
        }
      },
    )
  },
  // ...
}
</script>

<!-- 希望在全局中应用 请参阅 ./directives/focus.ts 和 src/main.ts -->

<template>
  <div class="sticker">
    当前图片列表:
    <div v-for="(item, idx) in imgList"> {{ idx }} 号图片: {{ item.visible ? '可见' : '不可见' }}</div>
  </div>
  <div class="box">v-img-lazy 图片懒加载</div>
  <div class="img-list">
    <img
        v-for="(item, idx) in imgList"
        v-img-lazy="{src: item.src, idx}"
        :class="item.hasShow ? 'active' : ''"
    >
  </div>
</template>

<style>
.sticker {
  position: fixed;
  top: 20px;
  background-color: #fff;
  border: 2px solid;
}

.box {
  margin-top: 50px;
  height: 1000px;
  font-size: 32px;
  border: 2px solid;
}

img {
  margin-top: 40px;
  width: 600px;
  height: 400px;
  border: 1px solid red;
}

.active {
  animation: fadeIn 1s 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;

  }

  to {
    opacity: 1;
  }
}
</style>
