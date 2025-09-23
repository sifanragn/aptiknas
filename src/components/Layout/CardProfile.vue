<!-- components/ProfileCard.vue -->
<template>
  <div
    class="w-sm rounded-2xl shadow-md bg-white p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:pt-8"
  >
    <!-- Bagian Kiri -->
    <div class="flex-1">
      <h2 class="text-lg font-semibold text-black">{{ name }}</h2>
      <p class="text-gray-400">{{ position }}</p>
      <p class="text-gray-400">{{ location }}</p>

      <!-- Social Icons -->
      <div class="flex gap-3 mt-3">
        <!-- Looping untuk sosial media -->
        <a
          v-for="(icon, index) in social"
          :key="index"
          :href="icon.url"
          target="_blank"
          class="p-2 rounded-md border hover:bg-gray-100"
        >
          <component :is="icon.icon" class="w-5 h-5" />
        </a>
      </div>
    </div>

    <!-- Bagian Kanan (Foto) -->
    <div class="relative">
      <div
        class="absolute inset-0 rounded-full bg-green-200 blur-2xl scale-125"
      ></div>
      <img :src="image" alt="profile" class="relative size-40 object-cover" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  position: { type: String, default: "" },
  location: { type: String, default: "" },
  image: { type: String, required: true },
  social: {
    type: Array,
    default: () => [], // contoh: [{ icon: IconComponent, url: "https://..." }]
  },
});
</script>
