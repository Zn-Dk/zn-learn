<template>
  <div>
    <h1>Vue 3.3 新特性之</h1>
    <h2>defineEmits 类型注释书写更优雅了</h2>
    <div
      v-show="isShow"
      class="popup"
    >
      <h3>{{ popupInfo }}</h3>
      <template v-if="showPermissionBtns">
        <button
          class="mr6"
          @click="onReset(true)"
        >
          Accept
        </button>
        <button @click="onReset(false)">Decline</button>
      </template>
      <button
        v-else
        @click="closePopup"
      >
        Close
      </button>
    </div>
    <div class="show-case">
      <Counter
        @change="onCounterChange"
        @reset="onCounterReset"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Counter from './Counter.vue';

const popupInfo = ref('');
const isShow = ref(false);

const closePopup = () => {
  popupInfo.value = '';
  isShow.value = false;
};

const onCounterChange = (val: number) => {
  popupInfo.value = `Counter is now ${val} !`;
  isShow.value = true;
};

const showPermissionBtns = ref(false);
const resetCallBack = ref<(accept: boolean) => void>();

const onCounterReset = (info: string, permissionCallback: (accept: boolean) => void) => {
  popupInfo.value = info;
  resetCallBack.value = permissionCallback;
  isShow.value = true;
  showPermissionBtns.value = true;
};

const onReset = (accept: boolean) => {
  resetCallBack.value?.(accept);
  showPermissionBtns.value = false;
  closePopup();
};
</script>

<style>
.popup {
  position: fixed;
  width: 30vh;
  top: 20%;
  left: calc(50% - 15vh);
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #368;
}
</style>
