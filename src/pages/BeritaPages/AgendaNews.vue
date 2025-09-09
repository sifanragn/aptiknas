<template>
  <section class="px-4 sm:px-6 py-12 sm:py-16 text-gray-800">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-2xl sm:text-3xl font-bold mb-2">Agenda Kegiatan APTIKNAS</h2>
      <p class="text-gray-600 text-sm sm:text-base mb-8 sm:mb-10">
        Jadwal kegiatan terbaru Asosiasi Pengusaha TIK Nasional - seminar, workshop, dan event networking untuk pengembangan industri TIK.
      </p>
    </div>

    <div v-if="loading" class="text-center text-gray-500">
      Memuat agenda...
    </div>
    
    <div v-else-if="agendaList && agendaList.length > 0" class="w-full max-w-xl mx-auto space-y-6 sm:space-y-12">
      <AgendaCard
        v-for="(item, index) in agendaList"
        :key="item.id"
        :item="item"
        @card-click="handleCardClick"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
        :data-aos-once="false"
        class="w-full"
      />
    </div>

    <div v-else class="text-center text-gray-500">
      Tidak ada agenda untuk ditampilkan.
    </div>

    <!-- View All Button -->
    <div class="text-center mt-10" data-aos="fade-up" data-aos-delay="300">
      <button class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 
                    transition-colors duration-300 font-medium">
        Lihat Semua Agenda
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import AgendaCard from './AgendaCardEXS.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Data dummy untuk agenda APTIKNAS
const agendaList = ref([
  {
    id: 1,
    title: "Seminar Nasional Digital Transformation 2024",
    date: "15 September 2024",
    time: "09:00 - 17:00 WIB",
    location: "Jakarta Convention Center",
    description: "Seminar tentang transformasi digital untuk UMKM dengan pembicara ahli dari industri teknologi.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Seminar",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Workshop Cybersecurity untuk Pelaku Usaha",
    date: "22 September 2024",
    time: "13:00 - 16:00 WIB",
    location: "Online - Zoom Meeting",
    description: "Workshop intensif tentang keamanan siber untuk melindungi data bisnis dari ancaman digital.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Workshop",
    status: "upcoming"
  },
  {
    id: 3,
    title: "APTIKNAS Networking Night 2024",
    date: "30 September 2024",
    time: "19:00 - 22:00 WIB",
    location: "The Ritz-Carlton Jakarta",
    description: "Acara networking eksklusif untuk anggota APTIKNAS dengan pelaku industri dan pemerintah.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Networking",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Tech Training: Cloud Computing Fundamentals",
    date: "5 Oktober 2024",
    time: "10:00 - 15:00 WIB",
    location: "APTIKNAS Training Center",
    description: "Pelatihan fundamental cloud computing untuk pengusaha TIK yang ingin mengembangkan skill.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Training",
    status: "upcoming"
  }
]);

const loading = ref(false);

const emit = defineEmits(['card-click']);

const handleCardClick = (item) => {
  emit('card-click', item);
};

// Inisialisasi AOS
onMounted(() => {
  AOS.init({
    duration: 600,
    easing: 'ease-out-quad',
    once: false,
    offset: 20
  });
});

// Refresh AOS ketika agendaList berubah
watch(agendaList, () => {
  setTimeout(() => {
    AOS.refresh();
  }, 100);
}, { deep: true });
</script>

<style scoped>
.agenda-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.agenda-card:hover {
  transform: translateY(-5px);
}
</style>