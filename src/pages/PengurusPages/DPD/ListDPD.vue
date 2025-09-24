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
    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"
      ></div>
      <p class="mt-3 text-sm text-gray-600">Memuat data anggota...</p>
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
      <div v-if="filteredMembers.length === 0" class="text-center py-8">
        <p class="text-gray-500 text-sm">
          Tidak ada data anggota yang sesuai dengan filter.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import CardProfile from "@/components/Layout/CardProfile.vue";
import Pagination from "@/components/Layout/Pagination.vue";

// Data dummy lengkap untuk semua jenis keanggotaan APTIKNAS
const members = ref([
  // Dewan Pengawas Asosiasi (DPA)
  {
    id: 1,
    name: "Dr. Bambang Sutrisno",
    position: "Ketua Dewan Pengawas",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "dpa",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Ir. Suryo Handono, M.Sc.",
    position: "Anggota Dewan Pengawas",
    location: "Bandung",
    region: "Jawa Barat",
    type: "dpa",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Diana Pratiwi, S.Kom., M.T.I.",
    position: "Anggota Dewan Pengawas",
    location: "Surabaya",
    region: "Jawa Timur",
    type: "dpa",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },

  // Dewan Pengurus Pusat (DPP)
  {
    id: 4,
    name: "Dr. Rudi Hartono, S.T., M.Kom.",
    position: "Ketua Umum DPP APTIKNAS",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "dpp",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Maya Sari, S.E., M.M.",
    position: "Wakil Ketua DPP - Bidang Keuangan",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "dpp",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Ahmad Fauzi, S.Kom., M.Sc.",
    position: "Wakil Ketua DPP - Bidang Teknologi",
    location: "Bandung",
    region: "Jawa Barat",
    type: "dpp",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },

  // Dewan Pengurus Daerah (DPD) - Contoh beberapa daerah
  {
    id: 7,
    name: "Budi Santoso, S.T.",
    position: "Ketua DPD Jawa Barat",
    location: "Bandung",
    region: "Jawa Barat",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 8,
    name: "Siti Rahayu, S.Kom.",
    position: "Ketua DPD Jawa Timur",
    location: "Surabaya",
    region: "Jawa Timur",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 9,
    name: "Joko Widodo, S.E.",
    position: "Ketua DPD Jawa Tengah",
    location: "Semarang",
    region: "Jawa Tengah",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 10,
    name: "Dewi Kusuma, M.T.",
    position: "Ketua DPD Bali",
    location: "Denpasar",
    region: "Bali",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 11,
    name: "Andi Rahman, S.Kom.",
    position: "Ketua DPD Sumatra Utara",
    location: "Medan",
    region: "Sumatra Utara",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 12,
    name: "Rina Wijaya, M.M.",
    position: "Ketua DPD Sumatra Selatan",
    location: "Palembang",
    region: "Sumatra Selatan",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },

  // Dewan Penasehat Asosiasi
  {
    id: 13,
    name: "Prof. Dr. Ir. H. Muhammad Anis, M.M.",
    position: "Ketua Dewan Penasehat",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "penasehat",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 14,
    name: "Dr. Hj. Siti Fatimah, S.E., M.Si.",
    position: "Anggota Dewan Penasehat",
    location: "Yogyakarta",
    region: "DI Yogyakarta",
    type: "penasehat",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 15,
    name: "Ir. H. Bambang Soedarmono, M.T.",
    position: "Anggota Dewan Penasehat",
    location: "Surabaya",
    region: "Jawa Timur",
    type: "penasehat",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },

  // Tambahan anggota lainnya untuk melengkapi
  {
    id: 16,
    name: "Rudi Hermawan, S.Kom.",
    position: "Sekretaris DPD Jawa Barat",
    location: "Bandung",
    region: "Jawa Barat",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 17,
    name: "Linda Sari, M.Kom.",
    position: "Bendahara DPP APTIKNAS",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "dpp",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 18,
    name: "Hendra Gunawan, S.T.",
    position: "Koordinator DPD Banten",
    location: "Serang",
    region: "Banten",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 19,
    name: "Fitri Ayu, S.E.",
    position: "Koordinator DPD Lampung",
    location: "Bandar Lampung",
    region: "Lampung",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 20,
    name: "Agus Salim, M.T.",
    position: "Koordinator DPD Kalimantan Timur",
    location: "Samarinda",
    region: "Kalimantan Timur",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 21,
    name: "Nina Kurnia, S.Kom.",
    position: "Koordinator DPD Sulawesi Selatan",
    location: "Makassar",
    region: "Sulawesi Selatan",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 22,
    name: "Bambang Wijaya, M.M.",
    position: "Koordinator DPD Nusa Tenggara Barat",
    location: "Mataram",
    region: "Nusa Tenggara Barat",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 23,
    name: "Dewi Sartika, S.T.",
    position: "Koordinator DPD Papua",
    location: "Jayapura",
    region: "Papua",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 24,
    name: "Rizky Pratama, M.Kom.",
    position: "Koordinator DPD Riau",
    location: "Pekanbaru",
    region: "Riau",
    type: "dpd",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
]);

// Regions data
const regions = computed(() => {
  return [...new Set(members.value.map((member) => member.region))].sort();
});

// Search and Filter functionality
const searchQuery = ref("");
const selectedType = ref("");
const selectedRegion = ref("");
const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(9);

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
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 800);
});
</script>
<style scoped module>
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
</style>
