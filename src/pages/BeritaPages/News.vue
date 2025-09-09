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

  <!-- Daftar Berita -->
  <div v-if="loading" class="text-center text-gray-500">Memuat berita...</div>
  <div
    v-else-if="paginatedPosts && paginatedPosts.length > 0"
    class="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
  >
    <RouterLink
      v-for="(post, index) in paginatedPosts"
      :key="post.slug"
      :to="`/news/${post.slug}`"
      class="hover:bg-white rounded-2xl p-4 hover:shadow-md transition max-w-[19rem] sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] xl:max-w-[26rem] 2xl:max-w-[28rem] mx-auto block"
      data-aos="fade-up"
      :data-aos-delay="index * 100"
      :data-aos-once="false"
    >
      <!-- Image container -->
      <div class="relative mb-4">
        <img
          :src="post.image"
          alt="Gambar Berita"
          class="rounded-xl w-full h-40 sm:h-44 md:h-48 lg:h-56 xl:h-60 2xl:h-72 object-cover"
          data-aos="zoom-in"
          data-aos-delay="150"
          :data-aos-once="false"
        />
        <span class="absolute bottom-4 left-4">
          <span class="relative inline-block">
            <!-- Background liquid glass -->
            <span
              class="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/30 backdrop-blur-md rounded-full border border-green-600 shadow-lg"
            ></span>
            <!-- Animated blobs -->
            <span
              class="absolute top-1/4 left-1/4 w-3 h-3 bg-white/20 rounded-full animate-pulse"
            ></span>
            <span
              class="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-300"
            ></span>
            <!-- Text -->
            <span
              class="relative z-10 text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              {{ post.category }}
            </span>
          </span>
        </span>
      </div>
     
      <!-- Judul berita responsif -->
      <h3
        class="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-snug"
      >
        {{ post.title }}
      </h3>
      <div class="flex items-center gap-2 mb-2 grid-cols-3 border-t pt-2">
        <span class="text-gray-500 text-xs grid-cols-1 w-full order-1">{{ post.duration }}</span>
        <div class="border-black border-r-1 h-3 order-2"></div>
        <span class="text-gray-500 text-xs grid-cols-1 w-full order-3">{{ post.duration }}</span>
      </div> 
    </RouterLink>
  </div>
  <div v-else class="text-center text-gray-500">
    Tidak ada berita untuk ditampilkan.
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
import Pagination from "@/components/layout/Pagination.vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Data dummy untuk berita APTIKNAS
const posts = ref([
  {
    slug: "seminar-digital-transformation-2024",
    title:
      "Seminar Digital Transformation 2024: Transformasi Digital untuk UMKM",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Seminar",
    duration: "2 hari lalu",
    content:
      "Seminar tentang transformasi digital untuk UMKM dengan pembicara ahli dari industri teknologi.",
  },
  {
    slug: "aptiknas-tech-awards-2024",
    title:
      "APTIKNAS Tech Awards 2024: Apresiasi untuk Inovator Teknologi Nasional",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Event",
    duration: "1 minggu lalu",
    content:
      "Penghargaan tahunan untuk inovator dan pengusaha teknologi yang berkontribusi bagi perkembangan TIK nasional.",
  },
  {
    slug: "workshop-cybersecurity",
    title: "Workshop Cybersecurity: Perlindungan Data di Era Digital",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Workshop",
    duration: "3 hari lalu",
    content:
      "Workshop intensif tentang keamanan siber untuk melindungi data bisnis dari ancaman digital.",
  },
  {
    slug: "peluncuran-program-startup",
    title: "Peluncuran Program Startup Incubation APTIKNAS 2024",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Program",
    duration: "5 hari lalu",
    content:
      "Program inkubasi startup teknologi untuk mendukung pengusaha pemula dalam mengembangkan bisnis digital.",
  },
  {
    slug: "kerjasama-aptiknas-google",
    title: "Kerjasama Strategis APTIKNAS dengan Google Cloud Indonesia",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Kerjasama",
    duration: "1 minggu lalu",
    content:
      "Kerjasama dalam pengembangan skill cloud computing untuk anggota APTIKNAS.",
  },
  {
    slug: "konferensi-industry-4.0",
    title:
      "Konferensi Nasional Industry 4.0: Menyongsong Era Digitalisasi Industri",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Konferensi",
    duration: "2 minggu lalu",
    content:
      "Konferensi membahas implementasi Industry 4.0 di berbagai sektor industri Indonesia.",
  },
]);

const loading = ref(false);

// Pagination setup
const currentPage = ref(1);
const itemsPerPage = ref(3);

const paginatedPosts = computed(() => {
  if (!posts.value) return [];

  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return posts.value.slice(start, end);
});

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

/* Custom styling untuk kategori */
.bg-green-600 {
  background-color: #16a34a;
}
</style>
