<template>
  <div
    v-show="visible"
    class="alert"
    :style="currentStyle"
  >
    {{ props.text }}
    <span
      @click="onClose"
      class="close-btn"
    >
      X
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { SizeType, ThemeType } from './type'

const sizeMap = {
  big: 32,
  normal: 24,
  small: 16,
}

const themeMap = {
  default: '#66dddd',
  warning: '#f90',
  error: '#f33',
  success: '#3f3',
}

const currentStyle = computed(() => ({
  fontSize: `${props.size}px`,
  width: `${10 * sizeMap[props.size]}px`,
  height: `${6 * sizeMap[props.size]}px`,
  backgroundColor: themeMap[props.theme],
}))

const props = withDefaults(
  defineProps<{
    visible: boolean
    theme?: ThemeType
    size?: SizeType
    text?: string
  }>(),
  {
    theme: 'default',
    size: 'normal',
    text: '默认文字',
  },
)

const inst = ref<ComponentInternalInstance>();
onMounted(() => {
  console.log('mount')
  inst.value = getCurrentInstance()

  console.log(inst)
})

const onClose = () => {
  inst.value.vnode.el.remove();
}
onUnmounted(() => {
  console.log(123)

  document.removeChild(document.querySelector('alert-wrap'))
})
</script>

<style scoped lang="scss">
.alert {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 0 2px 6px #ccc;
  font-weight: bold;
  color: #fff;
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
