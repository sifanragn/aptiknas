<template>
  <!-- Header -->
  <div class="grid md:grid-cols-2 gap-8 items-center mb-16 mt-15">
    <!-- Konten Teks -->
    <div data-aos="fade-right">
      <div
        class="flex items-center gap-2 text-sm text-gray-500 mb-2"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <span
          class="border border-black px-3 py-1 rounded-full text-xs font-medium"
          >Our Blog</span
        >
        <span>{{ formattedDate }}</span>
      </div>
      <h1
        class="text-3xl md:text-4xl font-bold leading-snug text-gray-900 mb-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Transformasi Peran Guru BK di Era Digital: Dari Konselor ke Fasilitator
        Literasi Emosional
      </h1>
      <p class="text-gray-700 mb-6" data-aos="fade-up" data-aos-delay="300">
        Dalam beberapa tahun terakhir, peran Guru Bimbingan dan Konseling
      </p>
      <interactive-hover-button
        text="Jelajahi Blog"
        icon="fas fa-arrow-right"
        class="mt-4"
        data-aos="fade-up"
        data-aos-delay="400"
        @click="$router.push('/news')"
      />
    </div>

    <!-- Gambar -->
    <div data-aos="fade-left">
      <img
        src="https://images.unsplash.com/photo-1562788869-4ed32648eb72"
        alt="Cover Berita"
        class="rounded-2xl w-full object-cover"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import InteractiveHoverButton from "@/components/UI/interactive-hover-button/InteractiveHoverButton.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const formattedDate = ref("");

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 50,
  });

  const today = new Date();
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  formattedDate.value = today.toLocaleDateString("id-ID", options);
  // Hasil: "30 Agustus 2025"
});
</script>
