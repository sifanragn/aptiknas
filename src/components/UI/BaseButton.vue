<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'primary',
  size: 'md'
})
</script>

<template>
  <button :class="[
    'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': variant === 'primary',
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500': variant === 'secondary',
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500': variant === 'outline',
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2': size === 'md',
      'px-6 py-3 text-lg': size === 'lg'
    }
  ]">
    <slot />
  </button>
</template>