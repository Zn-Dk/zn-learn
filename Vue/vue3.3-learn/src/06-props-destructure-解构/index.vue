<template>
  <div>
    <h1>Vue 3.3 实验性新特性之</h1>
    <h2>Reactive Props Destructure (Props 解构赋值同时保持响应性)</h2>
    <code>
      <p>
        个人对这个功能的看法, 挺方便, 但是对于大型项目中, 区分组件内部的变量和外部引入的 props 通过
        props.XXX 比解构出来 XXX 可能更清晰一点
      </p>
      <p>
        当然 React 早已支持这个功能, 这就是代码风格的关系了, Vue 只是提供了一种更 DX improvement
        (开发体验提升) 的功能.
      </p>
    </code>
    <div class="show-case">
      <input
        type="number"
        v-model="modelNum"
      />
      <button @click="changeChildNum">Change Child `num` props</button>
      <button @click="changeMsg">Change Child `msg` props</button>
      <Child
        :msg="childMsg"
        :num="childNum"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Child from './Child.vue';

const modelNum = ref();

const childNum = ref();
const changeChildNum = () => {
  childNum.value = modelNum.value;
};

const childMsg = ref('Hello World');
const changeMsg = () => {
  childMsg.value = 'Foo';
};
</script>
