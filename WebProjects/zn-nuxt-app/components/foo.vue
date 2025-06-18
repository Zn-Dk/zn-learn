<template>
  <div>
    <h1>This is Foo Component</h1>

    <HighLink href="#" target="_blank">
      Link
    </HighLink>
  </div>
</template>

<script setup lang="ts">
import { h, type FunctionalComponent } from 'vue';

const HighLink: FunctionalComponent = (props, ctx) => {
  return h('a',
    {
      style: {
        fontWeight: 500,
        color: 'pink',
        textDecoration: 'none'
      },
      ...props,
    },
    ctx.slots?.default?.(),
  )
}

</script>