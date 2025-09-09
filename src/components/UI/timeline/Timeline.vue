<template>
  <section
    ref="timelineContainerRef"
    class="w-full font-sans py-16"
  >
    <div 
      class="mx-auto max-w-7xl px-4 lg:px-10 md:px-8 text-center"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <Badge>Bagaimana</Badge>
      <h2 class="text-3xl font-bold text-gray-900 mt-4 mb-2">
        Cara Mudah Mendapatkan KTA
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto mb-12">
        Ikuti 4 langkah praktis berikut untuk menjadi anggota resmi MGBK dan nikmati berbagai manfaat keanggotaan.
      </p>
    </div>

    <div
      ref="timelineRef"
      class="relative z-0 mx-auto max-w-5xl"
    >
      <!-- Timeline line -->
      <div
        :style="{ height: height + 'px' }"
        class="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-[2px] bg-white hidden md:block "
      >
        <Motion
          as="div"
          :style="{
            height: heightTransform,
            opacity: opacityTransform,
          }"
          class="absolute top-0 w-[2px] bg-green-500"
        ></Motion>
      </div>

      <!-- Timeline items -->
      <div
        v-for="(item, index) in hows"
        :key="item.id + index"
        class="relative py-8 md:py-12"
        data-aos="fade-up"
        :data-aos-delay="100 * index"
      >
        <!-- Dot with number -->
        <div 
          class="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform"
          data-aos="zoom-in"
          :data-aos-delay="150 * index"
        >
          <div class=" hidden md:flex size-12 border-4 border-green-200 items-center justify-center rounded-full bg-green-500 text-white font-bold">
            {{ index + 1 }}
          </div>
        </div>

        <!-- Content - Alternating layout -->
        <div class="flex flex-col md:flex-row items-center gap-8 relative">
          <!-- Image (left for even, right for odd) -->
          <div 
            :class="[
              'md:w-1/2',
              index % 2 === 0 ? 'md:order-1' : 'md:order-2'
            ]"
            :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
            :data-aos-delay="200 + (100 * index)"
          >
            <img 
              :src="item.imageUrl" 
              :alt="item.label" 
              class="w-70 max-w-md rounded-lg shadow-lg mx-auto"
              data-aos="zoom-in"
              :data-aos-delay="250 + (100 * index)"
            />
             <div class=" absolute translate-x-1/2 -bottom-5  right-1/2 md:hidden flex size-12 items-center justify-center rounded-full bg-green-500 text-white font-bold">
            {{ index + 1 }}
          </div>
          </div>

          <!-- Text content (right for even, left for odd) -->
          <div 
            :class="[
              'md:w-1/2 px-4',
              index % 2 === 0 ? 'md:order-2 md:text-left md:pl-30' : 'md:order-1 md:text-right md:pr-30'
            ]"
            :data-aos="index % 2 === 0 ? 'fade-left' : 'fade-right'"
            :data-aos-delay="200 + (100 * index)"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              {{ item.label }}
            </h3>
            <p class="text-gray-600 mb-4" v-html="item.description"></p>
            <a 
              href="#" 
              class="text-green-500 font-medium inline-flex items-center"
              data-aos="fade-up"
              :data-aos-delay="300 + (100 * index)"
            >
              Learn more
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Motion, useScroll, useTransform } from "motion-v";
// import type { HTMLAttributes } from "vue";
import { nextTick, onMounted, ref } from "vue";
// import Badge from '@/components/templates/Badge.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Data dummy untuk timeline
const hows = ref([
  {
    id: 1,
    label: "Daftar Online",
    description: "Isi formulir pendaftaran online dengan data diri yang lengkap dan valid. Proses ini hanya membutuhkan waktu 5 menit.",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    label: "Verifikasi Data",
    description: "Tim kami akan memverifikasi data yang Anda submit. Proses ini biasanya memakan waktu 1-2 hari kerja.",
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    label: "Pembayaran",
    description: "Lakukan pembayaran biaya keanggotaan melalui berbagai channel pembayaran yang tersedia.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    label: "Aktivasi Keanggotaan",
    description: "Setelah pembayaran dikonfirmasi, keanggotaan Anda akan diaktivasi dan Anda dapat menikmati semua benefit.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
]);

const loading = ref(false);
const error = ref(null);

const timelineContainerRef = ref<HTMLElement | null>(null);
const timelineRef = ref<HTMLElement | null>(null);
const height = ref(0);

onMounted(async () => {
  await nextTick();
  if (timelineRef.value) {
    const rect = timelineRef.value.getBoundingClientRect();
    height.value = rect.height;
  }
  
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
  });
});

const { scrollYProgress } = useScroll({
  target: timelineContainerRef,
  offset: ["start end", "end start"],
});

const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
const heightTransform = useTransform(scrollYProgress, (latest) => {
  return latest * height.value;
});
</script>