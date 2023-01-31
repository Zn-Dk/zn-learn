<template>
  <h1>个人信息</h1>
  <h3>姓名: {{ name }}</h3>
  <h3>年龄: {{ age }}</h3>
  <h3>签名: {{ msg }}</h3>
  <slot>Default</slot>
  <slot name="foo">我是插槽</slot>
  <slot name="sc" :test="list">我是作用域插槽</slot>

  <button @click="emitParent">点击给父组件发消息</button>
</template>

<script>
export default {
  // 还是一样通过props 接收,
  props: {
    name: String,
    msg: String,
    age: Number,
  },

  // 现在引入了 emits 数组作为事件的接收(更加严谨,如果不接收会报 warning 提示)
  emits: ['sayHi'],

  setup(props, context) {
    // console.log(props, context)
    // props 对象，包含：父组件传递，且组件内部使用 props 声明接收了的属性。
    // context 上下文 内含
    // attrs => $attrs 待接收的属性
    // slots => $slots 待接收的插槽
    // emit => 自定义事件 相当于 $emit(eventName,context)

    console.log(props.name) // 打印张三, 因为没有 this , 所以通过这种方式获取

    console.log(context.attrs, 'attrs') // 打印 $attrs

    console.log(context.slots, 'slots') // 打印所有插槽

    function emitParent() {
      // 通过 context 触发父组件的 sayHi 事件 并传递上下文
      context.emit('sayHi', '你好,我是子组件 给父组件发消息')
    }

    const list = [1, 2, 3]
    return { list, emitParent }
  },
}
</script>

<style lang="stylus"></style>
