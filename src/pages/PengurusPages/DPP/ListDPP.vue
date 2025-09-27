<template>
  <div class="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Dewan Pengawas Pusat (DPP) APTIKNAS
      </h1>
      <p class="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Para profesional berpengalaman yang mengawasi dan membimbing perkembangan 
        Asosiasi Pengusaha TIK Nasional
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
      <p class="mt-3 text-sm text-gray-600">Memuat data anggota...</p>
    </div>

    <!-- Content -->
    <div v-else class="max-w-6xl mx-auto">
      <!-- Grid Layout - More compact -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-8">
        <CardProfile
          v-for="member in paginatedMembers"
          :key="member.id"
          :name="member.name"
          :position="member.position"
          :location="member.location"
          :image="member.image"
          :social="member.social"
          class="scale-95 hover:scale-100 transition-transform duration-200"
        />
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="members.length > itemsPerPage"
        :total-items="members.length"
        :items-per-page="itemsPerPage"
        :model-value="currentPage"
        @page-changed="handlePageChange"
        class="mt-8"
      />

      <!-- Empty State -->
      <div v-if="members.length === 0" class="text-center py-8">
        <p class="text-gray-500 text-sm">Belum ada data anggota yang tersedia.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CardProfile from '@/components/Layout/CardProfile.vue'
import Pagination from '@/components/Layout/Pagination.vue'

// Data dummy untuk anggota DPA APTIKNAS (lebih compact)
const members = ref([
  {
    id: 1,
    name: "Dr. Suryo Prakoso, M.Kom.",
    position: "Ketua DPA",
    location: "Jakarta",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 2,
    name: "Ir. Muzakkir, MT.",
    position: "Wakil Ketua",
    location: "Bogor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 3,
    name: "Felix L. Goei, S.Kom.",
    position: "Anggota DPA",
    location: "Jateng",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 4,
    name: "Diana Widyastuti, M.Sc.",
    position: "Sekretaris",
    location: "Yogyakarta",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 5,
    name: "Prof. Ahmad Rizali, Ph.D.",
    position: "Anggota DPA",
    location: "Bandung",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 6,
    name: "Budi Santoso, M.T.I.",
    position: "Anggota DPA",
    location: "Surabaya",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 7,
    name: "Linda Hartati, M.M.",
    position: "Anggota DPA",
    location: "Medan",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 8,
    name: "Rudi Hermawan, S.Kom.",
    position: "Anggota DPA",
    location: "Bali",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 9,
    name: "Siti Rahayu, M.Cs.",
    position: "Anggota DPA",
    location: "Semarang",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 10,
    name: "Andi Pratama, M.Sc.",
    position: "Anggota DPA",
    location: "Makassar",
    image: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 11,
    name: "Maya I. Sari, M.Kom.",
    position: "Anggota DPA",
    location: "Palembang",
    image: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 12,
    name: "Joko Susilo, M.T.",
    position: "Anggota DPA",
    location: "Malang",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 13,
    name: "Rina Wijaya, M.M.",
    position: "Anggota DPA",
    location: "Batam",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 14,
    name: "Hendra Gunawan, M.Inf.Tech",
    position: "Anggota DPA",
    location: "Padang",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 15,
    name: "Fitri Anggraini, M.Sc.",
    position: "Anggota DPA",
    location: "Balikpapan",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 16,
    name: "Agus Setiawan, M.T.",
    position: "Anggota DPA",
    location: "Manado",
    image: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 17,
    name: "Dewi Kurniawati, M.Kom.",
    position: "Anggota DPA",
    location: "Cirebon",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 18,
    name: "Bambang Sutrisno, M.Sc.",
    position: "Anggota DPA",
    location: "Tangerang",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 19,
    name: "Nina Marlina, M.T.I.",
    position: "Anggota DPA",
    location: "Bekasi",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  },
  {
    id: 20,
    name: "Eko Prasetyo, Ph.D.",
    position: "Anggota DPA",
    location: "Depok",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    social: []
  }
])

const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(8) // Reduced items per page for better compactness

// Compute paginated members
const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return members.value.slice(start, end)
})

const handlePageChange = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 800)
})
</script>

<style scoped>
/* Custom compact styling */
.scale-95 {
  transform: scale(0.95);
}
.scale-100 {
  transform: scale(1);
}

.transition-transform {
  transition: transform 0.2s ease-in-out;
}

/* Improved grid spacing */
.gap-4 > * {
  margin: 0.5rem;
}

/* Better text proportions */
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
</style>