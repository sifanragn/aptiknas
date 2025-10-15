<template>
  <div class="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Struktur Keanggotaan APTIKNAS
      </h1>
      <p class="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
        APTIKNAS saat ini memiliki 24 Dewan Pengurus Daerah (DPD) dan berbagai
        dewan lainnya yang membimbing perkembangan Asosiasi Pengusaha TIK
        Nasional
      </p>
    </div>

    <!-- Search and Filter Section -->
    <div class="max-w-6xl mx-auto mb-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Search Input -->
        <div class="relative mb-4">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari anggota..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <!-- Filter Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Dewan Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <svg
                class="w-4 h-4 inline mr-1 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Jenis Dewan
            </label>
            <select
              v-model="selectedType"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Semua Dewan</option>
              <option value="dpa">Dewan Pengawas Asosiasi (DPA)</option>
              <option value="dpp">Dewan Pengurus Pusat (DPP)</option>
              <option value="dpd">Dewan Pengurus Daerah (DPD)</option>
              <option value="penasehat">Dewan Penasehat Asosiasi</option>
            </select>
          </div>

          <!-- Region Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <svg
                class="w-4 h-4 inline mr-1 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Wilayah
            </label>
            <select
              v-model="selectedRegion"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Semua Wilayah</option>
              <option v-for="region in regions" :key="region" :value="region">
                {{ region }}
              </option>
            </select>
          </div>
        </div>

        <!-- Masa Bakti Info -->
        <div
          v-if="selectedType === 'dpd'"
          class="mt-4 p-3 bg-green-50 rounded-lg"
        >
          <p class="text-sm text-green-800">
            <strong>Masa Bakti 2023-2028</strong> (Hasil Musda: 31 Oktober 2023)
          </p>
        </div>
      </div>
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
      <!-- Results Count -->
      <div class="mb-4 flex justify-between items-center">
        <p class="text-sm text-gray-600">
          Menampilkan {{ filteredMembers.length }} dari
          {{ members.length }} anggota
        </p>
        <button
          @click="resetFilters"
          class="text-sm text-green-600 hover:text-green-700 flex items-center"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset Filter
        </button>
      </div>

      <!-- Grid Layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
        v-if="filteredMembers.length > itemsPerPage"
        :total-items="filteredMembers.length"
        :items-per-page="itemsPerPage"
        :model-value="currentPage"
        @page-changed="handlePageChange"
        class="mt-8"
      />

      <!-- Empty State -->
      <div v-if="filteredMembers.length === 0 && !pengurusStore.loading" class="text-center py-8">
        <p class="text-gray-500 text-sm">
          Tidak ada data anggota yang sesuai dengan filter.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { usePengurusStore } from "@/stores/pengurus";
import CardProfile from "@/components/Layout/CardProfile.vue";
import Pagination from "@/components/Layout/Pagination.vue";

// Gunakan pengurus store
const pengurusStore = usePengurusStore();

// Search and Filter functionality
const searchQuery = ref("");
const selectedType = ref("");
const selectedRegion = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(9);

// Format data dari store untuk komponen
const members = computed(() => {
  if (!pengurusStore.list || !pengurusStore.list.data) return [];
  
  // Handle struktur response yang berbeda
  let dataArray = [];
  
  if (Array.isArray(pengurusStore.list.data)) {
    // Response format: { success: true, data: [...] }
    dataArray = pengurusStore.list.data;
  } else if (pengurusStore.list.data && Array.isArray(pengurusStore.list.data.data)) {
    // Response format dengan pagination
    dataArray = pengurusStore.list.data.data;
  } else if (Array.isArray(pengurusStore.list)) {
    // Response langsung array
    dataArray = pengurusStore.list;
  }
  
  // Format data untuk komponen CardProfile dengan mapping kategori
  return dataArray.map((item) => {
    // Tentukan jenis dewan berdasarkan kategori
    const categoryName = item.category_pengurus?.name?.toLowerCase() || '';
    let type = '';
    
    if (categoryName.includes('dewan pengawas asosiasi')) {
      type = 'dpa';
    } else if (categoryName.includes('dewan pengurus pusat')) {
      type = 'dpp';
    } else if (categoryName.includes('dewan pengurus daerah')) {
      type = 'dpd';
    } else if (categoryName.includes('penasehat')) {
      type = 'penasehat';
    }

    // Format social media links
    const social = [];
    if (item.fb) social.push({ name: 'facebook', url: item.fb });
    if (item.ig) social.push({ name: 'instagram', url: item.ig });
    if (item.tiktok) social.push({ name: 'tiktok', url: item.tiktok });
    if (item.yt) social.push({ name: 'youtube', url: item.yt });

    // Ekstrak region dari address
    const address = item.address || '';
    let region = '';
    if (address.includes(',')) {
      region = address.split(',').pop().trim();
    } else {
      region = address;
    }

    return {
      id: item.id,
      name: item.title || 'Nama tidak tersedia',
      position: item.jabatan || item.category_pengurus?.name || 'Anggota',
      location: address || 'Lokasi tidak tersedia',
      image: getImageUrl(item),
      social: social,
      type: type,
      region: region
    };
  });
});

// Regions data
const regions = computed(() => {
  return [...new Set(members.value.map((member) => member.region))].sort();
});

// Filtered members
const filteredMembers = computed(() => {
  return members.value.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.location.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesType =
      !selectedType.value || member.type === selectedType.value;
    const matchesRegion =
      !selectedRegion.value || member.region === selectedRegion.value;

    return matchesSearch && matchesType && matchesRegion;
  });
});

// Paginated members
const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredMembers.value.slice(start, end);
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
    if (item.image.startsWith("pengurus/")) {
      return `${baseUrl}/storage/${item.image}`;
    }
    
    if (item.image.startsWith("storage/pengurus/")) {
      return `${baseUrl}/${item.image}`;
    }
    
    if (item.image.startsWith("/")) {
      return `${baseUrl}${item.image}`;
    }
    
    // Default: tambahkan storage path
    return `${baseUrl}/storage/pengurus/${item.image}`;
  }

  // Fallback ke placeholder jika tidak ada gambar
  return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
};

// Fungsi untuk memuat data
const loadPengurusData = () => {
  pengurusStore.fetchAll();
};

// Handlers
const handlePageChange = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedType.value = "";
  selectedRegion.value = "";
  currentPage.value = 1;
};

// Watch filters to reset pagination
watch([searchQuery, selectedType, selectedRegion], () => {
  currentPage.value = 1;
});

onMounted(() => {
  // Load data pengurus saat komponen dimount
  loadPengurusData();
});
</script>

<style scoped>
.scale-95 {
  transform: scale(0.95);
}
.scale-100 {
  transform: scale(1);
}

.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.gap-4 > * {
  margin: 0.5rem;
}

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