<script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

const data = [
  {
    title: "Email",
    description: "Office : hello@uiwiki.co",
    icon: "fas fa-envelope",
  },
  {
    title: "Phone",
    description: "office : +62 812 3456 7890",
    icon: "fas fa-phone",
  },
  {
    title: "Address",
    description:
      "Ketapang Indah, Jl. Kyai H. Zainul Arifin No.33-34, Krukut, Tamansari, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11140",
    icon: "fas fa-map-marker-alt",
  },
];

onMounted(() => {
  // Inisialisasi AOS
  AOS.init({
    duration: 600,
    easing: "ease-out-cubic",
    once: true,
    offset: 20,
  });
});
</script>

<template>
  <div>
    <div class="w-md  pr-4 sm:pr-6 lg:pr-8 py-12">
      <!-- Single Card Container -->
      <div
        class="bg-white rounded-lg shadow p-6 md:p-8 md:max-w-2xl mx-auto"
        data-aos="fade-up"
      >
        <div
          v-for="(item, index) in data"
          :key="index"
          class="flex items-start text-left gap-6"
          :class="{ 'mt-6 pt-6 border-t border-gray-200': index > 0 }"
        >
          <div
            class="size-16 flex-shrink-0 flex items-center justify-center rounded-full bg-green-100 text-green-600"
          >
            <i :class="item.icon" class="text-2xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ item.title }}
            </h3>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
