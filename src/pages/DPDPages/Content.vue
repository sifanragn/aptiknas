<template>
  <div class="max-w-6xl mx-auto px-6 py-12 space-y-16">
    <!-- Loading State -->
    <div v-if="pengurusStore.loading" class="text-center py-16">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Memuat profil Ketua DPD...</p>
    </div>

    <!-- Error State dari API -->
    <div v-else-if="pengurusStore.error" class="text-center py-16 bg-red-50 rounded-2xl">
      <svg
        class="mx-auto h-12 w-12 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-red-900">
        Gagal Memuat Data
      </h3>
      <p class="mt-1 text-sm text-red-700">
        {{ pengurusStore.error }}
      </p>
      <button
        @click="loadData()"
        class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!ketuaDPD" class="text-center py-16 bg-gray-50 rounded-2xl">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">
        Profil Ketua DPD Belum Tersedia
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Informasi detail mengenai Ketua DPD untuk wilayah {{ currentDpdName }} belum tersedia.
      </p>
    </div>

    <!-- Content Sections -->
    <div
      v-else
      v-for="(item, index) in formattedSections"
      :key="index"
      class="grid md:grid-cols-2 gap-8 items-center"
    >
      <!-- Gambar (posisi bergantian kiri/kanan) -->
      <div
        :class="index % 2 === 0 ? 'order-1 md:order-1' : 'order-1 md:order-2'"
        class="flex justify-center"
        :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
      >
        <img
          :src="item.image_url"
          :alt="item.title"
          class="rounded-2xl w-full md:w-11/12 object-cover shadow-lg"
        />
      </div>

      <!-- Konten teks -->
      <div
        :class="index % 2 === 0 ? 'order-2 md:order-2' : 'order-2 md:order-1'"
        class="space-y-4"
        :data-aos="index % 2 === 0 ? 'fade-left' : 'fade-right'"
      >
        <h2 class="text-2xl font-bold text-gray-900">
          {{ item.title }}
        </h2>
        <div
          class="text-gray-700 leading-relaxed prose"
          v-html="item.content"
        ></div>
      </div>
    </div>

    <!-- Debug Info (hanya di development) -->
    <div v-if="isDevelopment && ketuaDPD" class="mt-8 p-4 bg-yellow-50 rounded-lg">
      <h4 class="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
      <p class="text-yellow-700 text-sm">
        Current DPD: {{ currentDpdName }}<br>
        Ketua DPD: {{ ketuaDPD.title }}<br>
        Category Daftar: {{ ketuaDPD.category_daftar?.name }}<br>
        Category Pengurus: {{ ketuaDPD.category_pengurus?.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { usePengurusStore } from "@/stores/pengurus";
import { useCategoryDaftarStore } from "@/stores/category-dpd";
import AOS from "aos";
import "aos/dist/aos.css";

const route = useRoute();
const pengurusStore = usePengurusStore();
const categoryDpdStore = useCategoryDaftarStore();
const isDevelopment = ref(import.meta.env.MODE === 'development');

// Helper functions
const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/800x600?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  const baseUrl = import.meta.env.VITE_STORAGE_URL || "https://cms-aptiknas.hexagon.co.id";
  return `${baseUrl}/storage/${imagePath}`;
};

// Get current DPD from URL
const currentDpdSlug = computed(() => {
  const pathSegments = route.path.split('/');
  const dpdIndex = pathSegments.findIndex(segment => segment === 'dpd');
  return pathSegments[dpdIndex + 1] || null;
});

const currentDpdName = computed(() => {
  if (!currentDpdSlug.value) return 'Unknown';
  
  // Convert slug back to readable name
  return currentDpdSlug.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('Dpd', 'DPD');
});

// Find matching category_daftar based on current DPD
const findMatchingCategory = (member) => {
  if (!member.category_daftar || !member.category_daftar.name) return false;
  
  const categoryName = member.category_daftar.name.toLowerCase();
  const currentDpd = currentDpdSlug.value.toLowerCase();
  
  // Check if category name contains the DPD name
  const categorySlug = generateSlug(categoryName);
  
  if (isDevelopment.value) {
    console.log(`🔍 Matching: ${categorySlug} vs ${currentDpd}`);
  }
  
  return categorySlug === currentDpd;
};

// Filter data untuk mendapatkan Ketua DPD yang sesuai dengan URL
const semuaKetuaDPD = computed(() => {
  if (!pengurusStore.list || pengurusStore.list.length === 0) {
    if (isDevelopment.value) {
      console.log("📭 Store list kosong atau belum terisi");
    }
    return [];
  }

  if (isDevelopment.value) {
    console.log("🔍 Mencari Ketua DPD untuk:", currentDpdSlug.value);
    console.log("📊 Data yang tersedia:", pengurusStore.list);
  }

  // Handle berbagai struktur response
  let dataArray = [];
  
  if (Array.isArray(pengurusStore.list)) {
    dataArray = pengurusStore.list;
  } else if (pengurusStore.list.data && Array.isArray(pengurusStore.list.data)) {
    dataArray = pengurusStore.list.data;
  } else if (pengurusStore.list.data && pengurusStore.list.data.data && Array.isArray(pengurusStore.list.data.data)) {
    dataArray = pengurusStore.list.data.data;
  }

  if (isDevelopment.value) {
    console.log("📋 Data array setelah processing:", dataArray);
  }

  const ketuaDPD = dataArray.filter((member) => {
    // Filter 1: Jabatan harus "Ketua"
    const isKetua = member.jabatan && member.jabatan.toLowerCase() === "ketua";
    if (!isKetua) {
      return false;
    }

    // Filter 2: Harus memiliki category_daftar yang sesuai dengan URL
    const isMatchingCategory = findMatchingCategory(member);
    if (!isMatchingCategory) {
      if (isDevelopment.value) {
        console.log(`❌ ${member.title} tidak matching dengan ${currentDpdSlug.value}`);
      }
      return false;
    }

    // Filter 3: Harus bagian dari Dewan Pengurus Daerah
    const isDPD = member.category_pengurus && 
                  member.category_pengurus.name && 
                  member.category_pengurus.name.toLowerCase().includes("dewan pengurus daerah");

    if (!isDPD) {
      if (isDevelopment.value) {
        console.log(`❌ ${member.title} bukan DPD (kategori: ${member.category_pengurus?.name})`);
      }
      return false;
    }

    if (isDevelopment.value) {
      console.log(`✅ Ditemukan Ketua DPD: ${member.title} - ${member.category_daftar.name}`);
    }
    return true;
  });

  if (isDevelopment.value) {
    console.log(`📊 Total Ketua DPD ditemukan untuk ${currentDpdSlug.value}: ${ketuaDPD.length}`);
  }

  return ketuaDPD;
});

// Ambil Ketua DPD pertama (atau sesuaikan dengan logika bisnis)
const ketuaDPD = computed(() => {
  const ketuaList = semuaKetuaDPD.value;
  
  if (ketuaList.length === 0) {
    if (isDevelopment.value) {
      console.log("📭 Tidak ada Ketua DPD yang ditemukan untuk:", currentDpdSlug.value);
    }
    return null;
  }

  // Jika ada multiple Ketua DPD, ambil yang pertama
  const selectedKetua = ketuaList[0];
  
  if (isDevelopment.value) {
    console.log(`🎯 Menggunakan Ketua DPD: ${selectedKetua.title} - ${selectedKetua.category_daftar.name}`);
  }
  
  return selectedKetua;
});

// Format sections mulai dari title2, tanpa social media
const formattedSections = computed(() => {
  if (!ketuaDPD.value) {
    if (isDevelopment.value) {
      console.log("📭 Tidak ada ketua DPD untuk diformat");
    }
    return [];
  }

  const member = ketuaDPD.value;
  
  if (isDevelopment.value) {
    console.log("🎨 Memformat sections untuk:", member.title);
  }
  
  const sections = [];

  // Mulai dari title2 (sesuai permintaan)
  if (member.title2 && member.description2) {
    sections.push({
      title: member.title2,
      content: member.description2,
      image_url: member.image2_url || getImageUrl(member.image2),
    });
    if (isDevelopment.value) {
      console.log("✅ Menambahkan section title2");
    }
  }

  if (member.title3 && member.description3) {
    sections.push({
      title: member.title3,
      content: member.description3,
      image_url: member.image3_url || getImageUrl(member.image3),
    });
    if (isDevelopment.value) {
      console.log("✅ Menambahkan section title3");
    }
  }

  if (member.title4 && member.description4) {
    sections.push({
      title: member.title4,
      content: member.description4,
      image_url: member.image4_url || getImageUrl(member.image4),
    });
    if (isDevelopment.value) {
      console.log("✅ Menambahkan section title4");
    }
  }

  if (isDevelopment.value) {
    console.log(`📊 Total sections: ${sections.length}`);
  }
  return sections;
});

// Load data function
const loadData = async () => {
  if (isDevelopment.value) {
    console.log("🔄 Loading data untuk DPD:", currentDpdSlug.value);
  }
  await pengurusStore.fetchAll();
};

// Watch untuk perubahan data
watch(
  () => pengurusStore.list,
  (newList) => {
    if (isDevelopment.value) {
      console.log("🔄 Data pengurus berubah:", newList);
    }
    if (newList && newList.length > 0) {
      if (isDevelopment.value) {
        console.log("🎯 Memproses data baru...");
      }
      AOS.refresh();
    }
  }
);

// Watch untuk perubahan route
watch(
  () => route.path,
  (newPath) => {
    if (isDevelopment.value) {
      console.log("🔄 Route berubah:", newPath);
    }
    if (newPath.startsWith('/dpd/')) {
      loadData();
    }
  }
);

onMounted(() => {
  if (isDevelopment.value) {
    console.log("🚀 Content.vue mounted");
    console.log("📍 Current route:", route.path);
    console.log("📍 Current DPD slug:", currentDpdSlug.value);
  }
  
  // Fetch data jika belum ada
  if (!pengurusStore.list || pengurusStore.list.length === 0) {
    if (isDevelopment.value) {
      console.log("🔄 Fetching data pengurus...");
    }
    loadData();
  } else if (isDevelopment.value) {
    console.log("✅ Menggunakan data existing dari store");
  }

  // Initialize AOS
  AOS.init({
    duration: 800,
    once: false,
    offset: 100,
  });
});
</script>

<style scoped>
/* Styling untuk konten dari v-html */
.prose :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}
.prose :deep(ul) {
  list-style-position: inside;
  list-style-type: disc;
  margin-left: 1rem;
  margin-bottom: 1rem;
}
.prose :deep(li) {
  margin-bottom: 0.5rem;
}
.prose :deep(strong) {
  font-weight: 600;
  color: #1f2937;
}
</style>