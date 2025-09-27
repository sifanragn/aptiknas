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

    <!-- Image Grid with Natural Animations -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      v-if="filteredGallery.length === 0"
      class="text-center py-10 text-gray-500"
    >
      Tidak ada kegiatan yang tersedia
    </div>

    <!-- Load More Button -->
    <div v-if="filteredGallery.length > 0" class="flex justify-center mt-10">
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
import AOS from "aos";
import ShimmerButton from "@/components/UI/shimmer-button/ShimmerButton.vue";
import "aos/dist/aos.css";

// Data dummy untuk kegiatan APTIKNAS
const dummyKegiatan = ref([
  {
    id: 1,
    title: "Seminar Digital Transformation 2024",
    category: "Seminar",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Seminar tentang transformasi digital untuk UMKM dengan pembicara ahli dari industri teknologi.",
  },
  {
    id: 2,
    title: "Workshop Cybersecurity",
    category: "Workshop",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Workshop intensif tentang keamanan siber untuk melindungi data bisnis dari ancaman digital.",
  },
  {
    id: 3,
    title: "Networking Night 2024",
    category: "Networking",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Acara networking eksklusif untuk anggota APTIKNAS dengan pelaku industri dan pemerintah.",
  },
  {
    id: 4,
    title: "Tech Training: Cloud Computing",
    category: "Pelatihan",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Pelatihan fundamental cloud computing untuk pengusaha TIK yang ingin mengembangkan skill.",
  },
  {
    id: 5,
    title: "APTIKNAS Tech Awards 2024",
    category: "Awards",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Penghargaan tahunan untuk inovator dan pengusaha teknologi yang berkontribusi bagi perkembangan TIK nasional.",
  },
  {
    id: 6,
    title: "Konferensi Industry 4.0",
    category: "Konferensi",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Konferensi membahas implementasi Industry 4.0 di berbagai sektor industri Indonesia.",
  },
]);

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

// Inisialisasi AOS dengan konfigurasi natural
onMounted(() => {
  AOS.init({
    duration: 400,
    easing: "ease-out-cubic",
    once: false,
    offset: 50,
    delay: 50,
  });
});

// Fungsi filter
const applyFilter = (filter) => {
  selectedFilter.value = filter;
};

// Computed property untuk data yang sudah difilter
const filteredGallery = computed(() => {
  if (selectedFilter.value === "All") {
    return dummyKegiatan.value;
  }
  return dummyKegiatan.value.filter(
    (item) => item.category === selectedFilter.value
  );
});

// Fungsi untuk melihat detail
const viewDetails = (item) => {
  console.log("View details:", item);
  // Di sini bisa diarahkan ke halaman detail atau menampilkan modal
  alert(`Detail: ${item.title}\n\n${item.description}`);
};

// Fungsi untuk load more (dummy function)
const fetchMoreKegiatan = () => {
  // Simulasi menambahkan data baru
  const newItems = [
    {
      id: dummyKegiatan.value.length + 1,
      title: "Webinar AI untuk Bisnis",
      category: "Webinar",
      image:
        "https://images.unsplash.com/photo-1677442135135-416f8aa26a5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description:
        "Webinar tentang pemanfaatan AI dalam mengoptimalkan proses bisnis.",
    },
    {
      id: dummyKegiatan.value.length + 2,
      title: "Bootcamp Startup Digital",
      category: "Bootcamp",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description:
        "Bootcamp intensif untuk calon founder startup di bidang teknologi.",
    },
  ];

  dummyKegiatan.value = [...dummyKegiatan.value, ...newItems];
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
</style>
