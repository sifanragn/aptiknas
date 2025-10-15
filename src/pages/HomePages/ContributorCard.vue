<template>
  <div class="relative pt-5 w-full h-full">
    <!-- Main Card -->
    <div class="bg-green-600 text-white h-52 p-6 rounded-3xl relative overflow-hidden z-10">
      <!-- Overlay untuk efek redup, dikontrol oleh CSS di ContributorSlider.vue -->
      <div class="dim-overlay absolute inset-0 transition-opacity duration-500 ease-in-out"></div>
      <span class="text-xs mb-1 block">{{ contributor.job_type || 'Lowongan' }}</span>
      <h3 class="text-lg font-semibold">{{ contributor.position_title || 'Judul Posisi' }}</h3>
      <p class="text-sm text-white mt-2">{{ contributorDescription }}</p>
       <div class="absolute -bottom-10 -right-10 pointer-events-none">
        <div
          class="size-30 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center"
        >
          <div
            class="size-25 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
          >
            <img
              src=""
              alt=""
              class="size-10 mb-2 mr-2"
            />
          </div>
        </div>
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