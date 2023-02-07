<template>
  {{ title }}
</template>

<script lang="ts">
export default {}
</script>

<script lang="ts" setup>
import { ref } from 'vue';

const title = ref('我是使用script-setup 的 refChild')

// 显式暴露(虽然要一个个导出 但是一般不会用到那么多,ref还是少用)
defineExpose({
  title,
})
</script>

<style lang="scss">

</style>