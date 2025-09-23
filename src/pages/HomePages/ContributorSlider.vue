<template>
  <div class="flex items-center justify-center gap-8 h-[22.5rem] w-full">
    <!-- Loading State -->
    <div v-if="careerStore.loading" class="w-full text-center text-gray-500">
      Memuat lowongan...
    </div>

    <!-- Error State -->
    <div v-else-if="careerStore.error" class="w-full text-center text-red-500">
      Gagal memuat lowongan.
    </div>

    <!-- Empty State -->
    <div
      v-else-if="contributorData.length === 0"
      class="w-full text-center text-gray-500"
    >
      Saat ini tidak ada lowongan.
    </div>

    <!-- Swiper Container -->
    <div v-else class="relative max-w-sm mx-auto h-full">
      <div class="swiper contributor-swiper h-full">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in contributorData"
            :key="index"
            class="swiper-slide"
          >
            <ContributorCard :contributor="item" />
          </div>
        </div>
      </div>
    </div>

    <!-- Kontrol Navigasi dan Paginasi -->
    <div
      v-if="
        !careerStore.loading && !careerStore.error && contributorData.length > 0
      "
      class="flex flex-col items-center h-full gap-6"
    >
      <!-- Paginasi Vertikal -->
      <div
        class="swiper-pagination-contributor flex flex-col items-center justify-center h-45"
      >
        <!-- Swiper akan memasukkan bullets di sini -->
      </div>
      <!-- Tombol Navigasi -->
      <div class="flex flex-col gap-3">
        <div
          class="swiper-button-prev-contributor relative cursor-pointer rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
        >
          <svg
            class="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 15l7-7 7 7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
        <div
          class="swiper-button-next-contributor relative cursor-pointer rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
        >
          <svg
            class="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 9l-7 7-7-7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import Swiper from "swiper";
import { Navigation, EffectCards, Pagination } from "swiper/modules";
import ContributorCard from "./ContributorCard.vue";
import { useCareerStore } from "@/stores/career";
// Impor style yang dibutuhkan oleh Swiper
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Data dummy untuk contributor
const careerStore = useCareerStore();
const swiperInstance = ref(null);

const contributorData = computed(() => {
  const list = careerStore.list;
  let data = [];

  if (list && list.data && Array.isArray(list.data.data)) {
    data = list.data.data;
  } else if (list && Array.isArray(list.data)) {
    data = list.data;
  } else if (Array.isArray(list)) {
    data = list;
  }

  // Mengambil 4 data terbaru. Diasumsikan data dari API sudah terurut dari yang terbaru.
  return data.slice(0, 4);
});

onMounted(async () => {
  await careerStore.fetchAll();

  await nextTick();

  if (contributorData.value.length > 0) {
    swiperInstance.value = new Swiper(".contributor-swiper", {
      direction: "vertical",
      modules: [Navigation, EffectCards, Pagination],
      effect: "cards",
      cardsEffect: {
        slideShadows: false,
      },
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next-contributor",
        prevEl: ".swiper-button-prev-contributor",
      },
      pagination: {
        el: ".swiper-pagination-contributor",
        clickable: true,
      },
    });
  }
});
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
