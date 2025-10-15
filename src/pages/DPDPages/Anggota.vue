<script setup>
import { ref, computed, onMounted } from "vue";
import { usePengurusStore } from "@/stores/pengurus";
import CardProfile from "@/components/Layout/CardProfile.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const props = defineProps({
  daerah: {
    type: String,
    required: true,
  },
});

// Gunakan pengurus store
const pengurusStore = usePengurusStore();

const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

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

const filteredMembers = computed(() => {
  if (!props.daerah) return [];
  if (!pengurusStore.list) return [];

  let dataArray = [];
  if (Array.isArray(pengurusStore.list.data)) {
    dataArray = pengurusStore.list.data;
  } else if (
    pengurusStore.list.data &&
    Array.isArray(pengurusStore.list.data.data)
  ) {
    dataArray = pengurusStore.list.data.data;
  } else if (Array.isArray(pengurusStore.list)) {
    dataArray = pengurusStore.list;
  }

  return dataArray
    .filter((member) => {
      const categoryDaftarName = member.category_daftar?.name || "";
      return generateSlug(categoryDaftarName) === props.daerah;
    })
    .map((item) => {
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

const namaDaerah = computed(() => {
  const member = pengurusStore.list?.data?.data?.find(
    (m) => generateSlug(m.category_daftar?.name) === props.daerah
  );
  return (
    member?.category_daftar?.name ||
    props.daerah.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
});

onMounted(() => {
  if (!pengurusStore.list || pengurusStore.list.length === 0) {
    pengurusStore.fetchAll();
  }
  AOS.init({
    duration: 600,
    easing: "ease-out-quad",
    once: false,
    offset: 50,
  });
});
</script>
<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        Dewan Pengurus Daerah (DPD)
      </h1>
      <h2 class="text-2xl sm:text-3xl font-semibold text-green-700">
        {{ namaDaerah }}
      </h2>
      <p class="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed mt-4">
        Struktur kepengurusan APTIKNAS di tingkat daerah {{ namaDaerah }}.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pengurusStore.loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"
      ></div>
      <p class="mt-3 text-sm text-gray-600">Memuat data anggota...</p>
    </div>

    <!-- Content -->
    <div v-else class="max-w-6xl mx-auto">
      <!-- Grid Layout -->
      <div
        v-if="filteredMembers.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <CardProfile
          v-for="(member, index) in filteredMembers"
          :key="member.id"
          :name="member.name"
          :position="member.position"
          :location="member.location"
          :image="member.image"
          :social="member.social"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          class="transition-transform duration-200 hover:scale-105"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          Data Tidak Ditemukan
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Data untuk DPD {{ daerah.replace(/-/g, " ") }} tidak ditemukan.
        </p>
      </div>
    </div>
  </div>
</template>
