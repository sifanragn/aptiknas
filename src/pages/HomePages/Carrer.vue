<template>
  <!-- Career & Contributor Section -->
  <div class="grid md:grid-cols-2 gap-x-11 md:mt-30 px-6 max-w-5xl mx-auto items-center h-[20rem] md:mb-10 mb-30 mt-40">
    <!-- Career Card with Animations -->
    <div 
      class="max-w-xs -mt-25"
      data-aos="fade-right"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
    >
      <Badge 
        text="Peluang Karir"
        data-aos="fade-down"
        data-aos-delay="100"
      />
      <h3 
        class="text-2xl font-semibold mt-4 mb-2"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Kembangkan potensi, perluas jaringan, dan jadilah inspirasi bagi sesama anggota Aptiknas.
      </h3>
      <button 
        class="mt-4 px-5 py-2 bg-[#22c55e] text-white rounded-full hover:bg-green-700 text-sm transition-all duration-300 hover:scale-105"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Selengkapnya
      </button>
    </div>
    
    <!-- Contributor Slider -->
    <ContributorSlider 
      data-aos="fade-left"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ContributorSlider from './ContributorSlider.vue';
import Badge from '@/components/UI/Badge.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS with smooth settings
onMounted(() => {
  AOS.init({
    duration: 500,
    easing: 'ease-out-cubic',
    offset: 100,
    once: true
  });
});
</script>

<style>
/* Custom animation timing */
[data-aos] {
  transition-property: transform, opacity;
}

/* Smooth hover effects */
.hover-scale {
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.hover-scale:hover {
  transform: scale(1.05);
}
</style>