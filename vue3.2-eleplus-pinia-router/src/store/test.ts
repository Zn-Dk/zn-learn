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
    getCurrency: state => {
      return '$' + state.count
    },
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
