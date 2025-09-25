<template>
  <!-- Podcast Section -->
  <section class="py-16 md:py-20 lg:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-12 md:mb-16 lg:mb-20" data-aos="fade-up">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        >
          Podcast
        </h2>
        <p
          class="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto"
        >
          "Podcast APTIKNAS hadir dengan topik menarik seputar teknologi
          informasi, komunikasi, dan transformasi digital."
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Memuat podcast...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12 text-red-500">
        <p>Gagal memuat podcast. Silakan coba lagi nanti.</p>
        <p class="text-sm">{{ podcastStore.error }}</p>
        <button
          @click="loadPodcasts"
          class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="podcasts.length === 0 && !loading"
        class="text-center py-12 text-gray-500"
      >
        <i class="fas fa-podcast text-4xl mb-4"></i>
        <p>Belum ada podcast yang tersedia.</p>
      </div>

      <!-- Swiper Container -->
      <div v-else class="relative" data-aos="fade-up" data-aos-delay="200">
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
              <div
                class="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <!-- Image Container -->
                <div class="relative overflow-hidden">
                  <img
                    :src="getThumbnailUrl(podcast.yt_id)"
                    :alt="podcast.title"
                    class="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    @error="handleImageError"
                  />
                  <!-- Play Button -->
                  <div
                    class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div class="bg-white rounded-full p-3 shadow-lg">
                      <svg
                        class="w-8 h-8 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Title Container -->
                <div class="p-6">
                  <h3
                    class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2"
                  >
                    {{ podcast.title }}
                  </h3>
                  <p class="text-gray-600 text-sm mb-4">
                    {{ formatDate(podcast.pub_date) }} •
                    {{ getCategoryName(podcast) }}
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
                        'w-0 group-hover:w-full': activePodcast !== index,
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
          <button
            class="swiper-button-prev bg-white border border-gray-300 rounded-full size-12 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md"
          >
            <svg
              class="w-6 h-6 text-gray-700"
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
            class="swiper-button-next bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md"
          >
            <svg
              class="w-6 h-6 text-gray-700"
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
        </div>
      </div>

      <!-- Active Podcast Info -->
      <div
        v-if="activePodcast !== null && podcasts.length > 0"
        class="mt-12 text-center"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          {{ podcasts[activePodcast].title }}
        </h3>
        <p class="text-gray-600 mb-4">
          {{ formatDate(podcasts[activePodcast].pub_date) }}
        </p>
        <button
          @click="openYoutube(podcasts[activePodcast].yt_id)"
          class="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          Tonton di YouTube
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Data dummy untuk podcast APTIKNAS
const dummyPodcasts = ref([
  {
    id: 1,
    title: "Transformasi Digital UMKM di Era 4.0",
    yt_id: "T9Cbl0vUf7k",
    pub_date: "2024-09-15T00:00:00.000Z",
    category: { name: "Digital Transformation" },
    description: "Podcast tentang strategi transformasi digital untuk UMKM",
  },
  {
    id: 2,
    title: "Cybersecurity: Tantangan dan Solusi",
    yt_id: "lcknOxOR__c",
    pub_date: "2024-09-10T00:00:00.000Z",
    category: { name: "Cybersecurity" },
    description: "Diskusi tentang keamanan siber untuk pelaku usaha",
  },
  {
    id: 3,
    title: "AI dan Masa Depan Industri Teknologi",
    yt_id: "yD6dfHYgJm4",
    pub_date: "2024-09-08T00:00:00.000Z",
    category: { name: "Artificial Intelligence" },
    description: "Membahas perkembangan AI dalam industri teknologi",
  },
  {
    id: 4,
    title: "Cloud Computing untuk Bisnis Modern",
    yt_id: "Z39JfG4T2jg",
    pub_date: "2024-09-05T00:00:00.000Z",
    category: { name: "Cloud Computing" },
    description: "Pemanfaatan cloud computing dalam operasional bisnis",
  },
  {
    id: 5,
    title: "IoT dalam Smart City Development",
    yt_id: "uCRCvQyZHtI",
    pub_date: "2024-09-03T00:00:00.000Z",
    category: { name: "Internet of Things" },
    description: "Peran IoT dalam pengembangan kota pintar",
  },
  {
    id: 6,
    title: "Blockchain Beyond Cryptocurrency",
    yt_id: "uCRCvQyZHtI",
    pub_date: "2024-09-01T00:00:00.000Z",
    category: { name: "Blockchain" },
    description: "Aplikasi blockchain di luar dunia cryptocurrency",
  },
  {
    id: 7,
    title: "Membangun Karir di Industri TIK",
    yt_id: "HlGwtSQW_eE",
    pub_date: "2024-08-28T00:00:00.000Z",
    category: { name: "Karir" },
    description:
      "Tips dan trik dari para profesional untuk membangun karir yang sukses di industri teknologi.",
  },
  {
    id: 8,
    title: "Pentingnya UI/UX dalam Produk Digital",
    yt_id: "Q6t3tkAIfZk",
    pub_date: "2024-08-25T00:00:00.000Z",
    category: { name: "Desain" },
    description:
      "Mengapa pengalaman pengguna yang baik menjadi kunci keberhasilan produk digital saat ini.",
  },
]);

// Swiper modules
const modules = [Navigation, Pagination];

// Breakpoints for responsive design
const breakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
};

const activePodcast = ref(0);
const loading = ref(false);
const error = ref(null);

const podcasts = computed(() => dummyPodcasts.value);

// Fungsi untuk memuat podcast
const loadPodcasts = async () => {
  // Fungsi ini bisa digunakan kembali jika ingin beralih ke API
};

// Fungsi untuk mendapatkan URL thumbnail YouTube
const getThumbnailUrl = (ytId) => {
  if (!ytId)
    return "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
};

// Handle error gambar
const handleImageError = (event) => {
  event.target.src =
    "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
};

// Format tanggal untuk ditampilkan
const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Format tanggal tidak valid";
  }
};

// Dapatkan nama kategori
const getCategoryName = (podcast) => {
  if (podcast.category && podcast.category.name) {
    return podcast.category.name;
  }
  if (podcast.category_podcasts_id) {
    return `Kategori ${podcast.category_podcasts_id}`;
  }
  return "Podcast";
};

// Buka video YouTube
const openYoutube = (ytId) => {
  if (ytId) {
    // Karena ini data dummy, kita bisa arahkan ke halaman YouTube umum
    // atau gunakan ID asli jika ada
    const isDummyId = ["abc123", "def456"].includes(ytId);
    const url = isDummyId
      ? "https://www.youtube.com/"
      : `https://www.youtube.com/watch?v=${ytId}`;
    window.open(url, "_blank");
  }
};

const setActivePodcast = (index) => {
  activePodcast.value = index;
  // Buka YouTube ketika podcast diklik
  if (podcasts.value[index] && podcasts.value[index].yt_id) {
    openYoutube(podcasts.value[index].yt_id);
  }
};

const onSlideChange = (swiper) => {
  activePodcast.value = swiper.activeIndex;
};

// Simulasi loading data saat komponen dimount
onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000); // simulasi delay 1 detik
});
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
  background: #16a34a; /* green-600 */
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

/* Loading animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
