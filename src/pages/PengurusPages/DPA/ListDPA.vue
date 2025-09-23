<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Dewan Pengawas Asosiasi (DPA) APTIKNAS
      </h1>
      <p class="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Para profesional berpengalaman yang mengawasi dan membimbing
        perkembangan Asosiasi Pengusaha TIK Nasional
      </p>
    </div>

    <!-- Content -->
    <div class="max-w-6xl mx-auto">
      <!-- Grid Layout - More compact -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-8"
      >
        <CardProfile
          v-for="member in dpaMembers"
          :key="member.id"
          :name="member.name"
          :position="member.position"
          :location="member.location"
          :image="member.image"
          :social="member.social"
          class="scale-95 hover:scale-100 transition-transform duration-200"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CardProfile from "@/components/Layout/CardProfile.vue";

// Data dummy untuk Dewan Pengawas APTIKNAS dengan foto tanpa background
const dpaMembers = ref([
  {
    id: 1,
    name: "Dr. Bambang Sutrisno",
    position: "Ketua Dewan Pengawas",
    location: "Jakarta",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: [
      { name: "linkedin", url: "#" },
      { name: "twitter", url: "#" }
    ]
  },
  {
    id: 2,
    name: "Ir. Suryo Handono, M.Sc.",
    position: "Anggota Dewan Pengawas",
    location: "Bandung",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: [
      { name: "linkedin", url: "#" }
    ]
  },
  {
    id: 3,
    name: "Diana Pratiwi, S.Kom., M.T.I.",
    position: "Anggota Dewan Pengawas",
    location: "Surabaya",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: [
      { name: "linkedin", url: "#" },
      { name: "instagram", url: "#" }
    ]
  },
  {
    id: 4,
    name: "Prof. Ahmad Rizali, Ph.D.",
    position: "Anggota Dewan Pengawas - Bidang Teknologi",
    location: "Yogyakarta",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: [
      { name: "linkedin", url: "#" },
      { name: "twitter", url: "#" },
      { name: "facebook", url: "#" }
    ]
  },
  {
    id: 5,
    name: "Maria Magdalena, S.E., M.M.",
    position: "Anggota Dewan Pengawas - Bidang Keuangan",
    location: "Medan",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: [
      { name: "linkedin", url: "#" }
    ]
  },
  {
    id: 6,
    name: "Dr. Rudi Hartono, S.T., M.Kom.",
    position: "Anggota Dewan Pengawas - Bidang Pendidikan",
    location: "Semarang",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: [
      { name: "linkedin", url: "#" },
      { name: "twitter", url: "#" }
    ]
  },
  {
    id: 7,
    name: "Ir. Budi Santoso, M.Eng.",
    position: "Anggota Dewan Pengawas - Bidang Riset",
    location: "Makassar",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: [
      { name: "linkedin", url: "#" },
      { name: "researchgate", url: "#" }
    ]
  },
  {
    id: 8,
    name: "Nina Wijaya, S.Kom., M.B.A.",
    position: "Anggota Dewan Pengawas - Bidang Strategi",
    location: "Denpasar",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: [
      { name: "linkedin", url: "#" },
      { name: "instagram", url: "#" }
    ]
  },
  {
    id: 9,
    name: "Dr. Andi Rahman, S.T., M.Sc.",
    position: "Anggota Dewan Pengawas - Bidang Inovasi",
    location: "Palembang",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: [
      { name: "linkedin", url: "#" },
      { name: "twitter", url: "#" }
    ]
  }
]);
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