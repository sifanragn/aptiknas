<!-- components/ProfileCard.vue -->
<template>
  <div
    class="group relative w-sm rounded-2xl bg-white p-6 flex items-center gap-6 cursor-pointer transition-all duration-700 ease-out hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-300/40"
  >
    <!-- Gradient border animasi -->
    <div
      class="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 opacity-0 group-hover:opacity-100 animate-gradient-x transition-opacity duration-700"
    ></div>

    <!-- Bagian Kiri -->
    <div
      class="flex-1 relative z-10 transition-all duration-700 group-hover:translate-x-1"
    >
      <h2
        class="text-xl font-bold text-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-400 transition-all duration-700"
      >
        {{ name }}
      </h2>
      <p
        class="text-gray-400 group-hover:text-gray-600 transition-colors duration-500"
      >
        {{ position }}
      </p>
      <p
        class="text-gray-400 group-hover:text-gray-600 transition-colors duration-500"
      >
        {{ location }}
      </p>

      <!-- Social Icons -->
      <div class="flex gap-4 mt-4">
        <a
          v-for="(item, index) in social"
          :key="index"
          :href="item.url"
          target="_blank"
          class="relative p-2 rounded-full border border-gray-300 text-gray-500 transition-all duration-500 hover:border-green-500 hover:text-green-600 hover:scale-125"
        >
          <component
            :is="getSocialIcon(item.name || item.icon)"
            class="w-5 h-5 transition-transform duration-500 group-hover:animate-bounce"
          />
        </a>
      </div>
    </div>

    <!-- Bagian Kanan (Foto) -->
    <div class="relative z-10">
      <!-- Glow animasi -->
      <div
        class="absolute inset-0 rounded-full bg-green-300 blur-2xl scale-125 opacity-60 transition-all duration-1000 group-hover:scale-150 group-hover:opacity-80 group-hover:animate-pulse"
      ></div>
      <img
        :src="image"
        alt="profile"
        class="relative size-40 object-cover rounded-full transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-6"
      />
    </div>

    <!-- Shine effect -->
    <div
      class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 overflow-hidden"
    >
      <div
        class="absolute inset-0 w-[150%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { h } from "vue";

defineProps({
  name: { type: String, required: true },
  position: { type: String, default: "" },
  location: { type: String, default: "" },
  image: { type: String, required: true },
  social: {
    type: Array,
    default: () => [], // contoh: [{ name: 'twitter', url: '...' }]
  },
});

// --- Functional Components for Social Icons ---

const IconLinkedin = {
  render: () =>
    h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", {
        d: "M20.447 20.452h-3.555v-5.569c0-1.328-.027-3.036-1.849-3.036-1.853 0-2.137 1.445-2.137 2.939v5.666h-3.554V9h3.413v1.561h.047c.476-.9 1.637-1.849 3.37-1.849 3.602 0 4.268 2.37 4.268 5.455v6.285zM5.337 7.433a2.063 2.063 0 11-.001-4.126 2.063 2.063 0 01.001 4.126zm1.778 13.019H3.559V9h3.556v11.452z",
      }),
    ]),
};

const IconTwitter = {
  render: () =>
    h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", {
        d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      }),
    ]),
};

const IconFacebook = {
  render: () =>
    h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", {
        d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
      }),
    ]),
};

const IconInstagram = {
  render: () =>
    h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", {
        d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z",
      }),
    ]),
};

const socialIcons = {
  linkedin: IconLinkedin,
  twitter: IconTwitter,
  facebook: IconFacebook,
  instagram: IconInstagram,
};

function getSocialIcon(icon) {
  if (typeof icon === "string") {
    return socialIcons[icon.toLowerCase()] || null;
  }
  // Fallback for old format (passing component directly)
  return icon;
}
</script>

<style scoped>
/* Animasi gradient border */
@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 4s ease infinite;
}
</style>
