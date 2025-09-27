<template>
  <div class="flex flex-wrap justify-center gap-8 mt-20">
    <!-- Card Loop -->
    <div
      v-for="card in contactCards"
      :key="card.id"
      class="relative w-80 h-70 rounded-2xl overflow-hidden cursor-pointer"
      @mouseenter="card.hover = true"
      @mouseleave="card.hover = false"
    >
      <!-- Card Default -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-green-300 to-green-700 text-white p-6 flex flex-col justify-between transition-all duration-700 ease-in-out rounded-2xl "
        :class="
          card.hover
            ? 'opacity-0 scale-90 translate-y-6 rotate-1'
            : 'opacity-100 scale-100 translate-y-0 rotate-0'
        "
      >
        <div>
          <h2
            class="text-2xl font-bold leading-tight"
            v-html="card.default.title"
          ></h2>
          <p class="mt-2">{{ card.default.subtitle }}</p>
        </div>
        <div class="flex justify-end">
          <div
            class="w-8 h-8 text-3xl flex items-center justify-center"
            v-html="card.icon"
          ></div>
        </div>
      </div>

      <!-- Card Hover -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-green-300 to-green-700 rounded-2xl text-gray-800 transition-all duration-700 ease-in-out"
        :class="
          card.hover
            ? 'opacity-100 scale-100 translate-y-0 rotate-0'
            : 'opacity-0 scale-95 translate-y-6 rotate-1'
        "
      >
        <div class="flex flex-col items-center pt-8">
          <div
            class="bg-white/90 p-3 rounded-full shadow transform transition-transform duration-700"
            :class="card.hover ? 'scale-110 rotate-6' : 'scale-90 rotate-0'"
          >
            <div
              class="w-10 h-10 text-4xl text-green-600 flex items-center justify-center"
              v-html="card.icon"
            ></div>
          </div>
          <h2
            class="mt-4 text-lg font-semibold text-white transition-opacity duration-700"
            :class="card.hover ? 'opacity-100 delay-200' : 'opacity-0'"
          >
            {{ card.hoverView.title }}
          </h2>
        </div>

        <div
          class="bg-white mt-6 p-4 rounded-b-2xl flex items-center gap-3 transition-all duration-700 delay-200"
          :class="
            card.hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          "
        >
          <div class="bg-green-200 p-2 rounded-full">
            <div
              class="w-6 h-6 text-xl text-green-600 flex items-center justify-center"
              v-html="card.icon"
            ></div>
          </div>
          <div>
            <div
              v-for="detail in card.hoverView.details"
              :key="detail.label"
              class="min-h-[3.25rem]"
            >
              <p class="text-sm text-gray-500">{{ detail.label }}</p>
              <p class="font-semibold text-gray-900">{{ detail.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const icons = {
  email: `<i class="fa-solid fa-envelope"></i>`,
  phone: `<i class="fa-solid fa-phone"></i>`,
  lightning: `<i class="fa-solid fa-bolt-lightning"></i>`,
};

const contactCards = ref([
  {
    id: "email",
    hover: false,
    icon: icons.email,
    default: {
      title: "Email <br> Dokumen",
      subtitle: "dppaptiknas@gmail.com",
    },
    hoverView: {
      title: "Email Dokumen",
      details: [
        { label: "Alamat Email", value: "dppaptiknas@gmail.com" },
        { label: " ", value: " " }, // Spacer untuk menyamakan tinggi
      ],
    },
  },
  {
    id: "phone",
    hover: false,
    icon: icons.phone,
    default: {
      title: "Konfirmasi Administrasi",
      subtitle: "Nurmah - 0823-1262-9962",
    },
    hoverView: {
      title: "Konfirmasi Administrasi",
      details: [
        { label: "Nama Kontak", value: "Nurmah" },
        { label: "Nomor Telepon", value: "0823-1262-9962" },
      ],
    },
  },
  {
    id: "process",
    hover: false,
    icon: icons.lightning,
    default: {
      title: "Proses Cepat",
      subtitle: "3 Hari kerja setelah dokumen diterima",
    },
    hoverView: {
      title: "Proses Cepat",
      details: [
        { label: "Waktu Proses", value: "Maksimal 3 Hari Kerja" },
        { label: "Syarat", value: "Setelah dokumen diterima" },
      ],
    },
  },
]);
</script>
