<template>
  <h3>请输入要查找的评论记录的id</h3>
  <input type="text" v-model="searchQuery" />

  <h3 v-if="searchQuery">您搜索id: {{ searchQuery }} 的结果有...</h3>
  <ul v-if="fetchData">
    <li v-for="item in fetchData" :key="item.id">
      <p>postId:{{ item.postId }}</p>
      <p>name: {{ item.name }}</p>
      <p>email: {{ item.email }}</p>
      <p>comments: {{ item.body }}</p>
    </li>
  </ul>
</template>

<script>
import { customRef, shallowRef } from 'vue'

export default {
  setup() {
    let fetchData = shallowRef(null)
    let searchQuery = debouncedRef('', 1000)
    // customRef 定义一个手动的 可以自定义行为的ref行为 (相当于做拦截)

    // 应用场景: 实现搜索请求 + 防抖

    // customRef() : ref

    // 定义一个 debouncedRef 作为防抖响应式的操作
    function debouncedRef(searchId, delay = 1000) {
      let timer = null

      // return 一个对象 包含了 getter setter
      return customRef((track, trigger) => {
        return {
          // 输入框 H3激活的时候都会执行一次get操作 打印2个get
          // set 内触发 trigger 重新执行 get, 还需要 get 内执行 track 跟踪这一改变
          get() {
            console.log('get ' + searchId)
            track()
            return searchId
          },

          // 接受一个 newValue
          // 赋值后 需要在 set 通过 trigger 重新触发 get(**重要**)
          set(newVal) {
            console.log('set ' + newVal)
            timer && clearTimeout(timer)
            timer = setTimeout(async () => {
              if (!Number(newVal)) return false
              // 获取data, 赋值
              await useFetch(newVal)
              searchId = newVal
              trigger()
            }, delay)
          },
        }
      })
    }

    async function useFetch(id) {
      try {
        let res = await fetch(`http://jsonplaceholder.typicode.com/comments?postId=${id}`)
        let data = await res.json()
        fetchData.value = data
      } catch (err) {
        console.log(err)
      }
    }

    return {
      searchQuery,
      fetchData,
    }
  },
}
</script>

<style lang="stylus"></style>
