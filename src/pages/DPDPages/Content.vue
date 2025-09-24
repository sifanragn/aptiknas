<template>
  <div class="max-w-6xl mx-auto px-6 py-12 space-y-16">
    <div
      v-for="(item, index) in sections"
      :key="index"
      class="grid md:grid-cols-2 gap-8 items-center"
    >
      <!-- Gambar (posisi bergantian kiri/kanan) -->
      <div
        :class="index % 2 === 0 ? 'order-1 md:order-1' : 'order-1 md:order-2'"
        class="flex justify-center"
        :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
      >
        <img
          :src="item.image"
          alt="gambar"
          class="rounded-2xl w-full md:w-11/12 object-cover"
        />
      </div>

      <!-- Konten teks -->
      <div
        :class="index % 2 === 0 ? 'order-2 md:order-2' : 'order-2 md:order-1'"
        class="space-y-4"
        :data-aos="index % 2 === 0 ? 'fade-left' : 'fade-right'"
      >
        <h2 class="text-2xl font-bold text-gray-900">
          {{ item.title }}
        </h2>
        <p class="text-gray-700 leading-relaxed">
          {{ item.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

defineProps({
  sections: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  AOS.init({
    duration: 800,
    once: false, // Set ke false agar animasi berulang setiap kali di-scroll
    offset: 100, // Animasi akan terpicu sedikit lebih awal
  });
});
</script>

<style scoped>
/* Optional: biar spacing lebih rapih */
</style>
