<template>
  <div>
    <h3>User Info:</h3>
    <!-- 自动推断 props 属性 -->
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
    <p>email: {{ email }}</p>
    <button
      v-show="!isShow"
      @click="toggleButton"
    >
      Change Password
    </button>
    <div v-show="isShow">
      <input
        v-model="modelPassword"
        class="mr6"
        type="text"
        @change="onChange"
      />
      <button
        class="mr6"
        @click="onSave"
      >
        Save
      </button>
      <button @click="onCancel">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { IChildEmits, IUser, InputPayload } from '../types';

// 直接引入 Type 作为 defineProps 的类型检查
const props = defineProps<IUser & { index: number }>();

// 测试外部引用 emit type
const emits = defineEmits<IChildEmits>();

const modelPassword = ref(props.password);

const isShow = ref(false);

const payload = computed<InputPayload>(() => ({
  index: props.index,
  password: modelPassword.value,
}));

// sync password
const syncPassword = () => {
  modelPassword.value = props.password;
};

watch(isShow, (show: boolean) => {
  if (!show) {
    syncPassword();
  }
});

const toggleButton = () => {
  isShow.value = !isShow.value;
};

const onChange = () => {
  emits('change', payload.value);
};

const onCancel = () => {
  syncPassword();
  toggleButton();
};

const onSave = () => {
  toggleButton();
  emits('save', payload.value);
};
</script>
