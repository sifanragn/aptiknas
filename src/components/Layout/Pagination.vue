<template>
  <!-- Pagination -->
  <div v-if="totalPages > 1" class="mt-10 flex justify-end items-center gap-2 text-sm">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded"
      :class="{
        'bg-gray-300 text-white cursor-not-allowed': currentPage === 1,
        'bg-white border border-gray-300': currentPage !== 1
      }"
    >
      &lt;
    </button>
    <template v-for="(page, index) in displayedPages" :key="index">
      <span v-if="page === '...'" class="px-2">...</span>
      <button
        v-else
        @click="goToPage(page)"
        class="px-3 py-1 rounded"
        :class="{
          'border-purple-600 border-2 bg-white text-purple-700 font-bold': currentPage === page,
          'bg-white border border-gray-300': currentPage !== page
        }"
      >
        {{ page }}
      </button>
    </template>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded"
      :class="{
        'bg-gray-300 text-white cursor-not-allowed': currentPage === totalPages,
        'bg-white border border-gray-300': currentPage !== totalPages
      }"
    >
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['page-changed'])

const props = defineProps<{
  totalItems: number
  itemsPerPage?: number
  modelValue?: number // bisa pakai v-model:currentPage
}>()

const currentPage = ref(props.modelValue || 1)
const itemsPerPage = computed(() => props.itemsPerPage || 6)

const totalPages = computed(() =>
  Math.ceil(props.totalItems / itemsPerPage.value)
)

const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const maxVisibleButtons = 7

  if (total <= maxVisibleButtons) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current < 5) {
    return [1, 2, 3, 4, 5, '...', total]
  }

  if (current > total - 4) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  }

  return [1, '...', current - 1, current, current + 1, '...', total]
})

function goToPage(page: number | string) {
  if (typeof page === 'number') {
    currentPage.value = page
  }
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// Emit page-changed setiap kali currentPage berubah
watch(currentPage, (newVal) => {
  emit('page-changed', newVal)
})
</script>
