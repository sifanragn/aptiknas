<template>
  <section
    class="dark:bg-neutral-900 py-16 text-center overflow-hidden relative"
  >
    <div class="px-4 container mx-auto">
      <h2
        class="text-3xl font-bold mb-3 text-black dark:text-white"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Kegiatan APTIKNAS
      </h2>
      <p
        class="text-gray-500 dark:text-neutral-400 max-w-xl mx-auto mb-12"
        data-aos="fade-down"
        data-aos-duration="800"
        data-aos-delay="200"
      >
        Berbagai program dan aktivitas yang diselenggarakan untuk memajukan
        industri TIK nasional dan memberdayakan anggota.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="agendaStore.loading" class="text-center py-10">
      <p>Memuat kegiatan...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="agendaStore.error" class="text-center py-10 text-red-500">
      <p>Gagal memuat data: {{ agendaStore.error }}</p>
    </div>

    <!-- Swiper Container -->
    <div v-else-if="kegiatanData.length > 0" class="relative px-4 container mx-auto">
      <div
        class="swiper kegiatan-swiper"
        @mouseenter="pauseSwiper"
        @mouseleave="resumeSwiper"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in kegiatanData"
            :key="item.id"
            class="swiper-slide"
          >
            <div
              class="relative group cursor-pointer h-96 w-full overflow-hidden rounded-2xl"
            >
              <!-- Text Description (Above Image) -->
              <div
                class="absolute top-0 left-0 right-0 h-50 bg-white text-black p-4 rounded-t-2xl transition-all duration-500 transform -translate-y-full group-hover:translate-y-0"
              >
                <h3 class="font-semibold text-lg mb-2">{{ item.title }}</h3>
                <p class="text-sm text-gray-600 line-clamp-2">
                  {{ item.description }}
                </p>
                <span
                  class="inline-block mt-2 text-xs text-green-600 font-medium"
                  >{{ item.date }}</span
                >
              </div>

              <!-- Image Container (Reduces height on hover) -->
              <div
                class="absolute inset-0 overflow-hidden rounded-2xl transition-all duration-500 h-full group-hover:h-1/2 group-hover:top-1/2"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  @error="handleImageError"
                />
                <div
                  class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                ></div>

                <!-- Title overlay on image -->
                <div class="absolute bottom-4 left-4 right-4">
                  <h3 class="text-white font-semibold text-lg drop-shadow-lg">
                    {{ item.title }}
                  </h3>
                </div>
              </div>

              <!-- Bottom space for content (becomes visible when image shrinks) -->
              <div
                class="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <div
                  class="bg-gradient-to-t from-white to-transparent h-full rounded-b-2xl"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls: Navigation and Pagination -->
      <div class="flex justify-between items-center mt-6">
        <!-- Pagination (Bottom Left) -->
        <div class="swiper-pagination-kegiatan !relative"></div>

        <!-- Navigation Buttons (Bottom Right) -->
        <div class="flex items-center gap-3">
          <button
            class="swiper-button-prev-kegiatan bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md"
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
            class="swiper-button-next-kegiatan bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md"
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
    </div>

    <!-- Empty State -->
    <div v-else-if="!agendaStore.loading && kegiatanData.length === 0" class="text-center py-10">
      <p>Tidak ada kegiatan yang tersedia.</p>
    </div>

    <div
      class="mt-10"
      data-aos="fade-up"
      data-aos-delay="300"
      data-aos-duration="800"
    >
      <interactive-hover-button
        text="Lihat Semua Kegiatan"
        icon="fas fa-arrow-right"
        @click="$router.push('/kegiatan')"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import InteractiveHoverButton from "@/components/UI/interactive-hover-button/InteractiveHoverButton.vue";

// Gunakan agenda store
const agendaStore = useAgendaStore();

const swiperInstance = ref(null);

// Format data dari store untuk komponen
const kegiatanData = computed(() => {
  if (!agendaStore.list || agendaStore.list.length === 0) return [];
  
  return agendaStore.list.map((item) => ({
    id: item.id,
    title: item.title,
    description: stripHtmlTags(item.description),
    date: formatDate(item.start_datetime),
    image: getImageUrl(item),
  }));
});

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (item) => {
  // Prioritaskan image_url dari API jika tersedia
  if (item.image_url) {
    return item.image_url;
  }
  
  // Fallback ke image path
  if (item.image) {
    const baseUrl = import.meta.env.VITE_STORAGE_URL || "https://cms-aptiknas.hexagon.co.id";
    
    if (item.image.startsWith("http")) {
      return item.image;
    }
    
    // Handle berbagai format path
    if (item.image.startsWith("agenda/")) {
      return `${baseUrl}/storage/${item.image}`;
    }
    
    if (item.image.startsWith("storage/agenda/")) {
      return `${baseUrl}/${item.image}`;
    }
    
    if (item.image.startsWith("/")) {
      return `${baseUrl}${item.image}`;
    }
    
    // Default: anggap sebagai nama file di folder agenda
    return `${baseUrl}/storage/agenda/${item.image}`;
  }

  // Fallback ke placeholder jika tidak ada gambar
  return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80";
};

// Handle error gambar
const handleImageError = (event) => {
  console.error("Gagal memuat gambar");
  event.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80";
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
    return "Format tanggal tidak valid";
  }
};

// Hapus tag HTML dari deskripsi
const stripHtmlTags = (html) => {
  if (!html) return "Tidak ada deskripsi";
  return html.replace(/<[^>]*>/g, "");
};

// Initialize AOS
onMounted(async () => {
  AOS.init({
    once: true,
    easing: "ease-out-quad",
    duration: 800,
  });

  // Fetch data dari store
  await agendaStore.fetchAll();

  // Initialize Swiper after data is loaded and DOM is updated
  await nextTick();
  if (kegiatanData.value.length > 0) {
    initSwiper();
  }
});

const initSwiper = () => {
  swiperInstance.value = new Swiper(".kegiatan-swiper", {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: kegiatanData.value.length > 1,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next-kegiatan",
      prevEl: ".swiper-button-prev-kegiatan",
    },
    pagination: {
      el: ".swiper-pagination-kegiatan",
      clickable: true,
    },
    breakpoints: {
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
    },
  });
};

const pauseSwiper = () => {
  if (swiperInstance.value) {
    swiperInstance.value.autoplay.stop();
  }
};

const resumeSwiper = () => {
  if (swiperInstance.value) {
    swiperInstance.value.autoplay.start();
  }
};

onUnmounted(() => {
  if (swiperInstance.value) {
    swiperInstance.value.destroy();
  }
});
</script>

<style scoped>
@import "swiper/css";
@import "swiper/css/navigation";
@import "swiper/css/pagination";

.kegiatan-swiper {
  padding: 20px 10px;
}

.swiper-slide {
  height: auto;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom pagination styling */
.swiper-pagination-kegiatan {
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
}

.swiper-pagination-kegiatan :deep(.swiper-pagination-bullet) {
  background: #d1d5db;
  opacity: 0.7;
  width: 12px;
  height: 12px;
  margin: 0 6px;
}

.swiper-pagination-kegiatan :deep(.swiper-pagination-bullet-active) {
  background: #16a34a; /* green-600 */
  opacity: 1;
  width: 30px;
  border-radius: 12px;
}

/* Navigation buttons */
.swiper-button-prev-kegiatan,
.swiper-button-next-kegiatan {
  position: static;
  margin: 0;
}

.swiper-button-prev-kegiatan::after,
.swiper-button-next-kegiatan::after {
  display: none;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Hover effects */
.group:hover .group-hover\:h-1\/2 {
  height: 50%;
}

.group:hover .group-hover\:top-1\/2 {
  top: 50%;
}

.group:hover .group-hover\:-translate-y-full {
  transform: translateY(-100%);
}

.group:hover .group-hover\:translate-y-0 {
  transform: translateY(0);
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:opacity-30 {
  opacity: 0.3;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>