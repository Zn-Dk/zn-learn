<template>
  <div>测试 alert 函数式调用渲染</div>
  <div>
    <label for="">挂载节点</label>
    <input
      type="text"
      v-model="curContainer"
      placeholder="body"
    />
  </div>
  <div>
    <label for="">主题</label>
    <select
      type="text"
      v-model="curTheme"
      placeholder="success/warning/error/default"
    >
      <option value="success">success</option>
      <option value="warning">warning</option>
      <option value="error">error</option>
      <option value="default">default</option>
    </select>
  </div>
  <div>
    <label for="">文字</label>
    <input
      type="text"
      v-model="curText"
    />
  </div>
  <div>
    <label for="">尺寸</label>
    <select
      type="text"
      v-model="curSize"
      placeholder="big/small/normal"
    >
      <option value="big">big</option>
      <option value="small">small</option>
      <option value="normal">normal</option>
    </select>
  </div>
  <button @click="makeAlert">makeAlert!</button>
  <div class="wrap">
    <div class="box box1">.box1</div>
    <div class="box box2">.box2</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import alert from './alert'
import { SizeType, ThemeType } from './alert/type';

const curContainer = ref()
const curSize = ref<SizeType>('normal')
const curText = ref()
const curTheme = ref<ThemeType>('default')

const makeAlert = () => {
  alert(
    {
      visible: true,
      theme: curTheme.value,
      text: curText.value,
      size: curSize.value,
    },
    curContainer?.value,
  )
}
</script>

<style scoped lang="scss">
.wrap {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  .box {
    width: 300px;
    height: 400px;
    border: 1px solid #000;
  }
}
</style>
