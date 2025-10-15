<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import Pagination from "@/components/Layout/Pagination.vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Gunakan agenda store
const agendaStore = useAgendaStore();

const currentPage = ref(1);
const itemsPerPage = 2; // Menampilkan lebih banyak item per halaman

// Format data dari store untuk komponen
const agendaList = computed(() => {
  if (!agendaStore.list || agendaStore.list.length === 0) {
    return [];
  }

  return agendaStore.list.map((agenda) => ({
    id: agenda.id,
    title: agenda.title,
    date: formatDate(agenda.start_datetime),
    location: agenda.location || "Lokasi tidak tersedia",
    description: agenda.description
      ? stripHtmlTags(agenda.description)
      : "Tidak ada deskripsi",
    imageUrl: getImageUrl(agenda),
    altText: agenda.title,
    status: getStatusText(agenda),
    start_datetime: agenda.start_datetime,
    end_datetime: agenda.end_datetime,
    youtube_link: agenda.youtube_link,
    event_organizer: agenda.event_organizer,
    type: agenda.type,
  }));
});

// Inisialisasi AOS
onMounted(async () => {
  AOS.init({
    duration: 500,
    easing: "ease-out-quad",
    once: false,
    offset: 20,
  });

  // Load data agenda dari store
  await loadAgendaData();
});

// Fungsi untuk memuat data agenda
const loadAgendaData = async () => {
  await agendaStore.fetchAll();
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

// Hapus tag HTML dari deskripsi
const stripHtmlTags = (html) => {
  if (!html) return "Tidak ada deskripsi";
  const stripped = html.replace(/<[^>]*>/g, "");
  return stripped.length > 150 ? stripped.substring(0, 150) + "..." : stripped;
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
    console.error("Error determining status:", error);
    return "Error";
  }
};

// Tentukan class CSS berdasarkan status
const getStatusClass = (status) => {
  switch (status) {
    case "Selesai":
      return "bg-gray-200 text-gray-800";
    case "Berlangsung":
      return "bg-green-200 text-green-800";
    case "Akan Datang":
      return "bg-blue-200 text-blue-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const displayedAgendas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return agendaList.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
  // Refresh AOS setelah halaman berubah
  setTimeout(() => {
    AOS.refresh();
  }, 50);
};

// Refresh AOS ketika data agenda berubah
watch(agendaList, () => {
  setTimeout(() => {
    AOS.refresh();
  }, 100);
});

// Handle klik agenda
const handleAgendaClick = (agenda) => {
  if (agenda.youtube_link) {
    window.open(agenda.youtube_link, "_blank");
  } else {
    // Bisa diarahkan ke detail page jika diperlukan
    console.log("View agenda details:", agenda.id);
  }
};
</script>

<template>
  <section class="px-6 py-16 text-gray-800">
    <div class="max-w-3xl mx-auto text-center mb-10">
      <h2 class="text-3xl font-bold mb-2">Agenda APTIKNAS</h2>
      <p class="text-gray-600">
        Simak jadwal kegiatan terbaru Asosiasi Pengusaha TIK Nasional...
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="agendaStore.loading" class="text-center text-gray-500 py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#511378] mx-auto mb-4"
      ></div>
      <p>Memuat agenda...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="agendaStore.error" class="text-center text-red-500 py-12">
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
      v-else-if="displayedAgendas.length > 0"
      class="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto"
    >
      <div
        v-for="(item, index) in displayedAgendas"
        :key="item.id"
        class="bg-white p-4 rounded-2xl hover:shadow-lg border border-gray-200 flex flex-col sm:flex-row w-full gap-5 transition-all cursor-pointer"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
        @click="handleAgendaClick(item)"
      >
        <div
          class="relative h-48 sm:h-auto sm:w-48 flex-shrink-0 overflow-hidden rounded-xl"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          <img
            :src="item.imageUrl"
            :alt="item.altText"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            @error="
              (e) =>
                (e.target.src =
                  'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')
            "
          />
        </div>

        <div class="flex flex-col gap-2 flex-grow">
          <span
            class="text-xs font-medium w-fit px-3 py-1 rounded-full"
            :class="getStatusClass(item.status)"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            {{ item.status }}
          </span>

          <h3
            class="text-lg font-semibold line-clamp-2 text-gray-900"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            {{ item.title }}
          </h3>

          <p
            class="text-sm text-gray-600 flex items-center gap-2"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <i class="fas fa-map-marker-alt text-xs"></i>
            {{ item.location }}
          </p>

          <p
            class="text-sm text-gray-500 line-clamp-3 flex-grow mt-1"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            {{ item.description }}
          </p>

          <div
            class="mt-auto text-sm text-gray-600 flex items-center gap-1"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <i class="far fa-calendar-alt text-xs"></i>
            {{ item.date }}
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!agendaStore.loading"
      class="text-center text-gray-500 py-12"
    >
      <i class="far fa-calendar-times text-4xl mb-4"></i>
      <p>Tidak ada agenda untuk ditampilkan.</p>
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="agendaList.length > itemsPerPage"
      :total-items="agendaList.length"
      :items-per-page="itemsPerPage"
      :model-value="currentPage"
      @page-changed="handlePageChange"
      class="mt-12"
    />
  </section>
</template>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cursor-pointer {
  cursor: pointer;
}

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
