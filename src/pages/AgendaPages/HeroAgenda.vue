<template>
  <!-- Header -->
  <div class="grid md:grid-cols-2 gap-8 items-center mb-16 mt-15">
    <!-- Gambar (pindah ke kiri) -->
    <div class="relative" data-aos="fade-right">
      <!-- Tambahkan relative pada parent div -->
      <img
        src="https://images.unsplash.com/photo-1562788869-4ed32648eb72"
        alt="Cover Berita"
        class="rounded-4xl w-full object-cover"
      />
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        class="absolute top-4 left-4 bg-white px-2 py-2 shadow rounded-2xl text-center text-sm text-black"
      >
        <div class="font-medium text-[10px] text-gray-600">
          {{ formattedDate.dayName }}
        </div>
        <div class="text-lg font-bold text-black">{{ formattedDate.day }}</div>
        <div class="text-[8px] font-medium text-gray-600">
          {{ formattedDate.month }} {{ formattedDate.year }}
        </div>
      </div>
    </div>

    <!-- Konten Teks (pindah ke kanan) -->
    <div data-aos="fade-left">
      <div
        class="flex items-center gap-2 text-sm text-gray-500 mb-2"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <span
          class="border border-black px-3 py-1 rounded-full text-xs font-medium"
          >Our Blog</span
        >
      </div>
      <h1
        data-aos="fade-up"
        data-aos-delay="200"
        class="text-3xl md:text-5xl font-bold leading-snug text-gray-900 mb-4"
      >
        Forum diskusi Komunitas Guru BK Wilayah
      </h1>
      <interactive-hover-button
        text="Jelajahi Blog"
        data-aos="fade-up"
        data-aos-delay="300"
        icon="fas fa-arrow-right"
        class="mt-4"
        @click="$router.push('/news')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import InteractiveHoverButton from "@/components/UI/interactive-hover-button/InteractiveHoverButton.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const formattedDate = ref({
  dayName: "",
  day: "",
  month: "",
  year: "",
});

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
  });

  const today = new Date();

  // Format hari (Senin, Selasa, etc)
  const dayName = today.toLocaleDateString("id-ID", { weekday: "long" });

  // Tanggal (1-31)
  const day = today.getDate();

  // Nama bulan
  const month = today.toLocaleDateString("id-ID", { month: "long" });

  // Tahun
  const year = today.getFullYear();

  formattedDate.value = {
    dayName: dayName,
    day: day,
    month: month,
    year: year,
  };
});
</script>
