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
    <div v-if="loading" class="text-center text-gray-500 py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"
      ></div>
      <p>Memuat agenda...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500 py-8">
      <p>Gagal memuat agenda. Silakan coba lagi nanti.</p>
      <p class="text-sm mb-4">{{ error }}</p>
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

    <div v-else class="text-center text-gray-500 py-12">
      <i class="far fa-calendar-alt text-4xl mb-4"></i>
      <p>Tidak ada agenda untuk ditampilkan.</p>
    </div>

    <!-- View All Button -->
    <div class="text-center mt-10" data-aos="fade-up" data-aos-delay="300">
      <button
        class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
        @click="viewAllAgenda"
      >
        Lihat Semua Agenda
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import AgendaCard from "./AgendaCardEXS.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const loading = ref(false);
const error = ref(null);

// Data dummy untuk agenda
const dummyAgendaData = ref([
  {
    id: 1,
    title: "Webinar: AI dalam Industri Kreatif",
    description:
      "Jelajahi bagaimana Kecerdasan Buatan (AI) mengubah lanskap industri kreatif, dari desain grafis hingga produksi musik. Sesi ini akan menampilkan studi kasus nyata dan demo langsung.",
    start_datetime: "2024-11-05T10:00:00",
    end_datetime: "2024-11-05T12:00:00",
    location: "Online via Zoom",
    image:
      "https://images.unsplash.com/photo-1677442135703-178c33d748be?auto=format&fit=crop&w=500&q=80",
    youtube_link: "https://youtube.com",
  },
  {
    id: 2,
    title: "Workshop: Dasar-dasar Keamanan Siber untuk Startup",
    description:
      "Amankan startup Anda dari ancaman siber. Workshop praktis ini akan membahas teknik-teknik esensial untuk melindungi data, jaringan, dan aplikasi Anda sejak dini.",
    start_datetime: "2024-11-18T09:00:00",
    end_datetime: "2024-11-18T16:00:00",
    location: "APTIKNAS Innovation Hub",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=500&q=80",
    youtube_link: null,
  },
  {
    id: 3,
    title: "Networking Night: Kolaborasi Teknologi Masa Depan",
    description:
      "Bertemu dan berjejaring dengan para pemimpin industri, investor, dan inovator teknologi dalam acara malam yang santai dan produktif. Temukan mitra strategis Anda berikutnya.",
    start_datetime: "2024-11-29T19:00:00",
    end_datetime: "2024-11-29T22:00:00",
    location: "Rooftop Bar, Jakarta",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80",
    youtube_link: null,
  },
]);

// Mengambil data dari store
const agendaList = computed(() => {
  return dummyAgendaData.value;
});

const emit = defineEmits(["card-click"]);

// Fungsi untuk memuat data agenda
const loadAgendaData = async () => {
  loading.value = true;
  error.value = null;
  // Simulasi fetch data
  setTimeout(() => {
    loading.value = false;
  }, 800);
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
    image: getImageUrl(item.image),
    category: item.type || item.event_organizer || "Agenda",
    status: getStatus(item),
    youtube_link: item.youtube_link,
    start_datetime: item.start_datetime,
    end_datetime: item.end_datetime,
  };
};

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
  }

  // Jika API mengembalikan URL lengkap (baik yang benar maupun yang salah)
  if (imagePath.startsWith("http")) {
    // Mengganti duplikasi seperti '.../agenda/agenda/...' menjadi '.../storage/agenda/...'
    // Ini membuat URL konsisten dengan format yang benar.
    return imagePath.replace(
      /^(http:\/\/[^/]+)\/(agenda\/agenda\/)/,
      "$1/storage/agenda/"
    );
  }

  // Jika API mengembalikan path relatif (contoh: 'agenda/image.jpg')
  const baseUrl = "http://127.0.0.1:8000";

  // Menghindari duplikasi jika `imagePath` sudah diawali dengan 'storage/'
  if (imagePath.startsWith("storage/")) {
    return `${baseUrl}/${imagePath}`;
  }

  return `${baseUrl}/storage/${imagePath.replace(/^agenda\//, "agenda/")}`;
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

const viewAllAgenda = () => {
  // Navigasi ke halaman semua agenda
  console.log("Navigate to all agenda page");
  // window.location.href = '/agenda'; // Uncomment jika ada route untuk semua agenda
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
