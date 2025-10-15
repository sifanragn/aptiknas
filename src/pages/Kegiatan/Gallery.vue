<template>
  <div class="min-h-screen w-full bg-gray-100 py-10 px-4">
    <h4 class="text-center mb-20 -mt-15 text-2xl font-bold text-gray-800">
      Tingkatkan Kompetensimu Bersama Kegiatan APTIKNAS
    </h4>

    <!-- Filter Buttons -->
    <div class="flex flex-wrap justify-center gap-3 mb-8">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="applyFilter(filter)"
        :class="[
          'px-4 py-2 rounded-full font-semibold text-sm transition',
          selectedFilter === filter
            ? 'bg-green-600 text-white shadow-md'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100',
        ]"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="agendaStore.loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"
      ></div>
      <p class="text-gray-500">Memuat kegiatan...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="agendaStore.error" class="text-center py-8 text-red-500">
      <p>Gagal memuat data kegiatan.</p>
      <p class="text-sm mb-4">{{ agendaStore.error }}</p>
      <button
        @click="loadAgendaData"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Image Grid with Natural Animations -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in filteredGallery"
        :key="item.id"
        class="relative w-full h-64 2xl:h-80 overflow-hidden rounded-xl shadow-lg ring-1 ring-gray-300 group"
        data-aos="fade-up"
        :data-aos-delay="index * 50"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="400"
      >
        <!-- Gambar dengan zoom halus -->
        <div class="relative group w-full h-full overflow-hidden rounded-xl">
          <!-- Gambar -->
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            @error="handleImageError"
          />

          <!-- Overlay Gradient + Text -->
          <div
            class="absolute inset-0 bg-gradient-to-b from-green-600/90 via-green-600/10 to-transparent flex flex-col justify-end items-start p-4 text-white transition-opacity duration-500 group-hover:opacity-0"
          >
            <h3 class="text-lg font-semibold">{{ item.title }}</h3>
            <p class="text-sm mt-1">{{ item.category }}</p>
          </div>
        </div>

        <!-- Detail gambar dengan animasi fade-in -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-green-600/90 via-green-600/40 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-y-6 group-hover:translate-y-0"
        >
          <!-- Tombol Lingkaran dengan Panah -->
          <button
            class="group flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-500 hover:bg-white hover:scale-110 active:scale-95"
            @click="viewDetails(item)"
          >
            <svg
              class="w-6 h-6 text-white transition-all duration-1000 group-hover:text-green-600 group-hover:-rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!agendaStore.loading && filteredGallery.length === 0"
      class="text-center py-10 text-gray-500"
    >
      Tidak ada kegiatan yang tersedia
    </div>

    <!-- Load More Button -->
    <div
      v-if="filteredGallery.length > 0 && !agendaStore.loading"
      class="flex justify-center mt-10"
    >
      <ShimmerButton
        background="#16a34a"
        class="px-6 py-3"
        @click="fetchMoreKegiatan"
      >
        Muat Lebih Banyak
      </ShimmerButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import AOS from "aos";
import ShimmerButton from "@/components/UI/shimmer-button/ShimmerButton.vue";
import "aos/dist/aos.css";

// Gunakan agenda store
const agendaStore = useAgendaStore();

const filters = ref([
  "All",
  "Seminar",
  "Workshop",
  "Pelatihan",
  "Networking",
  "Awards",
  "Konferensi",
]);
const selectedFilter = ref("All");

// Format data dari store untuk komponen
const galleryData = computed(() => {
  if (!agendaStore.list || agendaStore.list.length === 0) return [];

  return agendaStore.list.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.type || "Kegiatan",
    image: getImageUrl(item),
    description: stripHtmlTags(item.description),
    start_datetime: item.start_datetime,
    location: item.location,
    event_organizer: item.event_organizer,
    youtube_link: item.youtube_link,
  }));
});

// Computed property untuk data yang sudah difilter
const filteredGallery = computed(() => {
  if (selectedFilter.value === "All") {
    return galleryData.value;
  }
  return galleryData.value.filter(
    (item) => item.category === selectedFilter.value
  );
});

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (item) => {
  // Prioritaskan image_url dari API jika tersedia
  if (item.image_url) {
    return item.image_url;
  }

  // Fallback ke image path
  if (item.image) {
    const baseUrl =
      import.meta.env.VITE_STORAGE_URL || "https://cms-aptiknas.hexagon.co.id";

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
    return `${baseUrl}/storage/${item.image}`;
  }

  // Fallback ke placeholder jika tidak ada gambar
  return "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
};

// Handle error gambar
const handleImageError = (event) => {
  console.error("Gagal memuat gambar");
  event.target.src =
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
};

// Hapus tag HTML dari deskripsi
const stripHtmlTags = (html) => {
  if (!html) return "Tidak ada deskripsi";
  return html.replace(/<[^>]*>/g, "");
};

// Inisialisasi AOS dengan konfigurasi natural
onMounted(() => {
  AOS.init({
    duration: 400,
    easing: "ease-out-cubic",
    once: false,
    offset: 50,
    delay: 50,
  });

  // Load data agenda
  loadAgendaData();
});

// Fungsi untuk memuat data
const loadAgendaData = () => {
  agendaStore.fetchAll();
};

// Fungsi filter
const applyFilter = (filter) => {
  selectedFilter.value = filter;
};

// Fungsi untuk melihat detail
const viewDetails = (item) => {
  console.log("View details:", item);

  // Jika ada link YouTube, buka di tab baru
  if (item.youtube_link) {
    window.open(item.youtube_link, "_blank");
  } else {
    // Tampilkan detail dalam alert atau modal
    const detailText = `
Judul: ${item.title}
Kategori: ${item.category}
Lokasi: ${item.location || "Tidak tersedia"}
Penyelenggara: ${item.event_organizer || "Tidak tersedia"}
Tanggal: ${formatDate(item.start_datetime)}
Deskripsi: ${item.description}
    `.trim();

    alert(detailText);
  }
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
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "Format tanggal tidak valid";
  }
};

// Fungsi untuk load more (dummy function - bisa diimplementasikan dengan pagination API)
const fetchMoreKegiatan = () => {
  // Untuk sekarang, kita reload data saja
  // Di production, bisa implementasi pagination dengan API
  loadAgendaData();
};
</script>

<style>
/* Animasi lebih natural */
[data-aos] {
  transition-property: transform, opacity;
}

/* Efek hover yang lebih smooth */
.group:hover img {
  transform: scale(1.05) translateZ(0);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Transisi overlay */
.group > div {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Warna utama green-600 */
.bg-green-600 {
  background-color: #16a34a;
}

.hover\:bg-green-700:hover {
  background-color: #15803d;
}

.from-green-600\/90 {
  --tw-gradient-from: rgb(22 163 74 / 0.9);
  --tw-gradient-to: rgb(22 163 74 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.via-green-600\/10 {
  --tw-gradient-to: rgb(22 163 74 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), rgb(22 163 74 / 0.1),
    var(--tw-gradient-to);
}

.from-green-600\/90 {
  --tw-gradient-from: rgb(22 163 74 / 0.9);
  --tw-gradient-to: rgb(22 163 74 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.via-green-600\/40 {
  --tw-gradient-to: rgb(22 163 74 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), rgb(22 163 74 / 0.4),
    var(--tw-gradient-to);
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
