<template>
  <!-- default slot -->
  <slot>我是默认插槽</slot>

  <!-- named slot -->
  <slot name="foo"> 我是 foo 具名插槽</slot>
  <!-- scoped slot -->
  <slot name="bar" test="hello" data-zoo="zoo"> 我是 foo 具名插槽</slot>

</template>



<script lang="ts">
import { defineComponent, onMounted, } from 'vue';

export default defineComponent({
  // context => { slots, attrs, emit, expose }
  setup(_props, { slots, attrs }) {

    console.log(slots, 'slots') // <= useSlots
    console.log(slots.foo())
    onMounted(() => {
      console.log(slots.bar())
    })

    console.log(attrs, 'attrs') // <= useAttrs
    /*
      class: "child-class"
      count: 0
      id: "child"
    */
    return {
    };
  },
});
</script>

<style lang="scss">

</style>