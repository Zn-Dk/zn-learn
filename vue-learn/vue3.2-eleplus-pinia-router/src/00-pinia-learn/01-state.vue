<template>

  <h2>Pinia state 的几种操作</h2>
  <p>Now pinia say: {{store.foo}}, Now pinia count: {{store.count}}</p>
  <el-button @click="add1">1.store.count++ 直接修改</el-button>
  <br>
  <el-button @click="add2">2.$patch 单键值</el-button>
  <br>
  <el-button @click="change1">2-1.$patch 批量修改</el-button>
  <br>
  <el-button @click="change2">3.$patch 函数式修改</el-button>
  <br>
  <el-button @click="change3">4.$state 重写state (用的很少)</el-button>

  <p>Pinia getter: {{store.getCurrency}}</p>

  <p>Pinia action - addCount, click the button below this:</p>
  <el-button @mousedown="addMoney" @mouseup="clearTimer">5. action 修改 state (常规做法)addMoney</el-button>
  <el-button @click="store.$reset()" type="danger">reset</el-button>
</template>

<script setup lang="ts">

// usePinia stor
import useTestStore from '@/store/test'
const store = useTestStore()

// 修改 state 的 五种方式

// 前四种 可以直接修改 state (不是很推荐)

// 1
const add1 = () => {
  store.count++
}

// 2 $patch 修改单键值
const add2 = () => {
  store.$patch({ count: 10 })
}

// 2.1 $patch 批量修改键值
const change1 = () => {
  store.$patch({
    count: 10,
    foo: 'zoo'
  })
}

// 3 $patch 函数式修改
const change2 = () => {
  store.$patch((state) => {
    state.count++
    state.foo = 'Jazz'
  })
}

// 4 $state 重写整个 state (用的很少)
// 必须修改整个对象的所有属性
const change3 = () => {
  store.$state = {
    // count: '30', // 不能修改定义的类型
    count: 30,
    foo: 'NU',
    URL: 'http://'
  }
}

let timer: NodeJS.Timeout, inter: NodeJS.Timer
// 5. 最合理的方法是通过 action修改
// 小案例: 按住鼠标数字持续增加
const addMoney = () => {
  store.addMoney()
  // 1s 后 开启Interval增加
  timer = setTimeout(() => {
    inter = setInterval(() => {
      store.addMoney()
    }, 100)
  }, 1000)
}

// 鼠标抬起 清除定时器
const clearTimer = () => {
  clearTimeout(timer)
  clearInterval(inter)
}
</script>

<style lang="scss" scoped>
.ipt {
  :deep(.el-input__inner) {
    color: brown;
  }
}
</style>