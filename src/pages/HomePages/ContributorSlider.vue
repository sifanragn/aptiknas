<template>
  <div class="flex items-center justify-center gap-8">
    <!-- Swiper Container -->
    <div class="relative max-w-sm mx-auto h-[22.5rem]">
      <div class="swiper contributor-swiper h-full">
        <div class="swiper-wrapper">
          <div v-for="(item, index) in contributorData" :key="index" class="swiper-slide">
            <ContributorCard :contributor="item" />
          </div>
        </div>
      </div>
    </div>

    <!-- Kontrol Navigasi dan Paginasi -->
    <div class="flex flex-col items-center h-full gap-6">
      
      <!-- Paginasi Vertikal -->
      <div class="swiper-pagination-contributor flex flex-col items-center justify-center h-45">
        <!-- Swiper akan memasukkan bullets di sini -->
      </div>
      <!-- Tombol Navigasi -->
      <div class="flex flex-col gap-3 ">
        <div class="swiper-button-prev-contributor relative cursor-pointer rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100">
          <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
        </div>
        <div class="swiper-button-next-contributor relative cursor-pointer rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100">
          <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Navigation, EffectCards, Pagination } from 'swiper/modules'
import ContributorCard from './ContributorCard.vue'

// Impor style yang dibutuhkan oleh Swiper
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Data dummy untuk contributor
// Contoh data dummy yang kompatibel
const contributorData = ref([
  {
    id: 1,
    position_title: "IT Support Specialist",
    job_type: "Full-time",
    description: "Memberikan dukungan teknis untuk infrastruktur TI perusahaan dan membantu anggota dengan masalah teknologi",
    company: "APTIKNAS Pusat",
    location: "Jakarta",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    position_title: "Web Developer",
    job_type: "Contract",
    description: "Mengembangkan dan maintain website APTIKNAS serta platform digital untuk anggota",
    company: "APTIKNAS Digital",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  // ... data lainnya
])

onMounted(() => {
  // Inisialisasi Swiper dengan data dummy
  new Swiper('.contributor-swiper', {
    direction: 'vertical',
    modules: [Navigation, EffectCards, Pagination],
    effect: 'cards',
    cardsEffect: {
      slideShadows: false,
    },
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next-contributor',
      prevEl: '.swiper-button-prev-contributor',
    },
    pagination: {
      el: '.swiper-pagination-contributor',
      clickable: true,
    },
  })
})
</script>

<style>
/* Style dengan perubahan warna ke hijau */
.swiper-pagination-contributor .swiper-pagination-bullet {
  width: 4px; 
  height: 5rem;
  background-color: #d1d5db; 
  transition: all 300ms;
  opacity: 1;
  border-radius: 0.25rem;
}
.swiper-pagination-contributor .swiper-pagination-bullet-active {
  background-color: #22c55e; /* Hijau代替 Ungu */
  height: 10rem;
}

.contributor-swiper .swiper-slide-active .dim-overlay {
  opacity: 0;
}
</style>