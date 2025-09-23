<template>
  <!-- Berita Terbaru -->
  <div class="text-center mb-10">
    <!-- Judul responsif -->
    <h2
      class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 mb-3"
    >
      Berita Terbaru APTIKNAS
    </h2>
    <!-- Deskripsi responsif -->
    <p
      class="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto"
    >
      Ikuti kabar terbaru dari Asosiasi Pengusaha TIK Nasional — mulai dari
      pelatihan, seminar, hingga perkembangan terkini seputar industri teknologi
      informasi dan komunikasi.
    </p>
  </div>

  <!-- Loading State -->
  <div v-if="galleryStore.loading" class="text-center text-gray-500 py-12">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#511378] mx-auto mb-4"
    ></div>
    <p>Memuat berita...</p>
  </div>

  <!-- Error State -->
  <div v-else-if="galleryStore.error" class="text-center text-red-500 py-12">
    <p>Gagal memuat berita. Silakan coba lagi nanti.</p>
    <p class="text-sm">{{ galleryStore.error }}</p>
    <button
      @click="loadGalleryData"
      class="mt-4 bg-[#511378] text-white px-4 py-2 rounded hover:bg-[#3a0d57] transition-colors"
    >
      Coba Lagi
    </button>
  </div>

  <!-- Daftar Berita -->
  <div
    v-else-if="paginatedPosts && paginatedPosts.length > 0"
    class="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
  >
    <RouterLink
      v-for="(post, index) in paginatedPosts"
      :key="post.id"
      :to="`/news/${post.id}`"
      class="hover:bg-white rounded-2xl p-4 hover:shadow-md transition max-w-[19rem] sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] xl:max-w-[26rem] 2xl:max-w-[28rem] mx-auto flex flex-col"
      data-aos="fade-up"
      :data-aos-delay="index * 100"
      :data-aos-once="false"
    >
      <!-- Image container -->
      <div class="relative mb-4">
        <img
          :src="getImageUrl(post.image)"
          :alt="post.title"
          class="rounded-xl w-full h-40 sm:h-44 md:h-48 lg:h-56 xl:h-60 2xl:h-72 object-cover"
          data-aos="zoom-in"
          data-aos-delay="150"
          :data-aos-once="false"
          @error="handleImageError(post)"
        />
        <span class="absolute bottom-4 left-4">
          <span class="relative inline-flex items-center justify-center">
            <!-- Background liquid glass -->
            <span
              class="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/30 backdrop-blur-md rounded-lg border border-green-600 shadow-lg"
            ></span>
            <!-- Animated blobs -->
            <span
              class="absolute top-1 left-1 size-1.5 bg-white/20 rounded-xs animate-pulse"
            ></span>
            <span
              class="absolute bottom-1 right-1 size-1 bg-white/30 rounded-xs animate-pulse delay-300"
            ></span>
            <!-- Text -->
            <span
              class="relative z-10 text-white text-center text-xs font-medium px-3 py-1"
            >
              {{ getCategoryName(post) }}
            </span>
          </span>
        </span>
      </div>

      <!-- Content Wrapper -->
      <div class="flex flex-col flex-grow justify-between">
        <!-- Judul berita responsif -->
        <h3
          class="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-snug line-clamp-3"
        >
          {{ post.title }}
        </h3>
        <!-- TimeRead -->
        <div class="flex items-center gap-2 mt-auto border-t pt-2">
          <span class="text-gray-500 text-xs">{{
            formatDate(post.pub_date)
          }}</span>
          <div class="border-l border-gray-400 h-3"></div>
          <span class="text-gray-500 text-xs">{{
            post.waktu_baca || "5 min read"
          }}</span>
        </div>
      </div>
    </RouterLink>
  </div>

  <div v-else class="text-center text-gray-500 py-12">
    <i class="far fa-newspaper text-4xl mb-4"></i>
    <p>Tidak ada berita untuk ditampilkan.</p>
  </div>

  <!-- Pagination -->
  <Pagination
    v-if="posts && posts.length > itemsPerPage"
    :total-items="posts.length"
    :items-per-page="itemsPerPage"
    :model-value="currentPage"
    @page-changed="handlePageChange"
    class="mt-10"
  />
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useGalleryStore } from "@/stores/gallery";
import Pagination from "@/components/layout/Pagination.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const galleryStore = useGalleryStore();

// Pagination setup
const currentPage = ref(1);
const itemsPerPage = ref(3);

// Mengambil data dari store
const posts = computed(() => {
  console.log("Gallery store data:", galleryStore.list);

  // Cek berbagai kemungkinan struktur data
  if (Array.isArray(galleryStore.list)) {
    return galleryStore.list;
  }
  if (galleryStore.list && Array.isArray(galleryStore.list.data)) {
    return galleryStore.list.data;
  }
  if (
    galleryStore.list &&
    galleryStore.list.data &&
    Array.isArray(galleryStore.list.data.data)
  ) {
    return galleryStore.list.data.data;
  }
  if (
    galleryStore.list &&
    galleryStore.list.status &&
    Array.isArray(galleryStore.list.data.data)
  ) {
    return galleryStore.list.data.data;
  }

  console.warn("Struktur data gallery tidak dikenali:", galleryStore.list);
  return [];
});

const paginatedPosts = computed(() => {
  if (!posts.value) return [];

  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return posts.value.slice(start, end);
});

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (imagePath) => {
  if (!imagePath)
    return "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  // Jika gambar sudah berupa URL lengkap, langsung kembalikan
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Jika gambar adalah path relatif, tambahkan base URL
  const baseUrl = "http://127.0.0.1:8000";
  return `${baseUrl}/storage/${imagePath}`;
};

// Handle error gambar
const handleImageError = (post) => {
  console.error("Gagal memuat gambar untuk berita:", post.title);
  // Fallback ke gambar default
  return "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
};

// Format tanggal untuk ditampilkan
const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 hari lalu";
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;

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
const getCategoryName = (post) => {
  if (post.category && post.category.name) {
    return post.category.name;
  }
  if (post.category_gallery_id) {
    return `Kategori ${post.category_gallery_id}`;
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

// Fungsi untuk memuat data gallery
const loadGalleryData = async () => {
  try {
    await galleryStore.fetchAll();
    console.log("Gallery data loaded:", posts.value);
  } catch (error) {
    console.error("Failed to load gallery data:", error);
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
  // Refresh AOS ketika halaman berubah
  setTimeout(() => {
    AOS.refresh();
  }, 50);
};

// Inisialisasi AOS
onMounted(() => {
  AOS.init({
    duration: 600,
    easing: "ease-out-quad",
    once: false,
    offset: 20,
  });

  // Load data gallery
  loadGalleryData();
});

// Refresh AOS ketika data posts berubah
watch(posts, () => {
  setTimeout(() => {
    AOS.refresh();
  }, 100);
});
</script>

<style scoped>
.router-link {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.router-link:hover {
  transform: translateY(-5px);
}

/* Line clamp for title */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
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
