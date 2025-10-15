<template>
  <div class=" text-gray-800">
    <section class=" min-h-screen -mt-10 px-6 py-16">
      <Hero />
      <InfoLoker
        v-if="!selectedJob"
        :loker-list="lokerList"
        :loading="loading"
        :error="error"
        @job-selected="handleJobSelected"
      />
      <LokerDetail
        v-else
        :job="selectedJob"
        :loker-list="lokerList"
        @back-to-list="handleBackToList"
        @select-job="handleJobSelected"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Hero from "@/pages/LokerPages/Hero.vue";
import InfoLoker from "@/pages/LokerPages/InfoLoker.vue";
import LokerDetail from "@/pages/LokerPages/LokerDetail.vue";
import { useCareerStore } from "@/stores/career";

const selectedJob = ref(null);
const careerStore = useCareerStore();

// State untuk komponen
const loading = ref(false);
const error = ref(null);

// Ambil data dari store dengan handling berbagai struktur response
const lokerList = computed(() => {
  const storeData = careerStore.data;
  
  // Handle berbagai kemungkinan struktur response
  if (Array.isArray(storeData)) {
    return storeData;
  } else if (storeData && Array.isArray(storeData.data)) {
    return storeData.data;
  } else if (storeData && storeData.data && Array.isArray(storeData.data.data)) {
    return storeData.data.data;
  } else if (storeData && storeData.status && Array.isArray(storeData.data)) {
    return storeData.data;
  }
  
  return [];
});

// Fetch data careers
const fetchCareers = async () => {
  loading.value = true;
  error.value = null;
  try {
    await careerStore.fetchAll();
    
    // Cek jika data kosong setelah fetch
    if (lokerList.value.length === 0) {
      console.warn('No career data found after fetching');
    }
  } catch (err) {
    error.value = err.message || 'Gagal memuat data lowongan pekerjaan';
    console.error('Error fetching careers in LokerView:', err);
  } finally {
    loading.value = false;
  }
};

// Event handlers
const handleJobSelected = (job) => {
  window.scrollTo({ top: 200, behavior: "smooth" });
  selectedJob.value = job;
};

const handleBackToList = () => {
  selectedJob.value = null;
};

// Lifecycle
onMounted(async () => {
  // Fetch data hanya jika belum ada atau perlu refresh
  if (careerStore.data.length === 0 || !careerStore.data) {
    await fetchCareers();
  } else {
    // Jika data sudah ada di store, gunakan data tersebut
    console.log('Using existing career data from store:', careerStore.data);
  }
});
</script>