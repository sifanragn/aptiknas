<template>
  <!-- Agenda Section -->
  <section class="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
    <div class="text-center mb-6 sm:mb-8 md:mb-10 flex flex-col items-center gap-2">
      <Badge text="Agenda"/>
      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Agenda</h3>
      <p class="text-gray-600 text-base sm:text-lg">
        Jangan lewatkan agenda penting dan kegiatan yang akan datang dari MGMP BK.
      </p>
    </div>

    <div class="space-y-4 sm:space-y-6 w-full sm:max-w-2xl md:max-w-3xl mx-auto">
      <!-- Loading state -->
      <div v-if="loading" class="text-center">
        <p>Memuat agenda...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="text-center text-red-500">
        <p>Gagal memuat agenda. Silakan coba lagi nanti.</p>
      </div>
      
      <!-- Empty state -->
      <div v-else-if="displayedAgendas.length === 0" class="text-center">
        <p>Belum ada agenda yang tersedia saat ini.</p>
      </div>
      
      <!-- Agenda items with responsive layout -->
      <div
        v-else
        v-for="(agenda, index) in displayedAgendas"
        :key="agenda.id"
        class="flex flex-col md:relative sm:flex-row bg-white w-full rounded-2xl shadow p-4 gap-4 min-h-[180px] hover:shadow-md transition-shadow"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <!-- Image - centered on mobile -->
        <img
          :src="agenda.imageUrl"
          :alt="agenda.altText"
          class="w-full sm:w-38 h-38 object-cover rounded-lg self-center flex-shrink-0"
        />
        
        <!-- Content -->
        <div class="flex-1 min-w-0 flex flex-col justify-between py-2">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <h2 class="font-semibold text-lg sm:text-xl truncate">
              {{ agenda.title }}
            </h2>
            <span
              v-if="agenda.status"
              class="text-xs bg-[#511378]/50 text-white px-2 py-1 rounded-full flex-shrink-0 self-start sm:self-auto"
              :class="agenda.status"
            >
              {{ agenda.status }}
            </span>
          </div>
          
          <p class="text-sm text-gray-500 flex items-center gap-2 mt-1 whitespace-nowrap">
            <span>{{ agenda.date }}</span>
            <span class="w-1 h-1 bg-black rounded-full inline-block"></span>
            <span class="truncate">{{ agenda.location }}</span>
          </p>

          <div class="text-sm text-gray-600 mt-2 line-clamp-2" v-html="agenda.description"></div>
        </div>
        
        <button
          :disabled="agenda.buttonDisabled"
          class="mt-0 md:mt-5 md:mb-12 border-2  border-[#511378] text-[#511378] px-3 py-2 sm:py-3 rounded-full text-xs hover:bg-purple-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-400 self-start sm:self-end"
        >
          {{ agenda.buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
// import Badge from "@/components/templates/Badge.vue";
// import AOS from 'aos';
import 'aos/dist/aos.css';

// Data dummy untuk agenda
const dummyAgendas = ref([
  {
    id: 1,
    title: "Workshop Penyusunan Instrumen BK",
    date: "15 November 2023",
    location: "Aula Dinas Pendidikan Kota",
    description: "Workshop ini bertujuan untuk meningkatkan kompetensi guru BK dalam menyusun instrumen yang valid dan reliabel.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    altText: "Workshop Penyusunan Instrumen BK",
    status: "Akan Datang",
    buttonText: "Daftar Sekarang",
    buttonDisabled: false
  },
  {
    id: 2,
    title: "Seminar Nasional Konseling Keluarga",
    date: "22 November 2023",
    location: "Hotel Grand Mercure",
    description: "Seminar ini menghadirkan pakar konseling keluarga untuk berbagi strategi dalam menangani permasalahan keluarga siswa.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    altText: "Seminar Nasional Konseling Keluarga",
    status: "Akan Datang",
    buttonText: "Daftar Sekarang",
    buttonDisabled: false
  },
  {
    id: 3,
    title: "Pelatihan Teknologi dalam Layanan BK",
    date: "5 Desember 2023",
    location: "Laboratorium Komputer SMPN 1",
    description: "Pelatihan pemanfaatan teknologi digital untuk mendukung layanan bimbingan dan konseling di era modern.",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    altText: "Pelatihan Teknologi dalam Layanan BK",
    status: "Akan Datang",
    buttonText: "Daftar Sekarang",
    buttonDisabled: false
  },
  {
    id: 4,
    title: "Rapat Koordinasi Triwulan IV",
    date: "10 Oktober 2023",
    location: "SMPN 5 Ruang Guru",
    description: "Rapat koordinasi membahas program kerja triwulan IV dan evaluasi kegiatan sebelumnya.",
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    altText: "Rapat Koordinasi Triwulan IV",
    status: "Selesai",
    buttonText: "Lihat Materi",
    buttonDisabled: false
  }
]);

// State management
const loading = ref(false);
const error = ref(null);
const agendas = ref([...dummyAgendas.value]);

// Only show maximum 3 agenda items
const displayedAgendas = computed(() => {
  return agendas.value.slice(0, 3);
});

onMounted(() => {
  // Simulasi loading data
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 800);
  
  AOS.init({
    once: true,
    duration: 600,
    easing: 'ease-out-quad',
    offset: 20
  });
});
</script>