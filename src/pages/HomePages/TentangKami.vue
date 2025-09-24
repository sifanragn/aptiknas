<template>
  <!-- Tentang Kami -->
  <section
    class="py-12 md:py-16 lg:py-20 w-full overflow-hidden"
    v-if="filteredData.length > 0"
  >
    <div class="grid lg:grid-cols-2 grid-cols-1 items-center">
      <!-- Konten Teks di Kiri -->
      <div
        class="flex flex-col items-start w-full space-y-6 md:space-y-8 lg:space-y-10 max-w-md justify-self-end px-4 sm:px-6 md:px-8 lg:px-0 order-2 lg:order-1"
        data-aos="fade-right"
      >
        <span
          class="text-xs text-black text-center border rounded-full border-gray-500 p-1.5 font-semibold"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Tentang Kami
        </span>
        <h3
          class="text-2xl text-black sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-2 mb-3 md:mb-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {{ activeSlide.title }}
        </h3>
        <div
          class="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl mb-4 md:mb-6"
          data-aos="fade-up"
          data-aos-delay="300"
          v-html="activeSlide.description"
        ></div>
        <interactive-hover-button
          text="Jelajahi Tentang Kami"
          icon="fas fa-arrow-right"
          class="mt-2 md:mt-3"
          data-aos="fade-up"
          data-aos-delay="400"
          @click="$router.push('/tentang-kami')"
        />
      </div>

      <!-- Swiper di Kanan -->
      <div
        class="lg:w-[40rem] md:w-full relative bg-white pt-10 sm:pt-1 md:pt-1 lg:pt-2 pl-4 sm:pl-6 md:pl-8 lg:pl-10 pr-0 lg:pr-0 rounded-l-xl sm:rounded-l-2xl md:rounded-l-3xl lg:rounded-l-4xl shadow-xl mt-6 md:mt-8 lg:mt-0 order-1 lg:order-2 mb-8 lg:mb-0 ml-10 lg:ml-auto"
        data-aos="fade-left"
      >
        <!-- Tombol navigasi -->
        <div class="items-center w-full md:w-[30rem] lg:w-[35rem]">
          <div
            class="swiper-pagination flex justify-end-safe !relative mt-3 sm:mt-4 md:mt-6 text-left pl-3 sm:pl-4 md:pl-6"
          ></div>
        </div>

        <!-- Swiper Container -->
        <div class="swiper mySwiper pl-3 sm:pl-4 md:pl-6 md:rou">
          <div class="swiper-wrapper">
            <div
              v-for="(item, index) in filteredData"
              :key="item.id"
              class="swiper-slide !w-auto"
            >
              <img
                :src="getImageUrl(item.image)"
                class="rounded-xl sm:rounded-2xl md:rounded-3xl mb-10 shadow-lg w-[10rem] h-[14rem] sm:w-[12rem] sm:h-[16rem] md:w-[14rem] md:h-[18rem] ml-4 mt-2 lg:w-[15rem] lg:h-[20rem] object-cover"
                :alt="item.title"
                @error="handleImageError(item.id)"
              />
            </div>
          </div>
        </div>

        <!-- Pagination Container -->
        <div
          class="absolute bottom-4 lg:w-32 sm:bottom-6 md:bottom-8 lg:bottom-15 right-4 sm:right-6 md:right-30 lg:left-120 z-10 gap-2 sm:gap-3 hidden sm:hidden md:flex"
        >
          <div
            class="swiper-button-prev static size-7 sm:size-5 md:size-5 lg:size-10 p-3 sm:p-4 md:p-6 lg:p-6 border border-gray-700 rounded-full text-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors after:!text-xs sm:after:!text-sm md:after:!text-base"
          ></div>
          <div
            class="swiper-button-next static size-7 sm:size-5 md:size-5 lg:size-10 p-3 sm:p-4 md:p-6 lg:p-6 border border-gray-700 rounded-full text-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors after:!text-xs sm:after:!text-sm md:after:!text-base"
          ></div>
        </div>

        <p
          class="text-sm pb-10 sm:text-base md:text-lg text-left mt-2 sm:mt-3 pl-3 sm:pl-4 md:pl-6"
        >
          {{ activeSlide.title }}
        </p>
      </div>
    </div>
  </section>

  <!-- Loading State -->
  <div v-if="loading" class="py-12 text-center">
    <p>Memuat data...</p>
  </div>

  <!-- Error State -->
  <div v-if="error" class="py-12 text-center text-red-500">
    <p>Gagal memuat data: {{ error }}</p>
  </div>

  <!-- Empty State -->
  <div v-if="!loading && filteredData.length === 0" class="py-12 text-center">
    <p>Tidak ada data tentang kami yang ditampilkan di beranda.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted, nextTick } from "vue";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import InteractiveHoverButton from "@/components/UI/interactive-hover-button/InteractiveHoverButton.vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const activeIndex = ref(0);
const swiperInstance = ref(null);
const initializationError = ref(null);
const loading = ref(false);
const error = ref(null);

// Data dummy untuk "Tentang Kami"
const dummyTentangKamiData = ref([
  {
    id: 1,
    title: "Visi & Misi APTIKNAS",
    description:
      "<p>Menjadi organisasi TIK terdepan yang inovatif dan berkelanjutan, serta mendorong pertumbuhan industri TIK nasional agar mampu berdaya saing di tingkat global. Kami berkomitmen untuk mengembangkan kompetensi anggota dan menciptakan ekosistem digital yang inklusif.</p>",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    display_on_home: true,
    category: { name: "Visi & Misi" },
  },
  {
    id: 2,
    title: "Sejarah Singkat APTIKNAS",
    description:
      "<p>APTIKNAS merupakan transformasi dari APKOMINDO (didirikan 1991), menjadikannya asosiasi TIK tertua di Indonesia. Dideklarasikan secara resmi pada 24 Februari 2017, APTIKNAS lahir dari semangat untuk menyatukan para pengusaha, praktisi, dan akademisi TIK dalam satu wadah yang solid.</p>",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    display_on_home: true,
    category: { name: "Sejarah" },
  },
  {
    id: 3,
    title: "Program Unggulan Kami",
    description:
      "<p>Kami fokus pada empat pilar utama: pengembangan kompetensi melalui pelatihan dan sertifikasi, mendorong kolaborasi strategis, memfasilitasi akses pasar bagi anggota, dan mengadvokasi kebijakan yang mendukung pertumbuhan ekosistem digital yang sehat dan kompetitif.</p>",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    display_on_home: true,
    category: { name: "Program" },
  },
]);

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (imagePath) => {
  if (!imagePath)
    return "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";

  // Jika gambar sudah berupa URL lengkap, langsung kembalikan
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Jika gambar adalah path relatif, tambahkan base URL
  const baseUrl = "http://127.0.0.1:8000";
  return `${baseUrl}/storage/${imagePath}`;
};

const handleImageError = (itemId) => {
  console.error("Gagal memuat gambar untuk item ID:", itemId);
  // Ganti dengan placeholder image jika gambar gagal dimuat
  const itemIndex = filteredData.value.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    filteredData.value[itemIndex].image =
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";

    if (swiperInstance.value) {
      swiperInstance.value.update();
    }
  }
};

// Filter data dengan null check - hanya tampilkan yang display_on_home = true
const filteredData = computed(() => {
  // Menggunakan data dummy lokal
  return dummyTentangKamiData.value.filter(
    (item) => item.display_on_home === true
  );
});

// Initialize swiper dengan error handling
const initSwiper = () => {
  try {
    if (!document.querySelector(".mySwiper") || filteredData.value.length === 0)
      return;

    swiperInstance.value = new Swiper(".mySwiper", {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + "</span>";
        },
      },
      on: {
        init(swiper) {
          activeIndex.value = swiper.realIndex;
        },
        slideChange(swiper) {
          activeIndex.value = swiper.realIndex;
        },
      },
    });
  } catch (err) {
    console.error("Swiper initialization error:", err);
    initializationError.value = err.message;
  }
};

// Watch for data changes
watch(
  filteredData,
  (newVal) => {
    if (newVal.length > 0) {
      nextTick(() => {
        initSwiper();
        AOS.refresh();
      });
    }
  },
  { immediate: true }
);

// Lifecycle hooks
onMounted(async () => {
  AOS.init({
    once: true,
    duration: 800,
    easing: "ease-out-cubic",
  });

  if (filteredData.value.length > 0) {
    await nextTick();
    initSwiper();
    AOS.refresh();
  }
});

onUnmounted(() => {
  // Cleanup
  if (swiperInstance.value) {
    swiperInstance.value.destroy();
  }
});

// Computed properties
const activeSlide = computed(() => {
  if (!filteredData.value.length) return { title: "", description: "" };
  const slide =
    filteredData.value[activeIndex.value % filteredData.value.length] || {};

  return slide;
});
</script>

<style scoped>
/* Tambahkan ini untuk memastikan animasi smooth */
.swiper-slide {
  will-change: transform, opacity;
}

/* Efek hover untuk slide */
.swiper-slide img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.swiper-slide:hover img {
  transform: scale(1.03);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Style untuk pagination bullet */
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: #d1d5db;
  opacity: 0.6;
  margin: 0 4px;
}

.swiper-pagination-bullet-active {
  background: #4b5563;
  opacity: 1;
  width: 20px;
  border-radius: 4px;
}
</style>
