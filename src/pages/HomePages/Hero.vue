<template>
  <!-- Hero Carousel Container -->
  <div
    class="w-full lg:w-screen h-full justify-center flex flex-col items-center mx-auto relative px-10"
  >
    <!-- SVG Filter -->
    <svg
      :style="{ visibility: 'hidden', position: 'absolute' }"
      width="0"
      height="0"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
    <!-- Container -->
    <div class="container px-1 mr-4 relative">
      <section
        v-if="!loading && filteredSlides.length"
        class="relative w-full mx-auto px-4 sm:px-6 lg:px-10 h-[300px] sm:h-[400px] lg:h-[80vh] overflow-hidden"
      >
        <div class="absolute inset-0 img-container">
          <div
            class="w-full h-full clipth flex items-center justify-center relative"
          >
            <transition name="carousel" mode="out-in">
              <img
                :key="filteredSlides[currentSlide].id || currentSlide"
                :src="getImageUrl(filteredSlides[currentSlide].image)"
                class="w-full h-full object-cover object-center absolute inset-0"
                :alt="filteredSlides[currentSlide].title"
              />
            </transition>

            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 md:p-8 text-center"
            >
              <h2
                class="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 md:mb-4 max-w-xs sm:max-w-sm md:max-w-xl"
              >
                {{ filteredSlides[currentSlide].title }}
              </h2>
              <div
                class="text-white text-sm md:text-base mb-3 md:mb-6"
                v-html="filteredSlides[currentSlide].subtitle"
              ></div>
            </div>
          </div>
        </div>

        <!-- Button CTA -->
        <router-link
          v-if="
            filteredSlides[currentSlide].button_text &&
            filteredSlides[currentSlide].url_link
          "
          :to="filteredSlides[currentSlide].url_link"
          class="bg-[#511378] text-white rounded-full py-2 px-6 hover:bg-[#3a0d57] transition-colors text-sm md:text-base absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10"
        >
          {{ filteredSlides[currentSlide].button_text }}
        </router-link>
      </section>
      
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center h-[300px] sm:h-[400px] lg:h-[80vh]">
        <p class="text-gray-600">Memuat slider...</p>
      </div>
      
      <!-- Empty state -->
      <div v-if="!loading && !filteredSlides.length" class="flex justify-center items-center h-[300px] sm:h-[400px] lg:h-[80vh]">
        <p class="text-gray-600">Tidak ada slider yang ditampilkan</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && filteredSlides.length" class="flex mt-4 space-x-2">
      <span
        v-for="(slide, index) in filteredSlides"
        :key="index"
        class="w-3 h-3 rounded-full cursor-pointer"
        :class="currentSlide === index ? 'bg-[#511378]' : 'bg-gray-500'"
        @click.prevent="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useSliderStore } from "@/stores/slider";

const sliderStore = useSliderStore();
const loading = ref(false);
const currentSlide = ref(0);
let slideInterval;

// Mengambil data dari store
const sliders = computed(() => {
  // Jika store memiliki data, gunakan data tersebut
  if (sliderStore.list.data && Array.isArray(sliderStore.list.data)) {
    return sliderStore.list.data;
  }
  return [];
});

// Filter slides yang seharusnya ditampilkan di hero
const filteredSlides = computed(() => {
  return sliders.value.filter(
    (slide) => slide.display_on_home === true && slide.image
  );
});

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // Jika gambar sudah berupa URL lengkap, langsung kembalikan
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Jika gambar adalah path relatif, tambahkan base URL
  // Sesuaikan dengan URL API Anda
  const baseUrl = 'http://127.0.0.1:8000';
  return `${baseUrl}/storage/${imagePath}`;
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
onMounted(async () => {
  loading.value = true;
  
  try {
    // Ambil data dari store
    await sliderStore.fetchAll();
    
    // Mulai slider jika ada data
    if (filteredSlides.value.length > 0) {
      startSlideInterval();
    }
  } catch (error) {
    console.error("Gagal memuat data slider:", error);
  } finally {
    loading.value = false;
  }
});

// Cleanup
onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<style scoped>
.clipth {
  clip-path: polygon(
    0 10%,
    25% 10%,
    25% 0%,
    70% 0%,
    70% 10%,
    100% 10%,
    100% 100%,
    65% 100%,
    65% 91%,
    35% 91%,
    35% 100%,
    0 100%
  );
}

.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.5s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}

/* SVG Filter untuk efek goo */
svg {
  visibility: hidden;
  position: absolute;
  width: 0;
  height: 0;
}

.img-container {
  filter: url("#goo");
}
</style>