<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 mt-17">
    <!-- Header -->
    <div class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-2 h-8 bg-orange-600 rounded-full"></div>
          <span
            class="text-orange-600 font-semibold text-sm uppercase tracking-wider"
          >
            Hubungi Kami
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Mari Berkolaborasi
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Tim APTIKNAS siap membantu Anda. Hubungi kami melalui berbagai channel
          yang tersedia.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-lg p-8" data-aos="fade-right">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Nama Lengkap</label
                >
                <input
                  type="text"
                  v-model="form.name"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email</label
                >
                <input
                  type="email"
                  v-model="form.email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Subjek</label
              >
              <select
                v-model="form.subject"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="">Pilih Subjek</option>
                <option value="keanggotaan">Informasi Keanggotaan</option>
                <option value="event">Event & Kegiatan</option>
                <option value="partnership">Kemitraan</option>
                <option value="complaint">Keluhan</option>
                <option value="other">Lainnya</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Pesan</label
              >
              <textarea
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Tulis pesan Anda di sini..."
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading">Mengirim...</span>
              <span v-else>Kirim Pesan</span>
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8" data-aos="fade-left">
          <!-- Contact Cards -->
          <div class="grid gap-6">
            <div
              v-for="contact in contactMethods"
              :key="contact.title"
              class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center"
                  >
                    <component
                      :is="contact.icon"
                      class="w-6 h-6 text-orange-600"
                    />
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">
                    {{ contact.title }}
                  </h3>
                  <p class="text-gray-600 mb-2">{{ contact.description }}</p>
                  <a
                    v-if="contact.link"
                    :href="contact.link"
                    class="text-orange-600 font-medium hover:text-orange-700 transition-colors"
                  >
                    {{ contact.value }}
                  </a>
                  <p v-else class="text-gray-900 font-medium">
                    {{ contact.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Office Hours -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Jam Operasional</h3>
            <div class="space-y-3">
              <div
                v-for="schedule in officeHours"
                :key="schedule.day"
                class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <span class="text-gray-600">{{ schedule.day }}</span>
                <span class="font-medium text-gray-900">{{
                  schedule.hours
                }}</span>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Ikuti Kami</h3>
            <div class="flex gap-4">
              <a
                v-for="social in socialMedia"
                :key="social.name"
                :href="social.link"
                target="_blank"
                class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                <component :is="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

const loading = ref(false);
const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const contactMethods = ref([
  {
    title: "Email",
    description: "Untuk pertanyaan umum dan informasi",
    value: "info@aptiknas.id",
    link: "mailto:info@aptiknas.id",
    icon: "EnvelopeIcon",
  },
  {
    title: "Telepon",
    description: "Hubungi tim support kami",
    value: "+62 21 1234 5678",
    link: "tel:+622112345678",
    icon: "PhoneIcon",
  },
  {
    title: "WhatsApp",
    description: "Chat langsung dengan tim kami",
    value: "+62 812 3456 7890",
    link: "https://wa.me/6281234567890",
    icon: "ChatIcon",
  },
  {
    title: "Alamat Kantor",
    description: "Kunjungi kantor pusat APTIKNAS",
    value: "Jl. Contoh Alamat No. 123, Jakarta",
    link: null,
    icon: "MapPinIcon",
  },
]);

const officeHours = ref([
  { day: "Senin - Jumat", hours: "09:00 - 17:00 WIB" },
  { day: "Sabtu", hours: "09:00 - 14:00 WIB" },
  { day: "Minggu", hours: "Tutup" },
]);

const socialMedia = ref([
  {
    name: "LinkedIn",
    link: "#",
    icon: "LinkedInIcon",
  },
  {
    name: "Twitter",
    link: "#",
    icon: "TwitterIcon",
  },
  {
    name: "Instagram",
    link: "#",
    icon: "InstagramIcon",
  },
  {
    name: "Facebook",
    link: "#",
    icon: "FacebookIcon",
  },
]);

const submitForm = async () => {
  loading.value = true;
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));
  loading.value = false;
  alert("Pesan berhasil dikirim! Tim kami akan segera merespons.");
  Object.assign(form, { name: "", email: "", subject: "", message: "" });
};

// Define icons
const EnvelopeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
};

const PhoneIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
};

const ChatIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
};

const MapPinIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
};

const LinkedInIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
};

const TwitterIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
};

const InstagramIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
};

const FacebookIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>`,
};

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
  });
});
</script>
