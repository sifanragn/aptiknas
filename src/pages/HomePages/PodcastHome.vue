<template>
  <!-- Podcast Section -->
  <section class="py-16 md:py-20 lg:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-12 md:mb-16 lg:mb-20" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Podcast
        </h2>
        <p class="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
          "Podcast APTIKNAS hadir dengan topik menarik seputar teknologi informasi,
          komunikasi, dan transformasi digital."
        </p>
      </div>

      <!-- Swiper Container -->
      <div class="relative" data-aos="fade-up" data-aos-delay="200">
        <!-- Swiper -->
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="30"
          :breakpoints="breakpoints"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          @slide-change="onSlideChange"
          class="pb-12"
        >
          <swiper-slide v-for="(podcast, index) in podcasts" :key="podcast.id">
            <div class="group cursor-pointer" @click="setActivePodcast(index)">
              <!-- Podcast Card -->
              <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <!-- Image Container -->
                <div class="relative overflow-hidden">
                  <img
                    :src="podcast.image"
                    :alt="podcast.title"
                    class="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <!-- Play Button -->
                  <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="bg-white rounded-full p-3">
                      <svg class="w-8 h-8 text-[#511378]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <!-- Title Container -->
                <div class="p-6">
                  <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {{ podcast.title }}
                  </h3>
                  <p class="text-gray-600 text-sm mb-4">
                    {{ podcast.date }} • {{ podcast.duration }}
                  </p>
                  
                  <!-- Progress Bar Container -->
                  <div class="relative">
                    <!-- Background Line -->
                    <div class="h-1 bg-gray-300 rounded-full w-full"></div>
                    <!-- Animated Progress Line -->
                    <div
                      class="absolute top-0 left-0 h-1 bg-gray-900 rounded-full transition-all duration-500 ease-out"
                      :class="{
                        'w-full': activePodcast === index,
                        'w-0 group-hover:w-full': activePodcast !== index
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>

        <!-- Pagination -->
        <div class="swiper-pagination !relative !bottom-0 mt-8"></div>

        <!-- Navigation Buttons -->
        <div class="flex justify-center items-center gap-4 mt-8">
          <button class="swiper-button-prev bg-white border border-gray-300 rounded-full size-12 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button class="swiper-button-next bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Active Podcast Info (Optional) -->
      <div v-if="activePodcast !== null" class="mt-12 text-center" data-aos="fade-up" data-aos-delay="400">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          {{ podcasts[activePodcast].title }}
        </h3>
        <p class="text-gray-600">
          Sedang diputar
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiper modules
const modules = [Navigation, Pagination];

// Breakpoints for responsive design
const breakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 20
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 40
  }
};

// Podcast data
const podcasts = ref([
  {
    id: 1,
    title: "Transformasi Digital UMKM di Era 4.0",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "12 Sept 2024",
    duration: "45 min"
  },
  {
    id: 2,
    title: "Cybersecurity: Tantangan dan Solusi",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "10 Sept 2024",
    duration: "38 min"
  },
  {
    id: 3,
    title: "AI dan Masa Depan Industri Teknologi",
    image: "https://images.unsplash.com/photo-1677442135135-416f8aa26a5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "8 Sept 2024",
    duration: "52 min"
  },
  {
    id: 4,
    title: "Cloud Computing untuk Bisnis Modern",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "5 Sept 2024",
    duration: "41 min"
  },
  {
    id: 5,
    title: "IoT dalam Smart City Development",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "3 Sept 2024",
    duration: "47 min"
  },
  {
    id: 6,
    title: "Blockchain Beyond Cryptocurrency",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "1 Sept 2024",
    duration: "50 min"
  }
]);

const activePodcast = ref(0);

const setActivePodcast = (index) => {
  activePodcast.value = index;
};

const onSlideChange = (swiper) => {
  activePodcast.value = swiper.activeIndex;
};
</script>

<style scoped>
/* Custom Swiper Styles */
.swiper-pagination-bullet {
  background: #d1d5db;
  opacity: 0.7;
  width: 12px;
  height: 12px;
  margin: 0 6px;
}

.swiper-pagination-bullet-active {
  background: #511378;
  opacity: 1;
  width: 30px;
  border-radius: 12px;
}

.swiper-button-prev,
.swiper-button-next {
  position: static;
  margin: 0;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}

/* Line clamp for title */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:w-full {
  width: 100% !important;
}
</style>