<template>
  <!-- Tentang Kami -->
  <section
    class="py-12 md:py-16 lg:py-20 w-screen overflow-hidden"
    v-if="filteredData.length > 0"
  >
    <div class="grid lg:grid-cols-2 grid-cols-1 items-center">
      <!-- Konten Teks di Kiri -->
      <div
        class="flex flex-col items-start w-full mr-20 space-y-6 md:space-y-8 lg:space-y-10 max-w-md justify-self-end px-4 sm:px-6 md:px-8 lg:px-0 order-2 lg:order-1"
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
          class="text-gray-600 line-clamp-6 text-sm sm:text-base md:text-lg lg:text-xl mb-4 md:mb-6"
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
        <div class="swiper mySwiper pl-3 sm:pl-4 md:pl-6 md:rouded-lg -10">
          <div class="swiper-wrapper">
            <div
              v-for="(item, index) in filteredData"
              :key="item.id"
              class="swiper-slide !w-auto mt-2"
            >
              <img
                :src="getImageUrl(item.image)"
                class="rounded-xl sm:rounded-2xl md:rounded-3xl mb-10 shadow-lg w-[10rem] h-[14rem] sm:w-[12rem] sm:h-[16rem] md:w-[14rem] md:h-[18rem] ml-4 lg:w-[15rem] lg:h-[20rem] object-cover transition-transform duration-500 ease-in-out"
                :alt="item.title"
                :class="{ 'scale-110 shadow-2xl': activeIndex === index }"
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
  <div v-if="aboutusStore.loading" class="py-12 text-center">
    <div class="flex flex-col items-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"
      ></div>
      <p class="text-gray-600">Memuat data tentang kami...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-if="aboutusStore.error" class="py-12 text-center">
    <div class="max-w-md mx-auto bg-red-50 rounded-lg p-6">
      <svg
        class="w-12 h-12 text-red-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="text-lg font-semibold text-red-900 mb-2">Gagal Memuat Data</h3>
      <p class="text-red-700 mb-4">{{ aboutusStore.error }}</p>
      <button
        @click="aboutusStore.fetchAll()"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  </div>

  <!-- Empty State -->
  <div
    v-if="
      !aboutusStore.loading && !aboutusStore.error && filteredData.length === 0
    "
    class="py-12 text-center"
  >
    <div class="max-w-md mx-auto bg-gray-50 rounded-lg p-6">
      <svg
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Tidak Ada Data</h3>
      <p class="text-gray-600">
        Tidak ada data tentang kami yang ditampilkan di beranda.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, nextTick } from "vue";
import { useAboutusStore } from "@/stores/aboutus";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import InteractiveHoverButton from "@/components/UI/interactive-hover-button/InteractiveHoverButton.vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const aboutusStore = useAboutusStore();

const activeIndex = ref(0);
const swiperInstance = ref(null);
const initializationError = ref(null);

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (imagePath) => {
  if (!imagePath) {
    // Fallback jika tidak ada path gambar
    return "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const baseUrl = "https://cms-aptiknas.hexagon.co.id";
  // Pastikan path diawali dengan /storage/
  const imageFinalPath = imagePath.startsWith("storage/")
    ? imagePath
    : `storage/${imagePath}`;
  return `${baseUrl}/${imageFinalPath.replace(/^\//, "")}`;
};

const handleImageError = (itemId) => {
  console.error("Gagal memuat gambar untuk item ID:", itemId);
  // Ganti dengan placeholder image jika gambar gagal dimuat
  const itemIndex = filteredData.value.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1 && swiperInstance.value) {
    // Anda bisa mengganti src di sini jika filteredData adalah ref,
    // tapi karena ini computed, lebih baik tangani di template atau state lain.
    if (swiperInstance.value) {
      swiperInstance.value.update();
    }
  }
};

// Filter data dengan null check - hanya tampilkan yang display_on_home = true dan maksimal 7 data
const filteredData = computed(() => {
  // Handle berbagai struktur response dari store
  let dataArray = [];
  const storeList = aboutusStore.list;

  if (Array.isArray(storeList)) {
    dataArray = storeList;
  } else if (storeList && Array.isArray(storeList.data)) {
    // Untuk format { success: true, data: [...] }
    dataArray = storeList.data;
  } else if (
    storeList &&
    storeList.data &&
    Array.isArray(storeList.data.data)
  ) {
    // Untuk format dengan pagination { data: { data: [...] } }
    dataArray = storeList.data.data;
  }

  return dataArray.filter((item) => item.display_on_home === true).slice(0, 7);
});

// Initialize swiper dengan error handling
const initSwiper = () => {
  try {
    if (
      !document.querySelector(".mySwiper") ||
      filteredData.value.length === 0
    ) {
      console.log(
        "⏸️ Swiper tidak diinisialisasi: container tidak ditemukan atau data kosong"
      );
      return;
    }

    console.log("🔄 Menginisialisasi Swiper...");

    // Destroy existing swiper instance jika ada
    if (swiperInstance.value) {
      swiperInstance.value.destroy(true, true);
    }

    swiperInstance.value = new Swiper(".mySwiper", {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 20,
      loop: filteredData.value.length > 3,
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
          console.log("✅ Swiper berhasil diinisialisasi");
          activeIndex.value = swiper.realIndex;
        },
        slideChange(swiper) {
          activeIndex.value = swiper.realIndex;
          console.log("🔄 Slide berubah ke index:", swiper.realIndex);
        },
      },
    });

    initializationError.value = null;
  } catch (err) {
    console.error("❌ Swiper initialization error:", err);
    initializationError.value = err.message;
  }
};

// Lifecycle hooks
onMounted(async () => {
  AOS.init({
    once: true,
    duration: 800,
    easing: "ease-out-cubic",
  });

  // Fetch data jika belum ada di store
  if (
    !aboutusStore.list ||
    (Array.isArray(aboutusStore.list) && aboutusStore.list.length === 0) ||
    (aboutusStore.list.data && aboutusStore.list.data.length === 0)
  ) {
    await aboutusStore.fetchAll();
  }

  if (filteredData.value.length > 0) {
    await nextTick();
    initSwiper();
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
  if (!filteredData.value || filteredData.value.length === 0) {
    return { title: "", description: "" };
  }
  return filteredData.value[activeIndex.value] || {};
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

/* Custom styling untuk gambar error */
img[src*="placeholder"] {
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
