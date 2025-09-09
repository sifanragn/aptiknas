<template>
  <div class="relative pt-5 w-full h-full">
    <!-- Main Card -->
    <div class="bg-green-600 text-white h-52 p-6 rounded-3xl relative overflow-hidden z-10">
      <!-- Overlay untuk efek redup, dikontrol oleh CSS di ContributorSlider.vue -->
      <div class="dim-overlay absolute inset-0 bg-green-800/60 transition-opacity duration-500 ease-in-out"></div>
      <span class="text-xs mb-1 block">{{ contributor.job_type || 'Lowongan' }}</span>
      <h3 class="text-lg font-semibold">{{ contributor.position_title || 'Judul Posisi' }}</h3>
      <p class="text-sm mt-2">{{ contributorDescription }}</p>
      <div class="absolute right-4 bottom-4 bg-white/20 p-3 rounded-full">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12l-4-4h8l-4 4z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  contributor: {
    type: Object,
    default: () => ({
      job_type: '',
      position_title: '',
      ringkasan: '',
      description: '' // Tambahan field untuk data dummy
    }),
  },
})

// Menghapus HTML tags dari deskripsi atau menggunakan description biasa
const contributorDescription = computed(() => {
  // Prioritaskan description jika ada (untuk data dummy)
  if (props.contributor.description) {
    return props.contributor.description
  }
  
  // Fallback ke ringkasan dengan remove HTML tags
  if (!props.contributor.ringkasan) return 'Deskripsi lowongan tidak tersedia'
  const doc = new DOMParser().parseFromString(props.contributor.ringkasan, 'text/html')
  return doc.body.textContent || ''
})
</script>