<template>
  <div class="flex items-center justify-center gap-8 h-[22.5rem] w-full">
    <!-- Empty State -->
    <div
      v-if="contributorData.length === 0"
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
      v-if="contributorData.length > 0"
      class="flex flex-col items-center h-full gap-6"
    >
      <!-- Paginasi Vertikal -->
      <div
        class="swiper-pagination-contributor flex flex-col items-center bottom-0 justify-center h-35 gap-4"
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
// Impor style yang dibutuhkan oleh Swiper
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperInstance = ref(null);

// Data dummy untuk contributor APTIKNAS
const dummyContributors = ref([
  {
    id: 1,
    job_type: "Full-time",
    position_title: "Frontend Developer",
    description:
      "Membangun antarmuka pengguna yang responsif dan modern untuk aplikasi web APTIKNAS.",
  },
  {
    id: 2,
    job_type: "Part-time",
    position_title: "UI/UX Designer",
    description:
      "Merancang pengalaman pengguna yang intuitif dan menarik untuk platform digital kami.",
  },
  {
    id: 3,
    job_type: "Internship",
    position_title: "Content Creator",
    description:
      "Membuat konten kreatif dan informatif untuk media sosial dan blog APTIKNAS.",
  },
]);

const contributorData = computed(() => {
  return dummyContributors.value;
});

onMounted(async () => {
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
  background-color: #16a34a; /* green-600 */
  height: 10rem;
}

.contributor-swiper .swiper-slide-active .dim-overlay {
  opacity: 0;
}
</style>
