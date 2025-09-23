<template>
  <div class="dark:bg-neutral-900 flex flex-col items-center py-16">
    <!-- Judul -->
    <div class="text-center mb-10">
      <h2 class="text-2xl font-bold">
        Dewan Pengawas Asosiasi (DPA) DPP APTIKNAS
      </h2>
      <p class="text-gray-600">Masa Bhakti 2022–2027</p>
    </div>

    <!-- Card List -->
    <div class="flex flex-wrap justify-center gap-8">
      <CardProfile
        v-for="(member, index) in members"
        :key="index"
        :name="member.name"
        :position="member.role"
        :location="member.location"
        :image="member.image"
        :social="member.social"
      />
    </div>

    <!-- Selengkapnya -->
    <div class="mt-10">
      <button
        class="bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-green-600"
      >
        Selengkapnya
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex gap-3">
      <button
        class="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        class="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { h } from "vue";
import CardProfile from "@/components/Layout/CardProfile.vue";
import PatrickImage from "../../assets/patrick.png";

// Functional components for icons to pass them as props
const IconX = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M6 18L18 6M6 6l12 12",
        }),
      ]
    );
  },
};

const IconLinkedin = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
      },
      [
        h("path", {
          d: "M20.447 20.452h-3.555v-5.569c0-1.328-.027-3.036-1.849-3.036-1.853 0-2.137 1.445-2.137 2.939v5.666h-3.554V9h3.413v1.561h.047c.476-.9 1.637-1.849 3.37-1.849 3.602 0 4.268 2.37 4.268 5.455v6.285zM5.337 7.433a2.063 2.063 0 11-.001-4.126 2.063 2.063 0 01.001 4.126zm1.778 13.019H3.559V9h3.556v11.452z",
        }),
      ]
    );
  },
};

const members = [
  {
    name: "Felix Lukas Lukmana Goei",
    role: "Anggota",
    location: "Jateng",
    image: PatrickImage,
    social: [
      { icon: IconX, url: "#" },
      { icon: IconLinkedin, url: "#" },
    ],
  },
  {
    name: "Ir. Muzakkir",
    role: "Ketua",
    location: "Bogor",
    image: PatrickImage,
    social: [
      { icon: IconX, url: "#" },
      { icon: IconLinkedin, url: "#" },
    ],
  },
  {
    name: "Andoko",
    role: "Anggota",
    location: "Surakarta",
    image: PatrickImage,
    social: [
      { icon: IconX, url: "#" },
      { icon: IconLinkedin, url: "#" },
    ],
  },
];
</script>
