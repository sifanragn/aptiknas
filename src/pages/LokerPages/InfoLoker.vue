<template>
  <div>
    <!-- Section Lowongan -->
    <div
      class="mt-20 max-w-6xl mx-auto text-center grid grid-cols-1 md:grid-cols-2"
    >
      <h2
        class="text-4xl font-bold mb-3 md:pr-20 text-black text-center md:text-left"
      >
        Informasi Lowongan Pekerjaan
      </h2>
      <p class="text-gray-600 text-lg text-center md:text-left md:pl-5">
        Temukan berbagai peluang kerja terkini di bidang teknologi informasi dan komunikasi — 
        dari perusahaan startup hingga korporasi ternama.
      </p>
    </div>

    <!-- Kartu Lowongan with Animations -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div
        v-for="(job, index) in paginatedJobs"
        :key="job.id"
        class="h-[250px]"
        data-aos="fade-up"
        :data-aos-delay="index * 50"
        data-aos-duration="400"
        data-aos-easing="ease-out-cubic"
      >
        <CardSpotlight
          class="rounded-3xl border-none cursor-pointer shadow-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative border border-blue-400"
          :slotClass="'p-6 h-full'"
          @click="selectJob(job)"
        >
          <div class="pointer-events-none">
            <!-- Job Type -->
            <div class="text-sm font-medium mb-2 text-green-600">
              {{ job.job_type || 'Full-time' }}
            </div>
            
            <!-- Position Title -->
            <h3 class="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
              {{ job.position_title || job.title || 'Lowongan Pekerjaan' }}
            </h3>
            
            <!-- Company/Location -->
            <div class="flex items-center text-sm text-gray-600 mb-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span class="line-clamp-1">{{ job.company || 'APTIKNAS' }}</span>
            </div>
            
            <!-- Location -->
            <div class="flex items-center text-sm text-gray-600 mb-3">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="line-clamp-1">{{ job.location || 'Indonesia' }}</span>
            </div>
            
            <!-- Description/Summary -->
            <p class="text-sm text-gray-600 line-clamp-2" v-html="stripHtml(job.description || job.ringkasan || job.summary || '')"></p>
          </div>
          
        </CardSpotlight>
       
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !error && careerStore.data.length === 0" class="text-center py-10">
      <div class="max-w-md mx-auto">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">Tidak Ada Lowongan</h3>
        <p class="text-gray-500">Saat ini tidak ada lowongan pekerjaan yang tersedia.</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-10">
      <div class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
        <p class="text-gray-600">Memuat data lowongan...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-10">
      <div class="max-w-md mx-auto">
        <svg class="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 class="text-lg font-semibold text-red-600 mb-2">Gagal Memuat Data</h3>
        <p class="text-gray-500">{{ error }}</p>
        <button 
          @click="fetchCareers" 
          class="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>

    <!-- Pagination with Animations -->
    <Pagination
      v-if="careerStore.data.length > itemsPerPage && !loading && !error"
      :total-items="careerStore.data.length"
      :items-per-page="itemsPerPage"
      :model-value="currentPage"
      @page-changed="handlePageChange"
      class="mt-10"
      data-aos="fade-up"
      data-aos-duration="300"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCareerStore } from "@/stores/career";
import CardSpotlight from "./CardSpotlight.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "@/components/Layout/Pagination.vue";

// Career Store
const careerStore = useCareerStore();

// Reactive state
const loading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = 6;

// Computed properties
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return careerStore.data.slice(start, end);
});

// Methods
const stripHtml = (html) => {
  if (!html) return "Deskripsi lowongan tidak tersedia";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const selectJob = (job) => {
  // Emit event atau navigasi ke detail lowongan
  console.log("Job selected:", job);
  // Jika menggunakan modal atau detail page, bisa ditambahkan di sini
  emit("job-selected", job);
};

const handlePageChange = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 400, behavior: "smooth" });
  // Refresh animations after page change
  setTimeout(() => {
    AOS.refresh();
  }, 100);
};

const fetchCareers = async () => {
  loading.value = true;
  error.value = null;
  try {
    await careerStore.fetchAll();
  } catch (err) {
    error.value = err.message || "Gagal memuat data lowongan";
    console.error("Error fetching careers:", err);
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  AOS.init({
    duration: 400,
    easing: "ease-out-cubic",
    once: false,
    offset: 20,
  });

  // Fetch data hanya jika belum ada
  if (careerStore.data.length === 0) {
    await fetchCareers();
  }
});

// Emit untuk komunikasi dengan parent component
const emit = defineEmits(["job-selected"]);
</script>

<style scoped>
/* Custom animation timing */
[data-aos] {
  transition-property: transform, opacity;
}

/* Smooth hover effects */
.hover-scale {
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.hover-scale:hover {
  transform: scale(1.02) translateY(-1px);
}

/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>