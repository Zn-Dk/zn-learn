<template>
  <h1>Watch 的几大要点</h1>
  <br />
  <h3>Count: {{ count }}</h3>
  <button @click="count++">点我count+</button>
  <input type="text" v-model="msg" />
  <br />
  <h2>个人信息</h2>
  <br />
  <p>姓名 : {{ person.name }} 年龄 : {{ person.age }}</p>
  <p>状态 : {{ person.job.type }} 工资 : {{ salary }}</p>
  <br />
  <button @click="person.name += '!'">修改姓名</button>
  <br />
  <button @click="salary += 100">增加工资</button>
  <br />
  <br />
  <button @click="stop">停止监听</button>
  <br />
  <br />
  <h2>watchEffect 配置第二参数 flush:'post' 获取 DOM 元素</h2>
  <input type="text" id="test">
</template>

<script>
import { reactive, ref, toRef, watchEffect } from 'vue'

export default {
  //watch 注意的几大要素
  setup() {
    // 基本数据类型
    let count = ref(0)
    let msg = ref('Hello')
    // 引用数据类型
    let person = reactive({
      name: '张三',
      age: 25,
      job: {
        type: 'employed',
        s: {
          salary: 20000,
        },
      },
    })

    let salary = toRef(person.job.s, 'salary')




    // watchEffect 传入一个回调函数
    // 不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性
    // 只要出现在watchEffect的变量发生改变,这个回调都会从头到尾执行
    // 适合在那种多个数据联动进行操作
    // 这个函数在 setup 的时候就会立即执行一次 ( immediate )

    // 引申 watchEffect 接受一个参数:function ,在回调函数体之前执行 [onCleanUp]
    // 这时候你就可以做操作比如: 重置数据接口状态 取消请求 调用store 等等
    // 注意这个函数在页面首次watchEffect **不会执行** 只有第二次运行的时候生效


    // 返回值: stopHandle 可以接受这个返回值并执行, 停止 watchEffect 监听
    // (停止监听时 回调会再次执行到 onCleanUp 阶段 然后终止)
    const stop = watchEffect((onCleanUp) => {
      console.log(msg.value, 'msg')
      console.log(person.name, '修改姓名,涨薪!')
      salary.value += 100
      onCleanUp(() => {
        console.log('onCleanUp会在第二次观察开始, 首先执行,请用我做前置cleanUp操作')
        console.log('之前张三的工资是: ' + salary.value)
      })

      // 设置 flush post 以便能够获取 dom 信息 否则为 null(渲染未完成)
      console.log(document.querySelector('#test'))
    }, {
      flush: 'post',
      /* 高级用法 开发模式调试 */
      // onTrigger(e) { // 每次触发effect时调试
      //   debugger // 触发浏览器debug窗口弹出调试
      //   console.log(e.effect)
      // },
      // onTrack() {
      //   debugger
      // }
    })


    /*

    第二个参数 flush 是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。

    默认情况下，侦听器将在组件渲染之前执行 flush: 'pre'。
    设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行。详见回调的触发时机。
      这里的实际应用: 比如需要获取DOM 信息 就需要显式地改成 post 用的比较多

    在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。
    这可以通过设置 flush: 'sync' 来实现。(用的少)
    然而，该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题。
    */



    return {
      count,
      msg,
      person,
      salary,
      stop
    }
  },
}
</script>

<style lang="stylus"></style>
