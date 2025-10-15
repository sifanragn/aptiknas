<template>
  <!-- Pagination -->
  <div v-if="totalPages > 1" class="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
    <!-- Info halaman -->
    <!-- <div class="text-sm text-gray-600">
      Menampilkan halaman {{ currentPage }} dari {{ totalPages }}
    </div> -->
    
    <!-- Navigasi pagination -->
    <div class="flex items-center gap-1">
      <!-- Tombol Previous -->
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
        :class="{
          'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === 1,
          'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm': currentPage !== 1
        }"
        aria-label="Halaman sebelumnya"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Numbered Pages -->
      <template v-for="(page, index) in displayedPages" :key="index">
        <span 
          v-if="page === '...'"
          class="flex items-center justify-center w-10 h-10 text-gray-500"
        >
          ...
        </span>
        <button
          v-else
          @click="goToPage(page)"
          class="flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-all duration-200"
          :class="{
            'bg-green-600 text-white shadow-md scale-105': currentPage === page,
            'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300': currentPage !== page
          }"
          :aria-current="currentPage === page ? 'page' : null"
        >
          {{ page }}
        </button>
      </template>

      <!-- Tombol Next -->
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
        :class="{
          'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === totalPages,
          'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm': currentPage !== totalPages
        }"
        aria-label="Halaman berikutnya"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Quick Navigation -->
    <div class="flex items-center gap-2 text-sm">
      <span class="text-gray-600">Lompat ke:</span>
      <div class="relative">
        <select
          v-model="currentPage"
          @change="handleSelectChange"
          class="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
        >
          <option
            v-for="page in totalPages"
            :key="page"
            :value="page"
          >
            Halaman {{ page }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['page-changed'])

const props = defineProps<{
  totalItems: number
  itemsPerPage?: number
  modelValue?: number 
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

const handleSelectChange = () => {
  // Trigger the page change when select is used
  emit('page-changed', currentPage.value)
}

// Emit page-changed setiap kali currentPage berubah
watch(currentPage, (newVal) => {
  emit('page-changed', newVal)
})

// Watch for modelValue changes from parent
watch(() => props.modelValue, (newVal) => {
  if (newVal && newVal !== currentPage.value) {
    currentPage.value = newVal
  }
})
</script>