<template>
  <!-- Podcast Section -->
  <section class="py-16 md:py-20 lg:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-8 md:mb-16 lg:mb-20" data-aos="fade-up">
        <h2
          class="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4"
        >
          Podcast
        </h2>
        <p
          class="text-base md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-2"
        >
          "Podcast APTIKNAS hadir dengan topik menarik seputar teknologi
          informasi, komunikasi, dan transformasi digital."
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="podcastStore.loading" class="text-center py-8 md:py-12">
        <div
          class="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-green-600 mx-auto mb-3 md:mb-4"
        ></div>
        <p class="text-gray-600 text-sm md:text-base">Memuat podcast...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="podcastStore.error"
        class="text-center py-8 md:py-12 text-red-500"
      >
        <p class="text-sm md:text-base">
          Gagal memuat podcast. Silakan coba lagi nanti.
        </p>
        <p class="text-xs md:text-sm mt-1">{{ podcastStore.error }}</p>
        <button
          @click="loadPodcasts"
          class="mt-3 md:mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm md:text-base"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="podcasts.length === 0 && !podcastStore.loading"
        class="text-center py-8 md:py-12 text-gray-500"
      >
        <i class="fas fa-podcast text-3xl md:text-4xl mb-3 md:mb-4"></i>
        <p class="text-sm md:text-base">Belum ada podcast yang tersedia.</p>
      </div>

      <!-- Podcast Content -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 md:gap-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          v-for="(podcast, index) in paginatedPodcasts"
          :key="podcast.id"
          class="group cursor-pointer"
          @click="openYoutube(podcast.yt_id)"
        >
          <!-- Progress Bar per Card -->
          <div class="relative h-1 mb-4">
            <!-- Background -->
            <div
              class="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-full"
            ></div>
            <!-- Progress on hover -->
            <div
              class="absolute top-0 left-0 h-full bg-green-600 rounded-full w-0 transition-all duration-500 ease-out group-hover:w-full"
            ></div>
          </div>
          <div
            class="overflow-hidden transition-all duration-300 hover:-translate-y-2"
          >
            <!-- Image Container -->
            <div class="relative overflow-hidden rounded-2xl">
              <img
                :src="getThumbnailUrl(podcast.yt_id)"
                :alt="podcast.title"
                class="w-full h-48 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                @error="handleImageError"
              />
              <!-- Play Button -->
              <div
                class="absolute inset-0 bg-green-600/30 backdrop-blur-3xl bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div
                  class="bg-white/40 hover:bg-white backdrop-blur-3xl rounded-full p-3 shadow-lg"
                >
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
            <div
              class="p-5 rounded-2xl group-hover:bg-white shadow-md mt-5 mb-5"
            >
              <p class="text-xs text-green-600 font-semibold mb-1">
                {{ getCategoryName(podcast) }}
              </p>
              <h3
                class="text-base font-semibold text-gray-900 mb-2 line-clamp-2 h-12"
              >
                {{ podcast.title }}
              </h3>
              <p class="text-gray-500 text-xs">
                {{ formatDate(podcast.pub_date) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="podcasts.length > itemsPerPage"
        :total-items="podcasts.length"
        :items-per-page="itemsPerPage"
        :model-value="currentPage"
        @page-changed="handlePageChange"
        class="mt-10"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/Layout/Pagination.vue";
import { usePodcastStore } from "@/stores/podcast";

// Gunakan podcast store
const podcastStore = usePodcastStore();

// State management
const currentPage = ref(1);
const itemsPerPage = ref(3);

const podcasts = computed(() => {
  // Urutkan berdasarkan tanggal publikasi (terbaru dulu)
  return [...podcastStore.list].sort(
    (a, b) => new Date(b.pub_date) - new Date(a.pub_date)
  );
});

// Paginated podcasts
const paginatedPodcasts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return podcasts.value.slice(start, end);
});

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
    const url = `https://www.youtube.com/watch?v=${ytId}`;
    window.open(url, "_blank");
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

// Fungsi untuk memuat data
const loadPodcasts = () => {
  podcastStore.fetchAll();
};

onMounted(() => {
  loadPodcasts();
});
</script>

<style scoped>
/* Line clamp for title */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
