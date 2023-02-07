<template>
  <el-button>Hello Element Plus</el-button>

  <h2>Test Pinia</h2>
  <p>Now pinia say: {{ store.foo }}, Now pinia count: {{ store.count }}</p>

  <p>Pinia getter: {{ store.getCurrency }}</p>
  <p>Pinia action - addMoney, click the button below this:</p>
  <el-button @click="store.addMoney">addMoney</el-button>
  <br />
  <el-button @click="store.foo = 'Hello Foo'">changeFoo</el-button>
  <br />
  <el-button @click="resetStore">resetStore</el-button>
  <br />
  <el-button @click="change1">$patch1</el-button>
  <br />
  <el-button @click="change2">$patch2</el-button>
  <br />
  <el-button @click="store.fetchData('https://httpbin.org/get')">fetchData</el-button>
  <br />
  <el-button @click="change3">changeStoreTest2</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import useTestStore from '@/store/test'
import { useTest2Store } from '@/store/test2'

const store = useTestStore()
const store2 = useTest2Store()

// $id 获取 store 名称
console.log('store名称: ' + store.$id)

// $reset 重置 state 为初始状态

const resetStore = () => {
  store.$reset()
}

// $subscribe 订阅 监听 state 的变化(无论什么变化都会执行)
// 与常规的 watch() 相比，使用 $subscribe() 的优点是 subscriptions 只会在 patches 之后触发一次
// 第二个参数 如果你的组件卸载之后还想继续调用请设置第二个参数 { detached:true }
// 返回一个函数 执行它以移除订阅 unsubscribe()

// $patch 批量修改键值 // type : "patch object"
const change1 = () => {
  store.$patch({
    count: 10,
    foo: 'zoo',
  })
}

//  $patch 函数式修改 // type : "patch function"
const change2 = () => {
  store.$patch(state => {
    state.count++
    state.foo = 'Jazz'
  })
}

const unSub = store.$subscribe((mutation, state) => {
  console.log(mutation)
  // import { MutationType } from 'pinia'
  // mutation.type // 'direct' | 'patch object' | 'patch function'
  // // 与 store.$id 相同
  // mutation.storeId // 'cart'
  // // 仅适用于 mutation.type === 'patch object'
  // mutation.payload // 打印传递给 store.$patch() 的修改对象
  // 查看 newV oldV
  // console.log(mutation?.events?.newValue, mutation?.events?.oldValue)

  // 打印 state Proxy对象
  console.log(state)

  // 示例 持久化(可以放到插件内实现)
  // localStorage.setItem(mutation.storeId, JSON.stringify(state))

  // unSub()
})

const change3 = () => {
  store2.$patch(state => {
    state.count = 10000
    state.name = 'Bracken'
  })
}

// $onAction 订阅Actions的调用

// // 回传一个函数 以供手动移除订阅
// const unSubAction = store.$onAction(({
//   name, // action 的名字
//   store, // store 实例
//   args, // 调用这个 action 的参数数组
//   after, // 在这个 action 执行完毕之后，执行这个函数
//   onError, // 在这个 action 抛出异常的时候，执行这个函数
// }) => {
//   console.log('调用参数: ', args)
//   console.log(name + '被调用了')

//   // 如果 action 成功并且完全运行后，after 将触发。
//   // 它将等待任何返回的 promise
//   after((result) => {
//     console.log(name + '成功!', result)
//   })

//   // 如果 action 抛出或返回 Promise.reject ，onError 将触发
//   onError((error) => {
//     console.warn(name + '调用出错!', error)
//   })

//   // unSubAction()
// })
</script>

<style lang="scss" scoped>
.ipt {
  :deep(.el-input__inner) {
    color: brown;
  }
}
</style>
