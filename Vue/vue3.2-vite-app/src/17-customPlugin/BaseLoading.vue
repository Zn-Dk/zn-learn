<template>
  <div class="loading-wrap">
    <div class="loading" :class="{'show':isShow}">
      <p>正在加载...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let isShow = ref(false)

const show = () => {
  isShow.value = true
  setTimeout(() => {
    isShow.value = false
  }, 2000)
}

defineExpose({
  show,
  isShow
})

</script>

<style lang="scss">
.loading-wrap {
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  pointer-events: none;
  align-items: center;
  justify-content: center;
}

.loading {
  display: flex;
  opacity: 0;
  width: 300px;
  left: 50%;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #f1f1f1;
  background-color: #666;
  box-shadow: 0 2px 6px #333;
  transition: all .3s;
}

.show {
  opacity: 1;
}
</style>