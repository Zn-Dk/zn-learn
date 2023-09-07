<template>Hello</template>

<script>
import { isReactive, isReadonly, isProxy, isRef, reactive, readonly, ref } from 'vue'

export default {
  setup() {
    const n = ref(0)
    const react = reactive({ k: 'z' })
    const read = readonly({ a: 1 })

    // FOR ref
    console.log(isRef(n)) //true
    console.log(isRef(read)) //false

    // FOR reactive
    console.log(isProxy(read)) // readonly 也是 reactive
    console.log(isReactive(react)) //true
    console.log(isReadonly(read)) //true
    console.log(isReadonly(react)) //false

    return {}
  },
}
</script>

<style lang="stylus"></style>
