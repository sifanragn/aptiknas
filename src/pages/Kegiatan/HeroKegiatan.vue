<template>
  <div class="hero-section ">
    <!-- WebGL Support Check -->
    <div
      v-if="!webglSupported"
      class="h-[500px] w-screen flex items-center justify-center bg-gray-200 text-gray-600"
    >
      <p>
        WebGL tidak didukung atau dinonaktifkan di browser Anda. Animasi galeri
        tidak dapat ditampilkan.
      </p>
    </div>
    <!-- Hero -->
    <div class="text-center relative">
      <div class="relative">
        <h1
          class="text-5xl md:text-9xl tracking-tight text-gray-900 relative z-10"
        >
          KEGIATAN
        </h1>

        <div
          class="absolute hidden xl:block bottom-0 left-1/2 border-4 border-l-green-600 -translate-x-1/2 h-28 w-[43rem] bg-gradient-to-r from-green-600/19 to-transparent z-0"
        ></div>
        <!-- <div
          class="absolute hidden xl:block bottom-0 left-4/17 -translate-x-1/2 h-26 border-l-2 border-green-600 z-0"
        ></div> -->
      </div>

      <div
        class="h-[500px] w-screen overflow-hidden overflow-x-hidden relative left-1/2 -translate-x-1/2"
      >
        <BendingGallery
          v-if="!loading && !error && webglSupported"
          :items="galleryItems"
          :bend="2"
        />
        <div v-if="loading" class="flex justify-center items-center h-full">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"
          ></div>
        </div>
        <div v-if="error" class="text-red-500 text-center py-20">
          Error loading gallery: {{ error.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BendingGallery from "@/components/UI/bending-gallery/BendingGallery.vue";

// WebGL Support Check
const webglSupported = ref(true);

const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

// Data dummy untuk kegiatan APTIKNAS
const dummyAgenda = ref([
  {
    id: 1,
    title: "Seminar Nasional Digital Transformation 2024",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Seminar tentang transformasi digital untuk UMKM dengan pembicara ahli dari industri teknologi.",
  },
  {
    id: 2,
    title: "Workshop Cybersecurity untuk Pelaku Usaha",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Workshop intensif tentang keamanan siber untuk melindungi data bisnis dari ancaman digital.",
  },
  {
    id: 3,
    title: "APTIKNAS Networking Night 2024",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Acara networking eksklusif untuk anggota APTIKNAS dengan pelaku industri dan pemerintah.",
  },
  {
    id: 4,
    title: "Tech Training: Cloud Computing Fundamentals",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Pelatihan fundamental cloud computing untuk pengusaha TIK yang ingin mengembangkan skill.",
  },
  {
    id: 5,
    title: "Pameran Teknologi Indonesia 2024",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Ajang pameran teknologi terbesar yang menampilkan produk dan solusi dari perusahaan anggota APTIKNAS.",
  },
  {
    id: 6,
    title: "Konferensi Blockchain untuk Bisnis",
    image:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Konferensi tentang implementasi teknologi blockchain dalam berbagai sektor bisnis.",
  },
]);

const loading = ref(false);
const error = ref(null);

// Simulasi loading data
onMounted(() => {
  webglSupported.value = checkWebGLSupport();
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1500);
});

const galleryItems = computed(() => {
  return dummyAgenda.value.map((item) => ({
    image: item.image,
    text: item.title,
    id: item.id,
  }));
});
</script>

<style>
.hero-section {
  padding-block: 5rem;
  text-align: center;
}

/* Warna green-600 */
.bg-green-600 {
  background-color: #16a34a;
}

.border-green-600 {
  border-color: #16a34a;
}

.from-green-600\/19 {
  --tw-gradient-from: rgb(22 163 74 / 0.19);
  --tw-gradient-to: rgb(22 163 74 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

/* Animasi spin */
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
