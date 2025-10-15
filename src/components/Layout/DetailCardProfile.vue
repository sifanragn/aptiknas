<template>
  <div
    class="min-h-screen bg-gradient-to-br rounded-2xl from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">


      <!-- Main Content -->
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Sidebar - Profile Summary -->
        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-8 border border-gray-100 dark:border-gray-700"
          >
            <!-- Profile Image -->
            <div class="text-center mb-6">
              <div class="relative inline-block">
                <!-- Glow Effect -->
                <div
                  class="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 blur-2xl scale-125 opacity-30 animate-pulse"
                ></div>
                <!-- Image Container -->
                <div
                  class="relative rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg mx-auto"
                >
                  <img
                    :src="member.image"
                    :alt="`Foto ${member.name}`"
                    class="w-32 h-32 object-cover"
                  />
                </div>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="text-center mb-6">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {{ member.name }}
              </h2>
              <div
                class="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2"
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                {{ member.position }}
              </div>
              <div
                class="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {{ member.location }}
              </div>
            </div>

            <!-- Contact Info -->
            <div class="space-y-3 mb-6">
              <a
                :href="`tel:${member.phone}`"
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span class="text-sm">{{ member.phone }}</span>
              </a>
              <a
                :href="`mailto:${member.email}`"
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span class="text-sm truncate">{{ member.email }}</span>
              </a>
            </div>

            <!-- Categories -->
            <div
              class="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <div>
                <h3
                  class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  Kategori Daftar
                </h3>
                <div
                  class="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800"
                >
                  {{ member.dpdCategory || "DPD Jawa Barat" }}
                </div>
              </div>
              <div>
                <h3
                  class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  Kategori Pengurus
                </h3>
                <div
                  class="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-sm font-medium border border-green-100 dark:border-green-800"
                >
                  {{ member.staffCategory || "Dewan Pengurus Pusat" }}
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3
                class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3"
              >
                Terhubung
              </h3>
              <div class="flex justify-center gap-3">
                <a
                  v-for="social in member.social"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  class="p-2 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  :title="social.name"
                >
                  <component :is="getSocialIcon(social.name)" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <!-- Back Button -->
          <button
            @click="$router.back()"
            class="mt-6 w-full flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 group p-3 rounded-lg bg-gray-50 hover:bg-white dark:bg-gray-700/50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
          >
            <svg
              class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali
          </button>
        </div>

        <!-- Main Content - Detailed Information -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Personal Information Card -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
          >
            <div class="flex items-center justify-between mb-6">
              <h3
                class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"
              >
                <div
                  class="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 text-white"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                Informasi Pribadi
              </h3>
              <span
                class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                >Informasi Umum</span
              >
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <!-- Nama -->
              <div class="space-y-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1"
                >
                  <svg
                    class="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Nama Lengkap
                </label>
                <div
                  class="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-medium border border-gray-200 dark:border-gray-600"
                >
                  {{ member.name }}
                </div>
              </div>

              <!-- Alamat -->
              <div class="space-y-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1"
                >
                  <svg
                    class="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Alamat
                </label>
                <div
                  class="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                >
                  {{ member.location }}
                </div>
              </div>

              <!-- Telepon -->
              <div class="space-y-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1"
                >
                  <svg
                    class="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Telepon
                </label>
                <div
                  class="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-600"
                >
                  <a
                    :href="`tel:${member.phone}`"
                    class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors font-medium"
                  >
                    {{ member.phone || "081234567892" }}
                  </a>
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1"
                >
                  <svg
                    class="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email
                </label>
                <div
                  class="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-600"
                >
                  <a
                    :href="`mailto:${member.email}`"
                    class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors font-medium"
                  >
                    {{ member.email || "andri.sugondo@aptiknas.id" }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Description Card -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
          >
            <div class="flex items-center justify-between mb-4">
              <h3
                class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"
              >
                <div
                  class="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 text-white"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                Deskripsi Profil
              </h3>
              <span
                class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                >Tentang Anggota</span
              >
            </div>
            <div
              class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
            >
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{
                  member.description ||
                  "Bendahara APTIKNAS, berpengalaman dalam manajemen keuangan organisasi dan mendukung pengembangan usaha TIK nasional."
                }}
              </p>
            </div>
          </div>

          <!-- Social Media Links Card -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
          >
            <div class="flex items-center justify-between mb-6">
              <h3
                class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"
              >
                <div
                  class="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 text-white"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                Media Sosial
              </h3>
              <span
                class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                >{{ member.social.length }} Platform</span
              >
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div
                v-for="social in member.social"
                :key="social.name"
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="p-2 rounded-lg bg-white dark:bg-gray-600 shadow-sm"
                  >
                    <component
                      :is="getSocialIcon(social.name)"
                      class="w-5 h-5 text-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <span
                    class="font-medium text-gray-700 dark:text-gray-300 capitalize"
                    >{{ social.name }}</span
                  >
                </div>
                <a
                  :href="social.url"
                  target="_blank"
                  class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Kunjungi
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Additional Information Card -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
          >
            <div class="flex items-center justify-between mb-6">
              <h3
                class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"
              >
                <div
                  class="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 text-white"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                Informasi Tambahan
              </h3>
              <span
                class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                >Detail Lainnya</span
              >
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <!-- Status Keanggotaan -->
              <div class="space-y-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Status Keanggotaan</label
                >
                <div
                  class="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-600"
                >
                  <div class="w-2 h-2 rounded-full bg-green-500"></div>
                  <span class="text-gray-900 dark:text-white font-medium"
                    >Aktif</span
                  >
                </div>
              </div>

              <!-- Tanggal Bergabung -->
              <div class="space-y-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Tanggal Bergabung</label
                >
                <div
                  class="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                >
                  15 Januari 2020
                </div>
              </div>

              <!-- Masa Bakti -->
              <div class="space-y-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Masa Bakti</label
                >
                <div
                  class="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                >
                  2020 - 2024
                </div>
              </div>

              <!-- Komite -->
              <div class="space-y-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Komite</label
                >
                <div
                  class="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                >
                  Komite Keuangan & Anggaran
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Data member dari route params atau props
const member = {
  name: "Andri Sugondo",
  position: "Bendahara APTIKNAS",
  location: "Bandung, Indonesia",
  image: "/api/placeholder/128/128",
  phone: "081234567892",
  email: "andri.sugondo@aptiknas.id",
  description:
    "Bendahara APTIKNAS, berpengalaman dalam manajemen keuangan organisasi dan mendukung pengembangan usaha TIK nasional. Memiliki pengalaman lebih dari 10 tahun di bidang teknologi informasi dan komunikasi.",
  dpdCategory: "DPD Jawa Barat",
  staffCategory: "Dewan Pengurus Pusat",
  social: [
    { name: "facebook", url: "https://facebook.com/aptiknas" },
    { name: "instagram", url: "https://instagram.com/aptiknas.id" },
    { name: "tiktok", url: "https://tiktok.com/@aptiknas" },
    { name: "youtube", url: "https://youtube.com/@aptiknas" },
    { name: "linkedin", url: "https://linkedin.com/company/aptiknas" },
  ],
};

// Social Icons Components
const IconLinkedin = {
  render: () =>
    h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", {
        d: "M20.447 20.452h-3.555v-5.569c0-1.328-.027-3.036-1.849-3.036-1.853 0-2.137 1.445-2.137 2.939v5.666h-3.554V9h3.413v1.561h.047c.476-.9 1.637-1.849 3.37-1.849 3.602 0 4.268 2.37 4.268 5.455v6.285zM5.337 7.433a2.063 2.063 0 11-.001-4.126 2.063 2.063 0 01.001 4.126zm1.778 13.019H3.559V9h3.556v11.452z",
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
  facebook: IconFacebook,
  instagram: IconInstagram,
  youtube: IconYouTube,
  tiktok: IconTikTok,
};

function getSocialIcon(icon) {
  if (typeof icon === "string") {
    return socialIcons[icon.toLowerCase()] || null;
  }
  return icon;
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
