<template>
  <Transition name="modal-outer">
    <div
      v-show="modalActive"
      class="absolute flex justify-center items-center top-0 left-0 bg-black w-full h-screen bg-opacity-30"
    >
      <Transition name="modal-inner">
        <div
          v-if="modalActive"
          class="modal mx-4 p-4 bg-white max-w-screen-md text-gray-900"
        >
          <slot></slot>
          <button
            @click="$emit('closeModal')"
            class="mt-6 px-4 py-2 shadow-lg bg-weather-sec text-white"
          >
            Close
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modalActive: boolean
  }>(),
  {
    modalActive: false,
  }
)

defineEmits(['closeModal'])
</script>

<style lang="scss">
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}
.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}
.modal-inner-enter-active,
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0.15s;
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
