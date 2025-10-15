<template>
  <div class="dark:bg-neutral-900 flex flex-col items-center py-16">
    <!-- TODO: Tambahkan link ke halaman semua pengurus -->
    <!-- Judul -->
    <div class="text-center mb-10" data-aos="fade-down">
      <h2 class="text-2xl font-bold">
        Dewan Pengawas Asosiasi (DPA) DPP APTIKNAS
      </h2>
      <p class="text-gray-600">Masa Bhakti 2022–2027</p>
    </div>

    <!-- Loading State -->
    <div v-if="pengurusStore.loading" class="text-center py-10">
      <p>Memuat data pengurus...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="pengurusStore.error" class="text-center py-10 text-red-500">
      <p>Gagal memuat data: {{ pengurusStore.error }}</p>
    </div>

    <!-- Card List -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto"
    >
      <router-link
        v-for="(member, index) in paginatedMembers"
        :key="member.id"
        :to="`/pengurus/${member.id}`"
        class="transition-transform duration-300 hover:scale-105"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <CardProfile v-bind="member" />
      </router-link>
    </div>

    <!-- Empty State -->
    <div
      v-if="!pengurusStore.loading && dpaMembers.length === 0"
      class="text-center py-10"
    >
      <p>Tidak ada data pengurus yang tersedia.</p>
    </div>

    <!-- Selengkapnya -->
    <div class="mt-10" data-aos="fade-up" data-aos-delay="300">
      <InteractiveHoverButton
        text="Selengkapnya"
        @click="$router.push('/pengurus/dpa')"
      />
    </div>
 
    <!-- Pagination -->
    <Pagination
      v-if="dpaMembers.length > itemsPerPage"
      :total-items="dpaMembers.length"
      :items-per-page="itemsPerPage"
      :model-value="currentPage"
      @page-changed="handlePageChange"
      class="mt-8"
      data-aos="fade-up"
      data-aos-delay="400"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { usePengurusStore } from "@/stores/pengurus";
import CardProfile from "@/components/Layout/CardProfile.vue";
import Pagination from "@/components/Layout/Pagination.vue";
import InteractiveHoverButton from "@/components/UI/interactive-hover-button/InteractiveHoverButton.vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Gunakan pengurus store
const pengurusStore = usePengurusStore();
const currentPage = ref(1);
const itemsPerPage = ref(6);

// Format data dari store untuk komponen
const dpaMembers = computed(() => {
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
      role: item.jabatan || item.category_pengurus?.name || "Anggota",
      location: item.address || "Lokasi tidak tersedia",
      image: getImageUrl(item),
      social: social,
    };
  });
});

// Paginated members
const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return dpaMembers.value.slice(start, end);
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

const handlePageChange = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(async () => {
  // Fetch data dari store
  await pengurusStore.fetchAll();

  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
  });
});
</script>
