<template>
  <!--  teleport to=移动到的元素目标 一般移动到 body根元素 -->
  <!-- <teleport to="#test">  传送到Father组件下的 #test -->
  <!-- to 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。 -->

  <!-- 属性 disabled 为 true 时 teleport失效, 故可以利用这个属性动态的决定是否teleport -->
  <Teleport :disabled="false" to="body">
    <transition name="dialog">
      <div class="dialog-mask" v-if="isShow">
        <div class="dialog">
          <h3>我是弹窗</h3>
          <button @click="$emit('close')">点我关闭</button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
// teleport 传送

// 传送 可以将 组件迅速移动到指定位置 ( 一般是 body )
// 用在对话框 toast dialog modal 最常用

// 不能传送到自己的模板里 cannot be rendered by the component itself,
// 理想状态下应该是Vue组件外(静态DOM部分) and ideally should be outside of the entire Vue component tree.
// <Teleport> 挂载时，传送的 to 目标必须已经存在于 DOM 中。
// 如果目标元素也是由 Vue 渲染的，你需要确保在挂载 <Teleport> 之前先挂载该元素。
export default {
  emits: ['close'],
  props: { isShow: Boolean },
  setup() { },
}
</script>

<style>
.dialog-mask,
.dialog {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.dialog-mask {
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.3s ease;
}

.dialog {
  width: 300px;
  height: 300px;
  color: #393939;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  transition: 0.3s ease;
}

.dialog h3 {
  font-size: 24px;
}

/* transition */

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
}

.dialog-enter-from .dialog,
.dialog-leave-to .dialog {
  transform: scale(1.1);
}
</style>
