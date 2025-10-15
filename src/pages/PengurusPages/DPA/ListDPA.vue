<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Dewan Pengawas Asosiasi (DPA) APTIKNAS
      </h1>
      <p class="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Para profesional berpengalaman yang mengawasi dan membimbing
        perkembangan Asosiasi Pengusaha TIK Nasional
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pengurusStore.loading" class="text-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"
      ></div>
      <p class="text-gray-500">Memuat data pengurus...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="pengurusStore.error" class="text-center py-12 text-red-500">
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
        <router-link
          v-for="member in dpaMembers"
          :key="member.id"
          :to="`/pengurus/${member.id}`"
        >
          <CardProfile
            :name="member.name"
            :position="member.position"
            :location="member.location"
            :image="member.image"
            :social="member.social"
            class="scale-95 hover:scale-100 transition-transform duration-200"
          />
        </router-link>
      </div>

      <!-- Empty State -->
      <div
        v-if="dpaMembers.length === 0"
        class="text-center py-12 text-gray-500"
      >
        <i class="far fa-users text-4xl mb-4"></i>
        <p>Tidak ada data Dewan Pengawas Asosiasi yang tersedia.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePengurusStore } from "@/stores/pengurus";
import CardProfile from "@/components/Layout/CardProfile.vue";

// Gunakan pengurus store
const pengurusStore = usePengurusStore();

// Filter data hanya untuk Dewan Pengawas Asosiasi
const dpaMembers = computed(() => {
  const storeData = pengurusStore.list;
  if (!storeData) return [];

  // Handle struktur response yang berbeda
  let dataArray = [];
  if (Array.isArray(storeData)) {
    dataArray = storeData;
  } else if (storeData.data && Array.isArray(storeData.data.data)) {
    // Format dengan pagination: { data: { data: [...] } }
    dataArray = storeData.data.data;
  } else if (storeData.data && Array.isArray(storeData.data)) {
    // Format: { data: [...] }
    dataArray = storeData.data;
  }

  // Filter hanya data dengan kategori "Dewan Pengawas Asosiasi"
  const filteredData = dataArray.filter((item) => {
    return (
      item.category_pengurus &&
      item.category_pengurus.name &&
      item.category_pengurus.name
        .toLowerCase()
        .includes("dewan pengawas asosiasi")
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

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (item) => {
  // Prioritaskan image_url dari API jika tersedia dan valid
  if (item.image_url && item.image_url.startsWith("http")) {
    return item.image_url;
  }
  // Fallback ke path gambar relatif
  if (item.image) {
    const baseUrl =
      import.meta.env.VITE_STORAGE_URL || "https://cms-aptiknas.hexagon.co.id";
    // Pastikan path tidak diawali dengan slash ganda
    return `${baseUrl}/storage/${item.image.replace(/^\//, "")}`;
  }
  // Fallback ke placeholder jika tidak ada gambar
  return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
};

// Fungsi untuk memuat data
const loadPengurusData = () => {
  pengurusStore.fetchAll();
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
