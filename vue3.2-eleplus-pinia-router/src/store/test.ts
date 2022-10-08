/*
defineStore 定义
  第一个参数是应用程序中 store 的唯一 id
  export const useStore = defineStore('main', {
    // other options...
  })
*/

import { useFetch, createFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'
import { Name } from './namespace'

// options api 写法
export default defineStore(Name.test, {
  // state 声明必须为箭头函数的形式
  state: () => ({
    foo: 'Hello Pinia',
    count: 0,
    URL: '',
  }),
  getters: {
    // 简单使用: 接收 state 参数 以便调用 state
    getCurrency: state => {
      return '$' + state.count
    },
    // 进阶使用: 返回函数以供传参
    getTaxMoney: state => (tax: number) => tax + state.count,

    // 进阶使用: 在getter 中调用其他 getter 使用 this 不能写箭头函数
    getFooMoney(state): string {
      return this.getCurrency + state.foo
    },

    // 更高阶的场景: 访问其他存储
    // otherGetter(state) {
    //   const otherStore = useOtherStore()
    //   return state.localData + otherStore.data
    // },
  },
  actions: {
    addMoney() {
      this.count++
    },
    // 测试异步方法
    async fetchData(url) {
      const useMyFetch = createFetch({
        // baseUrl: 'https://my-api.com',
        options: {
          async beforeFetch({ options }) {
            options.headers = {
              ...options.headers,
              'Content-Type': `application/json`,
            }
            return { options }
          },
        },
        // fetchOptions: {
        //   mode: 'cors',
        // },
      })
      const { isFetching, error, data } = await useMyFetch(url)
      let objData = JSON.parse(data.value as string)
      // 测试方法互相调用
      this.getURL(objData)

      return objData
    },

    getURL(data) {
      this.URL = data?.url
    },
  },
  // 持久化插件
  // 存储的 key 默认为 store 的 id 名称 比如本例子就是 'Test'
  persist: {
    enabled: true, // 是否启用持久化 默认整个store都存储
    strategies: [
      {
        key: 'UA_USER', // 自定义 key 名称
        storage: sessionStorage,
        paths: ['foo', 'count'], // foo 和 count 字段用会话存储
      },
      {
        key: 'UA_URL', // 自定义 key 名称
        storage: localStorage,
        paths: ['URL'], // URL 字段用本地存储
      },
    ],
  },
})

// 创建store还可以传递一个setup函数 类似 vue setup 组合式 api 的写法
// 比较麻烦的是需要将属性方法 return
// export default defineStore(Name.test, () => {
//   const state = reactive({
//     foo: 'Hello Pinia',
//     count: 0,
//   })

//   const getCurrency = computed(() => '$' + state.count)

//   const addMoney = () => {
//     state.count++
//   }
//   return {
//     ...toRefs(state),
//     getCurrency,
//     addMoney,
//   }
// })
