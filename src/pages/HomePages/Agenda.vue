<template>
  <!-- Agenda Section -->
  <!-- TODO: Tambahkan link ke halaman semua agenda -->
  <section class="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
    <div
      class="text-center mb-6 sm:mb-8 md:mb-10 flex flex-col items-center gap-2"
    >
      <Badge text="Agenda" />
      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Agenda</h3>
      <p class="text-gray-600 text-base sm:text-lg">
        Jangan lewatkan agenda penting dan kegiatan yang akan datang dari
        APTIKNAS.
      </p>
    </div>

    <div
      class="space-y-4 sm:space-y-6 w-full sm:max-w-2xl md:max-w-3xl mx-auto"
    >
      <!-- Loading state -->
      <div v-if="agendaStore.loading" class="text-center">
        <p>Memuat agenda...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="agendaStore.error" class="text-center text-red-500">
        <p>Gagal memuat agenda. Silakan coba lagi nanti.</p>
        <p class="text-sm">{{ agendaStore.error }}</p>
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
          :src="getImageUrl(agenda)"
          :alt="agenda.title"
          class="w-full sm:w-38 h-38 object-cover rounded-lg self-center flex-shrink-0"
          @error="(event) => handleImageError(event, agenda)"
        />

        <!-- Content -->
        <div class="flex-1 min-w-0 flex flex-col justify-between py-2">
          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2"
          >
            <h2 class="font-semibold text-lg sm:text-xl truncate">
              {{ agenda.title }}
            </h2>
            <span
              class="text-xs px-2 py-1 rounded-full flex-shrink-0 self-start sm:self-auto"
              :class="getStatusClass(agenda)"
            >
              {{ getStatusText(agenda) }}
            </span>
          </div>

          <p
            class="text-sm text-gray-500 flex items-center gap-2 mt-1 whitespace-nowrap"
          >
            <span>{{ formatDate(agenda.start_datetime) }}</span>
            <span class="w-1 h-1 bg-black rounded-full inline-block"></span>
            <span class="truncate">{{
              agenda.location || "Lokasi tidak tersedia"
            }}</span>
          </p>

          <div
            class="text-sm text-gray-600 mt-2 line-clamp-2"
            v-html="stripHtmlTags(agenda.description)"
          ></div>
        </div>

        <button
          :disabled="getStatusText(agenda) === 'Selesai'"
          class="mt-0 md:mt-5 md:mb-12 border-2 border-green-600 text-green-600 px-3 py-2 sm:py-3 rounded-full text-xs hover:bg-green-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-400 self-start sm:self-end"
          @click="handleAgendaClick(agenda)"
        >
          {{ getButtonText(agenda) }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import AOS from "aos";
import "aos/dist/aos.css";
import Badge from "@/components/UI/Badge.vue";

// Gunakan agenda store
const agendaStore = useAgendaStore();

// Only show maximum 3 agenda items
const displayedAgendas = computed(() => {
  return agendaStore.list.slice(0, 3);
});

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (agenda) => {
  // Prioritaskan image_url dari API jika tersedia
  if (agenda.image_url) {
    return agenda.image_url;
  }
  
  // Fallback ke image path
  if (agenda.image) {
    const baseUrl = import.meta.env.VITE_STORAGE_URL || "https://cms-aptiknas.hexagon.co.id";
    
    if (agenda.image.startsWith("http")) {
      return agenda.image;
    }
    
    // Handle berbagai format path
    if (agenda.image.startsWith("agenda/")) {
      return `${baseUrl}/storage/${agenda.image}`;
    }
    
    if (agenda.image.startsWith("storage/agenda/")) {
      return `${baseUrl}/${agenda.image}`;
    }
    
    if (agenda.image.startsWith("/")) {
      return `${baseUrl}${agenda.image}`;
    }
    
    // Default: anggap sebagai nama file di folder agenda
    return `${baseUrl}/storage/${agenda.image}`;
  }

  // Fallback ke placeholder jika tidak ada gambar
  return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80";
};

// Handle error gambar
const handleImageError = (event, agenda) => {
  console.error("Gagal memuat gambar untuk agenda:", agenda?.title);

  // Fallback ke placeholder
  event.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80";
};

// Format tanggal untuk ditampilkan
const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";
  try {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    return "Format tanggal tidak valid";
  }
};

// Hapus tag HTML dari deskripsi
const stripHtmlTags = (html) => {
  if (!html) return "Tidak ada deskripsi";
  return html.replace(/<[^>]*>/g, "");
};

// Tentukan status agenda berdasarkan tanggal
const getStatusText = (agenda) => {
  if (!agenda.start_datetime) return "Tidak Diketahui";
  try {
    const now = new Date();
    const startDate = new Date(agenda.start_datetime);
    const endDate = agenda.end_datetime ? new Date(agenda.end_datetime) : null;

    if (endDate && now > endDate) return "Selesai";
    if (now >= startDate && (!endDate || now <= endDate)) return "Berlangsung";
    return "Akan Datang";
  } catch (error) {
    return "Error";
  }
};

// Tentukan class CSS berdasarkan status
const getStatusClass = (agenda) => {
  const status = getStatusText(agenda);
  switch (status) {
    case "Selesai":
      return "bg-gray-500 text-white";
    case "Berlangsung":
      return "bg-green-500 text-white";
    case "Akan Datang":
      return "bg-green-600 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

// Tentukan teks tombol berdasarkan status
const getButtonText = (agenda) => {
  const status = getStatusText(agenda);
  switch (status) {
    case "Selesai":
      return "Lihat Materi";
    case "Berlangsung":
      return "Ikuti Sekarang";
    case "Akan Datang":
      return "Daftar Sekarang";
    default:
      return "Lihat Detail";
  }
};

// Handle klik tombol agenda
const handleAgendaClick = (agenda) => {
  const status = getStatusText(agenda);
  if (status === "Akan Datang") {
    console.log("Mendaftar agenda:", agenda.title);
    // TODO: Implementasi logika pendaftaran
  } else if (status === "Berlangsung" && agenda.youtube_link) {
    window.open(agenda.youtube_link, "_blank");
  } else if (status === "Selesai") {
    console.log("Melihat materi agenda:", agenda.title);
    // TODO: Implementasi logika melihat materi
  }
};

onMounted(async () => {
  // Inisialisasi AOS
  AOS.init({
    once: true,
    duration: 600,
    easing: "ease-out-quad",
    offset: 20,
  });
  
  // Fetch data agenda dari store
  await agendaStore.fetchAll();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>