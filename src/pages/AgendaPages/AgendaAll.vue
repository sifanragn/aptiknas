<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Pagination from '@/components/layout/Pagination.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Data dummy untuk agenda APTIKNAS
const agendaData = ref([
  {
    id: 1,
    title: "Seminar Nasional Digital Transformation 2024",
    date: "15 September 2024",
    location: "Jakarta Convention Center",
    description: "Seminar tentang transformasi digital untuk UMKM dengan pembicara ahli dari industri teknologi.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    altText: "Seminar Digital Transformation",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "Workshop Cybersecurity untuk Pelaku Usaha",
    date: "22 September 2024",
    location: "Online - Zoom Meeting",
    description: "Workshop intensif tentang keamanan siber untuk melindungi data bisnis dari ancaman digital.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    altText: "Workshop Cybersecurity",
    status: "Upcoming"
  },
  {
    id: 3,
    title: "APTIKNAS Networking Night 2024",
    date: "30 September 2024",
    location: "The Ritz-Carlton Jakarta",
    description: "Acara networking eksklusif untuk anggota APTIKNAS dengan pelaku industri dan pemerintah.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    altText: "Networking Night",
    status: "Upcoming"
  },
  {
    id: 4,
    title: "Tech Training: Cloud Computing Fundamentals",
    date: "5 Oktober 2024",
    location: "APTIKNAS Training Center",
    description: "Pelatihan fundamental cloud computing untuk pengusaha TIK yang ingin mengembangkan skill.",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    altText: "Cloud Computing Training",
    status: "Upcoming"
  }
])

const currentPage = ref(1)
const itemsPerPage = 2
const loading = ref(false)

// Inisialisasi AOS
onMounted(() => {
  AOS.init({
    duration: 500,
    easing: 'ease-out-quad',
    once: false,
    offset: 20
  })
})

const agendaList = computed(() => agendaData.value)

const displayedAgendas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return agendaList.value.slice(start, end)
})

const handlePageChange = (page) => {
  currentPage.value = page
  // Refresh AOS setelah halaman berubah
  setTimeout(() => {
    AOS.refresh()
  }, 50)
}

// Refresh AOS ketika data agenda berubah
watch(agendaList, () => {
  setTimeout(() => {
    AOS.refresh()
  }, 100)
})
</script>

<template>
  <section class="px-6 py-16 text-gray-800">
    <div class="max-w-3xl mx-auto text-center mb-10">
      <h2 class="text-3xl font-bold mb-2">Agenda APTIKNAS</h2>
      <p class="text-gray-600">Simak jadwal kegiatan terbaru Asosiasi Pengusaha TIK Nasional...</p>
    </div>

    <div v-if="loading" class="text-center text-gray-500">
      Memuat agenda...
    </div>

    <div v-else-if="displayedAgendas.length" class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      <div 
        v-for="(item, index) in displayedAgendas" 
        :key="item.id" 
        class="p-4 rounded-2xl hover:shadow border-gray-100 flex flex-col md:flex-row gap-6 transition-all"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <div 
          class="relative size-51 flex-shrink-0"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          <img :src="item.imageUrl" :alt="item.altText" class="rounded-xl w-full h-full object-cover" />
        </div>
        <div class="flex flex-col justify-between gap-y-2">
          <span 
            class="text-xs bg-green-200 text-green-800 font-medium w-fit px-3 py-1 rounded-full"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            {{ item.status }}
          </span>
          <h3 
            class="text-lg font-semibold mt-2"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            {{ item.title }}
          </h3>
          <p 
            class="text-sm text-gray-600"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {{ item.location }}
          </p>
          <p 
            class="text-sm text-gray-500 line-clamp-2" 
            v-html="item.description"
            data-aos="fade-up"
            data-aos-delay="350"
          ></p>
          <div 
            class="mt-2 text-sm text-gray-600"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {{ item.date }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      Tidak ada agenda untuk ditampilkan.
    </div>

    <Pagination
      v-if="agendaList.length > itemsPerPage"
      :total-items="agendaList.length"
      :items-per-page="itemsPerPage"
      :model-value="currentPage"
      @page-changed="handlePageChange"
      class="mt-8"
    />
  </section>
</template>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}
.hover\:shadow:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>