<template>
  <span 
    class="text-xs sm:text-sm text-black p-1 sm:p-1.5 border border-gray-500 rounded-full"
    :class="customClass"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  }
});
</script>