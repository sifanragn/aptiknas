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
defineProps({
  sections: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Optional: biar spacing lebih rapih */
</style>
