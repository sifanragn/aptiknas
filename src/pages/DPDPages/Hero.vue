<template>
  <!-- Hero Carousel Container -->
  <div class="w-full lg:w-screen h-full flex flex-col items-center justify-center mx-auto relative px-4 sm:px-6 lg:px-10">
    <!-- Container -->
    <div class="container px-1 mr-4 relative">
      <section
        class="relative w-full mx-auto h-[300px] sm:h-[400px] lg:h-[80vh] overflow-hidden"
      >
        <div class="absolute inset-0 img-container">
          <div class="w-full h-full clipth flex items-center justify-center relative">
            <transition name="carousel" mode="out-in">
              <img
                :key="filteredSlides[currentSlide].id || currentSlide"
                :src="filteredSlides[currentSlide].image"
                class="w-full h-full object-cover object-center absolute inset-0"
                :alt="filteredSlides[currentSlide].title"
              />
            </transition>

            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 md:p-8 text-center">
              <h2 class="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 md:mb-4 max-w-xs sm:max-w-sm md:max-w-xl">
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
        <a
          v-if="filteredSlides[currentSlide].button_text && filteredSlides[currentSlide].url_link"
          :href="filteredSlides[currentSlide].url_link"
          class="bg-[#511378] text-white rounded-full py-2 px-6 hover:bg-[#3a0d57] transition-colors text-sm md:text-base absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10"
        >
          {{ filteredSlides[currentSlide].button_text }}
        </a>
      </section>
    </div>

    <!-- Pagination -->
    <div
      class="flex mt-4 space-x-2"
    >
      <span
        v-for="(slide, index) in filteredSlides"
        :key="index"
        class="w-3 h-3 rounded-full cursor-pointer"
        :class="currentSlide === index ? 'bg-[#511378]' : 'bg-gray-500'"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Data dummy untuk slider
const dummySlides = [
  {
    id: 1,
    title: "APTIKNAS - Asosiasi Pengusaha TIK Nasional",
    subtitle: "Bersama membangun ekosistem digital Indonesia yang inklusif dan berkelanjutan",
    image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    button_text: "Bergabung Sekarang",
    url_link: "#join",
    display_on_home: true
  },
  {
    id: 2,
    title: "Transformasi Digital untuk UMKM",
    subtitle: "Tingkatkan produktivitas dan perluas jangkauan pasar dengan solusi digital",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    button_text: "Pelajari Lebih Lanjut",
    url_link: "#learn-more",
    display_on_home: true
  },
  {
    id: 3,
    title: "Networking & Kolaborasi Bisnis",
    subtitle: "Jejaring luas dengan pelaku usaha TIK seluruh Indonesia",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    button_text: "Daftar Event",
    url_link: "#events",
    display_on_home: true
  }
];

const loading = ref(false);
const sliders = ref(dummySlides);
const currentSlide = ref(0);
let slideInterval;

// Filter slides yang seharusnya ditampilkan di hero
const filteredSlides = computed(() => {
  return sliders.value.filter(slide => 
    slide.display_on_home === true && slide.image
  );
});

// Navigation functions
const nextSlide = () => {
  if (filteredSlides.value.length === 0) return;
  currentSlide.value = (currentSlide.value + 1) % filteredSlides.value.length;
  resetSlideInterval();
};

const prevSlide = () => {
  if (filteredSlides.value.length === 0) return;
  currentSlide.value = (currentSlide.value - 1 + filteredSlides.value.length) % filteredSlides.value.length;
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
  // Simulasikan loading
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    startSlideInterval();
  }, 1000);
});

// Cleanup
onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<style scoped>
.clipth {
clip-path: polygon(0 10%, 35% 10%, 35% 0%, 65% 0%, 65% 10%, 100% 10%, 100% 100%, 65% 100%, 65% 91%, 35% 91%, 35% 100%, 0 100%);
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