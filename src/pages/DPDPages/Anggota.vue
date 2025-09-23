<script setup>
import { ref, computed, onMounted } from "vue";
import CardProfile from "@/components/Layout/CardProfile.vue";
import { members as allMembers } from "@/pages/DPDPages/data.ts";

const props = defineProps({
  daerah: {
    type: String,
    required: true,
  },
});

const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const members = ref(allMembers);

const dpdMembers = computed(() => {
  return members.value.filter((member) => member.type === "dpd");
});

const filteredMembers = computed(() => {
  if (!props.daerah) return [];
  return dpdMembers.value.filter((member) => {
    return generateSlug(member.region) === props.daerah;
  });
});

const namaDaerah = computed(() => {
  const member = filteredMembers.value[0];
  return member
    ? member.region
    : props.daerah.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
});

const loading = ref(false);
onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 500);
});
</script>
<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        Dewan Pengurus Daerah (DPD)
      </h1>
      <h2 class="text-2xl sm:text-3xl font-semibold text-green-700">
        {{ namaDaerah }}
      </h2>
      <p class="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed mt-4">
        Struktur kepengurusan APTIKNAS di tingkat daerah {{ namaDaerah }}.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"
      ></div>
      <p class="mt-3 text-sm text-gray-600">Memuat data anggota...</p>
    </div>

    <!-- Content -->
    <div v-else class="max-w-6xl mx-auto">
      <!-- Grid Layout -->
      <div
        v-if="filteredMembers.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <CardProfile
          v-for="member in filteredMembers"
          :key="member.id"
          :name="member.name"
          :position="member.position"
          :location="member.location"
          :image="member.image"
          :social="member.social"
          class="transition-transform duration-200 hover:scale-105"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          Data Tidak Ditemukan
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Data untuk DPD {{ daerah.replace(/-/g, " ") }} tidak ditemukan.
        </p>
      </div>
    </div>
  </div>
</template>
