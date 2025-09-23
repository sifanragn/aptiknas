<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4">
      <div class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#511378] mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Memuat berita...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-4">
      <div class="text-center py-12 text-red-500">
        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <p class="text-xl font-semibold mb-2">Gagal memuat berita</p>
        <p class="text-sm mb-4">{{ error }}</p>
        <button
          @click="fetchNewsDetail"
          class="bg-[#511378] text-white px-6 py-2 rounded-lg hover:bg-[#3a0d57] transition-colors"
        >
          Coba Lagi
        </button>
        <RouterLink
          to="/news"
          class="ml-4 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Kembali ke Berita
        </RouterLink>
      </div>
    </div>

    <!-- News Content -->
    <div v-else-if="news" class="container mx-auto px-4 max-w-4xl">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol class="list-none p-0 inline-flex">
          <li class="flex items-center">
            <RouterLink to="/" class="hover:text-[#511378] transition-colors"
              >Home</RouterLink
            >
            <svg
              class="w-3 h-3 mx-2"
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
          </li>
          <li class="flex items-center">
            <RouterLink
              to="/news"
              class="hover:text-[#511378] transition-colors"
              >Berita</RouterLink
            >
            <svg
              class="w-3 h-3 mx-2"
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
          </li>
          <li class="text-gray-700">{{ news.title }}</li>
        </ol>
      </nav>

      <!-- Article Header -->
      <article class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Featured Image -->
        <div class="relative h-64 md:h-80 lg:h-96">
          <img
            :src="getImageUrl(news.image)"
            :alt="news.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <div class="absolute inset-0 bg-black bg-opacity-20"></div>

          <!-- Category Badge -->
          <div class="absolute top-6 left-6">
            <span
              class="bg-[#511378] text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              {{ getCategoryName(news) }}
            </span>
          </div>
        </div>

        <!-- Article Content -->
        <div class="p-6 md:p-8">
          <!-- Title -->
          <h1
            class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            {{ news.title }}
          </h1>

          <!-- Meta Information -->
          <div
            class="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600"
          >
            <div class="flex items-center">
              <i class="far fa-calendar-alt mr-2"></i>
              <span>{{ formatDate(news.pub_date) }}</span>
            </div>
            <div class="flex items-center">
              <i class="far fa-clock mr-2"></i>
              <span>{{ news.waktu_baca || "5 min read" }}</span>
            </div>
            <div class="flex items-center">
              <i class="far fa-eye mr-2"></i>
              <span>{{ views }}x dilihat</span>
            </div>
          </div>

          <!-- Description -->
          <div
            class="prose prose-lg max-w-none mb-8"
            v-html="news.description"
          ></div>

          <!-- Share Buttons -->
          <div class="border-t pt-6 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Bagikan berita ini
            </h3>
            <div class="flex gap-3">
              <button
                @click="shareFacebook"
                class="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Share on Facebook"
              >
                <i class="fab fa-facebook-f"></i>
              </button>
              <button
                @click="shareTwitter"
                class="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
                aria-label="Share on Twitter"
              >
                <i class="fab fa-twitter"></i>
              </button>
              <button
                @click="shareLinkedIn"
                class="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <i class="fab fa-linkedin-in"></i>
              </button>
              <button
                @click="shareWhatsApp"
                class="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <i class="fab fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>
      </article>

      <!-- Related News -->
      <div v-if="relatedNews.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Berita Terkait</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            v-for="related in relatedNews"
            :key="related.id"
            :to="`/news/${generateSlug(related.title)}`"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              :src="getImageUrl(related.image)"
              :alt="related.title"
              class="w-full h-40 object-cover"
            />
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 line-clamp-2 mb-2">
                {{ related.title }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ formatDate(related.pub_date) }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-12">
        <RouterLink
          to="/news"
          class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali ke Daftar Berita
        </RouterLink>
      </div>
    </div>

    <!-- 404 State -->
    <div v-else class="container mx-auto px-4">
      <div class="text-center py-12">
        <i class="fas fa-newspaper text-6xl text-gray-300 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-700 mb-4">
          Berita Tidak Ditemukan
        </h2>
        <p class="text-gray-600 mb-6">
          Berita yang Anda cari tidak ditemukan atau mungkin telah dihapus.
        </p>
        <RouterLink
          to="/news"
          class="bg-[#511378] text-white px-6 py-3 rounded-lg hover:bg-[#3a0d57] transition-colors"
        >
          Kembali ke Daftar Berita
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGalleryStore } from "@/stores/gallery";

const route = useRoute();
const router = useRouter();
const galleryStore = useGalleryStore();

const news = ref(null);
const loading = ref(true);
const error = ref(null);
const views = ref(0);

// Extract news ID from route params
const newsId = computed(() => {
  // Coba dapatkan ID dari route params atau dari slug
  return route.params.id || route.params.slug;
});

// Computed property to safely get the list of news from various possible data structures
const allNews = computed(() => {
  const list = galleryStore.list;
  if (Array.isArray(list)) {
    return list;
  }
  if (list && Array.isArray(list.data)) {
    return list.data;
  }
  if (list && list.data && Array.isArray(list.data.data)) {
    return list.data.data;
  }
  return [];
});

// Fetch news detail
const fetchNewsDetail = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Cari berita dari store berdasarkan ID atau slug
    let foundNews = null;

    if (allNews.value.length > 0) {
      // Cari di data yang sudah dimuat
      foundNews = allNews.value.find(
        (item) =>
          item.id.toString() === newsId.value ||
          generateSlug(item.title) === newsId.value
      );
    }

    if (foundNews) {
      news.value = foundNews;
      incrementViews();
    } else {
      // Jika tidak ditemukan di store, coba fetch by ID
      await galleryStore.fetchPostById(newsId.value);
      if (galleryStore.detail) {
        news.value = galleryStore.detail;
        incrementViews();
      } else {
        throw new Error("Berita tidak ditemukan");
      }
    }
  } catch (err) {
    console.error("Error fetching news detail:", err);
    error.value = err.message || "Gagal memuat detail berita";
  } finally {
    loading.value = false;
  }
};

// Simulasi increment views
const incrementViews = () => {
  views.value = Math.floor(Math.random() * 100) + 50; // Random views for demo
};

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (imagePath) => {
  if (!imagePath)
    return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const baseUrl = "http://127.0.0.1:8000";
  return `${baseUrl}/${imagePath}`;
};

// Handle error gambar
const handleImageError = (event) => {
  event.target.src =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
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

// Dapatkan nama kategori
const getCategoryName = (newsItem) => {
  if (newsItem.category && newsItem.category.name) {
    return newsItem.category.name;
  }
  if (newsItem.category_gallery_id) {
    return `Kategori ${newsItem.category_gallery_id}`;
  }
  return "Berita";
};

// Generate slug dari title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

// Related news (dummy data for demo)
const relatedNews = computed(() => {
  if (!allNews.value.length) return [];

  return allNews.value.filter((item) => item.id !== news.value?.id).slice(0, 3);
});

// Share functions
const shareFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(news.value?.title || "");
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "_blank"
  );
};

const shareLinkedIn = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    "_blank"
  );
};

const shareWhatsApp = () => {
  const text = encodeURIComponent(
    `${news.value?.title || ""} - ${window.location.href}`
  );
  window.open(`https://wa.me/?text=${text}`, "_blank");
};

// Watch for route changes
watch(
  () => route.params.id,
  () => {
    if (route.name === "news-detail") {
      fetchNewsDetail();
    }
  }
);

// Initialize
onMounted(() => {
  fetchNewsDetail();
});
</script>

<style scoped>
.prose {
  color: #374151;
  line-height: 1.7;
}

.prose :deep(p) {
  margin-bottom: 1.25em;
}

.prose :deep(h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 2em;
  margin-bottom: 1em;
  color: #111827;
}

.prose :deep(h3) {
  font-size: 1.25em;
  font-weight: bold;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  color: #111827;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

.prose :deep(li) {
  margin-bottom: 0.5em;
}

.prose :deep(a) {
  color: #511378;
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: #3a0d57;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
