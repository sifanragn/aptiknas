<template>
  <section class="px-4 sm:px-6 py-12 sm:py-16 text-gray-800">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-2xl sm:text-3xl font-bold mb-2">
        Agenda Kegiatan APTIKNAS
      </h2>
      <p class="text-gray-600 text-sm sm:text-base mb-8 sm:mb-10">
        Jadwal kegiatan terbaru Asosiasi Pengusaha TIK Nasional - seminar,
        workshop, dan event networking untuk pengembangan industri TIK.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="agendaStore.loading" class="text-center text-gray-500 py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"
      ></div>
      <p>Memuat agenda...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="agendaStore.error" class="text-center text-red-500 py-8">
      <p>Gagal memuat agenda. Silakan coba lagi nanti.</p>
      <p class="text-sm mb-4">{{ agendaStore.error }}</p>
      <button
        @click="loadAgendaData"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <div
      v-else-if="agendaList && agendaList.length > 0"
      class="w-full max-w-xl mx-auto space-y-6 sm:space-y-12"
    >
      <AgendaCard
        v-for="(item, index) in agendaList"
        :key="item.id"
        :item="formatAgendaItem(item)"
        @card-click="handleCardClick"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
        :data-aos-once="false"
        class="w-full"
      />
    </div>

    <div
      v-else-if="!agendaStore.loading"
      class="text-center text-gray-500 py-12"
    >
      <i class="far fa-calendar-alt text-4xl mb-4"></i>
      <p>Tidak ada agenda untuk ditampilkan.</p>
    </div>

    <!-- View All Button -->
    <div class="text-center mt-10" data-aos="fade-up" data-aos-delay="300">
      <InteractiveHoverButton
        text="Lihat Semua Agenda"
        @click="$router.push('/agenda')"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import AgendaCard from "./AgendaCardEXS.vue";
import InteractiveHoverButton from "@/components/UI/interactive-hover-button/InteractiveHoverButton.vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Gunakan agenda store
const agendaStore = useAgendaStore();

const emit = defineEmits(["card-click"]);

// Format data dari store untuk komponen
const agendaList = computed(() => {
  if (!agendaStore.list || agendaStore.list.length === 0) return [];

  // Urutkan agenda berdasarkan tanggal mulai (terbaru dulu)
  const sortedList = [...agendaStore.list].sort(
    (a, b) => new Date(b.start_datetime) - new Date(a.start_datetime)
  );
  // Ambil hanya 3 data teratas
  return sortedList.slice(0, 3);
});

// Fungsi untuk memuat data agenda
const loadAgendaData = async () => {
  await agendaStore.fetchAll();
};

// Format agenda item untuk komponen AgendaCard
const formatAgendaItem = (item) => {
  return {
    id: item.id,
    title: item.title,
    date: formatDate(item.start_datetime),
    time: formatTimeRange(item.start_datetime, item.end_datetime),
    location: item.location || "Lokasi tidak tersedia",
    description: item.description
      ? stripHtmlTags(item.description)
      : "Tidak ada deskripsi",
    image: getImageUrl(item),
    category: item.type || item.event_organizer || "Agenda",
    status: getStatus(item),
    youtube_link: item.youtube_link,
    start_datetime: item.start_datetime,
    end_datetime: item.end_datetime,
    event_organizer: item.event_organizer,
  };
};

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
    if (item.image.startsWith("agenda/")) {
      return `${baseUrl}/storage/${item.image}`;
    }

    if (item.image.startsWith("storage/agenda/")) {
      return `${baseUrl}/${item.image}`;
    }

    if (item.image.startsWith("/")) {
      return `${baseUrl}${item.image}`;
    }

    // Default: anggap sebagai nama file di folder agenda
    return `${baseUrl}/storage/${item.image}`;
  }

  // Fallback ke placeholder jika tidak ada gambar
  return "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
};

// Hapus tag HTML dari deskripsi
const stripHtmlTags = (html) => {
  if (!html) return "Tidak ada deskripsi";
  return html.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
};

// Format tanggal untuk ditampilkan
const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Format tanggal tidak valid";
  }
};

// Format waktu range
const formatTimeRange = (startTime, endTime) => {
  if (!startTime) return "Waktu tidak tersedia";

  try {
    const start = new Date(startTime);
    const startFormatted = start.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!endTime) return `${startFormatted} WIB`;

    const end = new Date(endTime);
    const endFormatted = end.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${startFormatted} - ${endFormatted} WIB`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Waktu tidak tersedia";
  }
};

// Tentukan status agenda berdasarkan tanggal
const getStatus = (item) => {
  if (!item.start_datetime) return "upcoming";

  try {
    const now = new Date();
    const startDate = new Date(item.start_datetime);
    const endDate = item.end_datetime ? new Date(item.end_datetime) : null;

    if (endDate && now > endDate) return "completed";
    if (now >= startDate && (!endDate || now <= endDate)) return "ongoing";
    return "upcoming";
  } catch (error) {
    console.error("Error determining status:", error);
    return "upcoming";
  }
};

const handleCardClick = (item) => {
  emit("card-click", item);

  // Jika ada link YouTube, buka di tab baru
  if (item.youtube_link) {
    window.open(item.youtube_link, "_blank");
  } else {
    // Bisa diarahkan ke detail page jika diperlukan
    console.log("View agenda details:", item.id);
  }
};

// Inisialisasi AOS
onMounted(() => {
  AOS.init({
    duration: 600,
    easing: "ease-out-quad",
    once: false,
    offset: 20,
  });

  // Load data agenda
  loadAgendaData();
});

// Refresh AOS ketika agendaList berubah
watch(
  agendaList,
  () => {
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  },
  { deep: true }
);
</script>

<style scoped>
.agenda-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.agenda-card:hover {
  transform: translateY(-5px);
}

/* Loading animation */
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
