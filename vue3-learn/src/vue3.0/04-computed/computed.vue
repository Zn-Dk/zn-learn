<template>
  姓：<input type="text" v-model="person.firstName" />
  <br />
  名：<input type="text" v-model="person.lastName" />
  <br />
  <span>全名：{{ fullName }}</span>
  <br />
  <input type="text" v-model="person.fullName" />
</template>

<script>
import { computed, reactive } from 'vue'

export default {
  setup() {
    const person = reactive({
      firstName: '张',
      lastName: '三',
    })

    // 计算属性 computedProp = computed(()=>return { .... })
    const fullName = computed(() => {
      return person.firstName + '__' + person.lastName
    })

    person.fullName = computed(() => {
      return person.firstName + '__' + person.lastName
    })

    // 如果要定义 getters setters (不推荐)
    // person.fullName = computed({
    //   get() {
    //     return person.firstName + '__' + person.lastName
    //   },
    //   set(newName) {
    //     const name = newName.split('__')
    //     person.firstName = name[0]
    //     person.lastName = name[1]
    //   },
    // })

    return { person, fullName }
  },
}
</script>

<style lang="stylus"></style>
