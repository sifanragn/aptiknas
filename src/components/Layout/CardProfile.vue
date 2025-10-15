<!-- components/ProfileCard.vue -->
<template>
  <div
    class="group relative w-full max-w-sm rounded-2xl bg-white p-6 flex items-center gap-6 cursor-pointer transition-all duration-700 ease-out hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-300/40"
  >
    <!-- Gradient border animasi -->
    <div
      class="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 opacity-0 group-hover:opacity-100 animate-gradient-x transition-opacity duration-700"
    ></div>

    <!-- Bagian Kiri -->
    <div
      class="flex-1 relative z-10 transition-all duration-700 group-hover:translate-x-1 min-w-0"
    >
      <h2
        class="text-xl font-bold text-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-400 transition-all duration-700 line-clamp-2"
      >
        {{ name }}
      </h2>
      <p
        class="text-gray-400 group-hover:text-gray-600 transition-colors duration-500 text-sm truncate"
      >
        {{ position }}
      </p>
      <p
        class="text-gray-400 group-hover:text-gray-600 transition-colors duration-500 text-sm truncate"
      >
        {{ location }}
      </p>

      <!-- Social Icons -->
      <div class="flex gap-3 mt-4 flex-nowrap">
        <a
          v-for="(item, index) in social"
          :key="index"
          :href="item.url"
          target="_blank"
          class="relative p-2 rounded-full border border-gray-300 text-gray-500 transition-all duration-500 hover:border-green-500 hover:text-green-600 hover:scale-125 flex-shrink-0"
        >
          <component
            :is="getSocialIcon(item.name || item.icon)"
            class="w-4 h-4 transition-transform duration-500 group-hover:animate-bounce"
          />
        </a>
      </div>
    </div>

    <!-- Bagian Kanan (Foto) -->
    <div class="relative z-10 flex-shrink-0">
      <!-- Glow animasi - diperbesar mengikuti ukuran gambar -->
      <div
        class="absolute inset-0 rounded-full bg-green-300 blur-2xl scale-125 opacity-60 transition-all duration-1000 group-hover:scale-150 group-hover:opacity-80 group-hover:animate-pulse"
        :style="{ width: '180px', height: '180px', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.25)' }"
      ></div>
      
      <!-- Container gambar dengan ukuran lebih besar -->
      <div class="relative rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img
          :src="currentImage()"
          :alt="`Foto ${name}`"
          class="w-32 h-32 object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-6"
          loading="lazy"
          @error="handleImageError"
        />
      </div>
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
import { h, ref } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  position: { type: String, default: "" },
  location: { type: String, default: "" },
  image: { type: String, required: true },
  social: {
    type: Array,
    default: () => [], // contoh: [{ name: 'twitter', url: '...' }]
  },
  fallbackImage: {
    type: String,
    default: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24'%3E%3Cpath fill='%239ca3af' d='M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z'/%3E%3C/svg%3E"
  }
});

// State untuk menangani error gambar
const imageError = ref(false);

// Fungsi untuk menangani error loading gambar
const handleImageError = (event) => {
  console.warn(`Gagal memuat gambar: ${props.image}`);
  imageError.value = true;
  if (props.fallbackImage) {
    event.target.src = props.fallbackImage;
  }
};

// Computed untuk menentukan gambar yang akan ditampilkan
const currentImage = () => {
  return imageError.value ? props.fallbackImage : props.image;
};

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

const IconYouTube = {
  render: () =>
    h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", {
        d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
      }),
    ]),
};

const IconTikTok = {
  render: () =>
    h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", {
        d: "M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z",
      }),
    ]),
};

const socialIcons = {
  linkedin: IconLinkedin,
  twitter: IconTwitter,
  facebook: IconFacebook,
  instagram: IconInstagram,
  youtube: IconYouTube,
  tiktok: IconTikTok,
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

/* Memastikan konten tidak overflow */
.min-w-0 {
  min-width: 0;
}
</style>