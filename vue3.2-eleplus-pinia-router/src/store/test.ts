/*
defineStore 定义
  第一个参数是应用程序中 store 的唯一 id
  export const useStore = defineStore('main', {
    // other options...
  })
*/

import { defineStore } from 'pinia'
import { Name } from './namespace'

export default defineStore(Name.test, {
  // state 声明必须为箭头函数的形式
  state: () => ({
    foo: 'Hello Pinia',
    count: 0,
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
  },
})
