import { defineStore } from 'pinia'

export const useTest2Store = defineStore('Test2', {
  state: () => {
    return {
      count: 100,
      name: 'John',
    }
  },
})
