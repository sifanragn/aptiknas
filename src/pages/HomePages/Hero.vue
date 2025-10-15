<template>
  <!-- Hero Carousel Container -->
  <div
    class="w-screen h-screen justify-center flex flex-col items-center relative overflow-hidden"
  >
    <!-- Container Full Screen -->
    <div class="w-full h-full relative">
      <section
        v-if="!loading && filteredSlides.length"
        class="relative w-full h-full"
      >
        <div class="absolute inset-0 mx-5 rounded-2xl">
          <div class="w-full h-full flex items-center justify-center relative">
            <transition name="carousel" mode="out-in">
              <img
                :key="filteredSlides[currentSlide].id || currentSlide"
                :src="filteredSlides[currentSlide].image"
                class="w-full h-full object-cover object-center absolute inset-0 rounded-3xl"
                :alt="filteredSlides[currentSlide].title"
              />
            </transition>

            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 rounded-3xl"
            >
              <div class="max-w-4xl mx-auto">
                <h2
                  class="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 leading-tight"
                >
                  {{ filteredSlides[currentSlide].title }}
                </h2>
                <div
                  class="text-white text-lg sm:text-xl lg:text-2xl mb-6 lg:mb-8 leading-relaxed opacity-90 max-w-3xl mx-auto"
                  v-html="filteredSlides[currentSlide].subtitle"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          v-if="filteredSlides.length > 1"
          @click="prevSlide"
          class="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
        >
          <svg
            class="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          v-if="filteredSlides.length > 1"
          @click="nextSlide"
          class="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
        >
          <svg
            class="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Button CTA -->
        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 flex items-end"
        >
          <!-- Curve kiri -->
          <div
            class="bg-transparent curve-2 ease-in-out w-[20px] h-[20px] -mr-[0.1px] -mb-[0.1px] opacity-100"
          >
            <div class="concave-2"></div>
          </div>

          <!-- Tombol Utama -->
          <router-link
            to="/daftar"
            class="bg-[#f0f0f0] pb- pt-3 px-5 rounded-t-4xl"
          >
            <ShimmerButton
              background="#16a34a"
              class="text-base text-black font-semibold sm:text-lg lg:text-xl px-8 sm:px-8 py-3 sm:py-4 z-50 transition-all duration-300"
            >
              Bergabung Sekarang
            </ShimmerButton>
          </router-link>

          <!-- Curve kanan -->
          <div
            class="bg-transparent curve-4 ease-in-out w-[20px] h-[20px] -ml-[0.1px] -mb-[0.1px] opacity-100"
          >
            <div class="concave-4"></div>
          </div>
        </div>
      </section>

      <!-- Loading state -->
      <div
        v-if="loading"
        class="flex justify-center items-center w-full h-full bg-gray-100"
      >
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"
          ></div>
          <p class="text-gray-600 text-lg">Memuat slider...</p>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="!loading && !filteredSlides.length"
        class="flex justify-center items-center w-full h-full bg-gray-100"
      >
        <div class="text-center">
          <svg
            class="w-20 h-20 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p class="text-gray-600 text-lg">Tidak ada slider yang ditampilkan</p>
        </div>
      </div>
    </div>

    <!-- Pagination
    <div
      v-if="!loading && filteredSlides.length"
      class="absolute bottom-4 lg:bottom-0 flex space-x-3 z-10"
    >
      <button
        v-for="(slide, index) in filteredSlides"
        :key="index"
        @click.prevent="goToSlide(index)"
        class="w-3 h-3 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-125"
        :class="[
          currentSlide === index
            ? 'bg-green-600 w-8'
            : 'bg-green-300 hover:bg-white/80',
        ]"
      ></button>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useSliderStore } from "@/stores/slider"; // Impor store slider
import ShimmerButton from "@/components/UI/shimmer-button/ShimmerButton.vue";

const sliderStore = useSliderStore();
const currentSlide = ref(0);
let slideInterval;

// Gunakan state dari store
const loading = computed(() => sliderStore.loading);
const sliders = computed(() => sliderStore.list?.data || []);

// Filter slides yang seharusnya ditampilkan di hero
const filteredSlides = computed(() => {
  if (!Array.isArray(sliders.value)) return [];
  return sliders.value
    .filter((slide) => slide.display_on_home)
    .map((slide) => ({
      ...slide,
      image: getImageUrl(slide.image),
    }));
});

const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder-image.jpg"; // Fallback
  const baseUrl = "https://cms-aptiknas.hexagon.co.id/storage/";
  // API mengembalikan path seperti "sliders/...", jadi kita hanya perlu menggabungkannya
  return `${baseUrl}${imagePath}`;
};

// Navigation functions
const nextSlide = () => {
  if (filteredSlides.value.length === 0) return;
  currentSlide.value = (currentSlide.value + 1) % filteredSlides.value.length;
  resetSlideInterval();
};

const prevSlide = () => {
  if (filteredSlides.value.length === 0) return;
  currentSlide.value =
    (currentSlide.value - 1 + filteredSlides.value.length) %
    filteredSlides.value.length;
  resetSlideInterval();
};

const goToSlide = (index) => {
  if (index >= 0 && index < filteredSlides.value.length) {
    currentSlide.value = index;
    resetSlideInterval();
  }
};

// Auto slide
const startSlideInterval = () => {
  if (filteredSlides.value.length <= 1) return;

  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const resetSlideInterval = () => {
  clearInterval(slideInterval);
  startSlideInterval();
};

// Initialize
onMounted(() => {
  // Ambil data dari store
  sliderStore.fetchAll().then(() => {
    startSlideInterval();
  });
});

// Cleanup
onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<style scoped>
/* Full screen styling */
.w-screen {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}

.h-screen {
  height: 100vh;
}

/* Animasi carousel yang smooth */
.carousel-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 1, 1);
}

.carousel-enter-from {
  opacity: 0;
  transform: scale(1.1);
}

.carousel-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Smooth transitions untuk semua elemen interaktif */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Warna green-600 */
.bg-green-600 {
  background-color: #16a34a;
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Curve Styles */
.curve {
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 20px;
}

.concave {
  border-radius: 50%;
  box-shadow: -20px -20px #f0f0f0;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.curve-2 {
  height: 20px;
  overflow: hidden;
  position: relative;
  transform: rotatey(180deg);
  transform: rotate(180deg);
  width: 20px;
}

.concave-2 {
  border-radius: 50%;
  box-shadow: -20px -20px #f0f0f0;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.curve-3 {
  height: 20px;
  overflow: hidden;
  position: relative;
  transform: rotateY(180deg);
  width: 20px;
}

.concave-3 {
  border-radius: 50%;
  box-shadow: -20px -20px #f0f0f0;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.curve-4 {
  height: 20px;
  overflow: hidden;
  position: relative;
  transform: rotatex(180deg);
  width: 20px;
}

.concave-4 {
  border-radius: 50%;
  box-shadow: -20px -20px #f0f0f0;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

/* Shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.hover\:shadow-3xl:hover {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Ensure full screen on mobile */
@media (max-width: 768px) {
  .h-screen {
    height: 100vh;
    height: 100dvh; /* Dynamic viewport height for mobile */
  }
}

/* Prevent horizontal scroll */
body {
  overflow-x: hidden;
}

/* Full width container */
.container {
  max-width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
