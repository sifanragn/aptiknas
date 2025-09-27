    <script setup>
    import { ref, onMounted, computed, nextTick } from "vue";
    import Swiper from "swiper";
    import { Navigation, EffectCards, Pagination } from "swiper/modules";
    import ContributorCard from "./ContributorCard.vue";
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
        description: "Membangun antarmuka pengguna yang responsif dan modern untuk aplikasi web APTIKNAS.",
      },
      {
        id: 2,
        job_type: "Part-time",
        position_title: "UI/UX Designer",
        description: "Merancang pengalaman pengguna yang intuitif dan menarik untuk platform digital kami.",
      },
      {
        id: 3,
        job_type: "Internship",
        position_title: "Content Creator",
        description: "Membuat konten kreatif dan informatif untuk media sosial dan blog APTIKNAS.",
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
            verticalClass: "swiper-pagination-contributor",
          },
        });
      }
    });
    </script>
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
      class="flex flex-col items-center  h-60 justify-center top-0 absolute -right-5"
    >
      <!-- Wrapper untuk menjaga jarak yang konsisten -->
      <div class="flex flex-col items-center gap-4 h-32 justify-between">
        <!-- Paginasi -->
        <div class="swiper-pagination-contributor flex flex-col items-center justify-end px-5 h-20 gap-2  rounded-full">
          <!-- Swiper bullets -->
        </div>

        <!-- Navigasi -->
        <div class="flex flex-col gap-2 h-16 justify-start">
          <div
            class="swiper-button-prev-contributor relative cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
          >
            <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </div>
          <div
            class="swiper-button-next-contributor relative cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
          >
            <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-pagination-contributor {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 4rem;
  padding-bottom: 0.5rem;
}

.swiper-pagination-contributor .swiper-pagination-bullet {
  width: 3px;
  height: 2rem;
  background-color: #d1d5db;
  margin: 0.1rem 0 !important;
}

.swiper-pagination-contributor .swiper-pagination-bullet-active {
  background-color: #16a34a;
  height: 2.5rem;
  padding-top: 10px;
  padding-bottom: 10px;

}

</style>

