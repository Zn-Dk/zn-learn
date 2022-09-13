<template>
  <Test msg="Hello 我是张三" name="张三" :age="13" @sayHi="sayHi">
    <!-- 默认插槽 只能是普通标签 不能是 template -->
    <div>默认插槽的内容</div>

    <!-- 具名插槽 使用 v-slot: / # 号 -->
    <template #foo>
      <p>我是foo插槽</p>
    </template>

    <template #sc="data">
      <div>
        {{ data.test }}
      </div>
    </template>
  </Test>
</template>

<script>
import Test from './components/test.vue'
export default {
  components: { Test },
  setup() {
    // 定义一个自定义事件 say-hi 待子组件触发

    function sayHi(msg) {
      alert(msg)
    }

    return { sayHi }
  },
}
</script>

<style lang="stylus"></style>
