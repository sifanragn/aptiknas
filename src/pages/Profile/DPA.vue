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
      <InteractiveHoverButton text="Selengkapnya" />
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
import CardProfile from "@/components/Layout/CardProfile.vue";
import PatrickImage from "../../assets/patrick.png";
import InteractiveHoverButton from "@/components/UI/interactive-hover-button/InteractiveHoverButton.vue";

const members = [
  {
    name: "Felix Lukas Lukmana Goei",
    role: "Anggota",
    location: "Jateng",
    image: PatrickImage,
    social: [
      { name: "twitter", url: "#" },
      { name: "linkedin", url: "#" },
    ],
  },
  {
    name: "Ir. Muzakkir",
    role: "Ketua",
    location: "Bogor",
    image: PatrickImage,
    social: [
      { name: "twitter", url: "#" },
      { name: "linkedin", url: "#" },
      { name: "facebook", url: "#" },
    ],
  },
  {
    name: "Andoko",
    role: "Anggota",
    location: "Surakarta",
    image: PatrickImage,
    social: [
      { name: "instagram", url: "#" },
      { name: "linkedin", url: "#" },
      { name: "facebook", url: "#" },
    ],
  },
];
</script>
