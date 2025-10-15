<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Dewan Pengurus Pusat (DPP) APTIKNAS
      </h1>
      <p class="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Para profesional berpengalaman yang mengawasi dan membimbing
        perkembangan Asosiasi Pengusaha TIK Nasional
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pengurusStore.loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"
      ></div>
      <p class="mt-3 text-sm text-gray-600">Memuat data anggota...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="pengurusStore.error" class="text-center py-8 text-red-500">
      <p>Gagal memuat data pengurus.</p>
      <p class="text-sm mb-4">{{ pengurusStore.error }}</p>
      <button
        @click="loadPengurusData"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Content -->
    <div v-else class="max-w-6xl mx-auto">
      <!-- Grid Layout - More compact -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-8"
      >
        <CardProfile
          v-for="member in paginatedMembers"
          :key="member.id"
          :name="member.name"
          :position="member.position"
          :location="member.location"
          :image="member.image"
          :social="member.social"
          class="scale-95 hover:scale-100 transition-transform duration-200"
        />
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="members.length > itemsPerPage"
        :total-items="members.length"
        :items-per-page="itemsPerPage"
        :model-value="currentPage"
        @page-changed="handlePageChange"
        class="mt-8"
      />

      <!-- Empty State -->
      <div
        v-if="members.length === 0 && !pengurusStore.loading"
        class="text-center py-8"
      >
        <p class="text-gray-500 text-sm">
          Belum ada data anggota yang tersedia.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePengurusStore } from "@/stores/pengurus";
import CardProfile from "@/components/Layout/CardProfile.vue";
import Pagination from "@/components/Layout/Pagination.vue";

// Gunakan pengurus store
const pengurusStore = usePengurusStore();

const currentPage = ref(1);
const itemsPerPage = ref(8); // Reduced items per page for better compactness

// Filter data hanya untuk Dewan Pengurus Pusat
const members = computed(() => {
  if (!pengurusStore.list || !pengurusStore.list.data) return [];

  // Handle struktur response yang berbeda
  let dataArray = [];

  if (Array.isArray(pengurusStore.list.data)) {
    // Response format: { success: true, data: [...] }
    dataArray = pengurusStore.list.data;
  } else if (
    pengurusStore.list.data &&
    Array.isArray(pengurusStore.list.data.data)
  ) {
    // Response format dengan pagination
    dataArray = pengurusStore.list.data.data;
  } else if (Array.isArray(pengurusStore.list)) {
    // Response langsung array
    dataArray = pengurusStore.list;
  }

  // Filter hanya data dengan kategori "Dewan Pengurus Pusat"
  const filteredData = dataArray.filter((item) => {
    // Cek apakah category_pengurus.name mengandung "Dewan Pengurus Pusat"
    return (
      item.category_pengurus &&
      item.category_pengurus.name &&
      item.category_pengurus.name.toLowerCase().includes("dewan pengurus pusat")
    );
  });

  // Format data untuk komponen CardProfile
  return filteredData.map((item) => {
    // Format social media links
    const social = [];
    if (item.fb) social.push({ name: "facebook", url: item.fb });
    if (item.ig) social.push({ name: "instagram", url: item.ig });
    if (item.tiktok) social.push({ name: "tiktok", url: item.tiktok });
    if (item.yt) social.push({ name: "youtube", url: item.yt });

    return {
      id: item.id,
      name: item.title || "Nama tidak tersedia",
      position: item.jabatan || item.category_pengurus?.name || "Anggota",
      location: item.address || "Lokasi tidak tersedia",
      image: getImageUrl(item),
      social: social,
    };
  });
});

// Compute paginated members
const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return members.value.slice(start, end);
});

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (item) => {
  const imagePath = item.image_url || item.image;
  if (!imagePath) {
    return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
  }
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  const baseUrl =
    import.meta.env.VITE_STORAGE_URL || "https://cms-aptiknas.hexagon.co.id";
  if (imagePath.startsWith("storage/")) {
    return `${baseUrl}/${imagePath}`;
  }
  return `${baseUrl}/storage/${imagePath}`;
};

// Fungsi untuk memuat data
const loadPengurusData = () => {
  pengurusStore.fetchAll();
};

const handlePageChange = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  // Load data pengurus saat komponen dimount
  loadPengurusData();
});
</script>

<style scoped>
/* Custom compact styling */
.scale-95 {
  transform: scale(0.95);
}
.scale-100 {
  transform: scale(1);
}

.transition-transform {
  transition: transform 0.2s ease-in-out;
}

/* Improved grid spacing */
.gap-4 > * {
  margin: 0.5rem;
}

/* Better text proportions */
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
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
