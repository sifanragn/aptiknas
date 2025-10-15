<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 mt-17 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12" data-aos="fade-up">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
          <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Kebijakan Privasi
          </span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Kebijakan Privasi APTIKNAS
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Kami berkomitmen melindungi privasi dan data pribadi Anda dengan standar keamanan tertinggi.
        </p>
      </div>

      <!-- Last Updated -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8" data-aos="fade-up">
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Terakhir Diperbarui</h3>
            <p class="text-gray-600">{{ lastUpdated }}</p>
          </div>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="space-y-8">
        <section v-for="(section, index) in privacySections" :key="section.title" 
                 class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                 data-aos="fade-up" :data-aos-delay="index * 100">
          <div class="p-8">
            <div class="flex items-start gap-4 mb-6">
              <div class="flex-shrink-0 mt-1">
                <div class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  {{ index + 1 }}
                </div>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-3">{{ section.title }}</h2>
                <p class="text-gray-700 leading-relaxed" v-html="section.content"></p>
                
                <!-- Sub-sections -->
                <div v-if="section.subsections" class="mt-6 space-y-4">
                  <div v-for="(sub, subIndex) in section.subsections" :key="subIndex"
                       class="bg-gray-50 rounded-xl p-4">
                    <h4 class="font-semibold text-gray-900 mb-2">{{ sub.title }}</h4>
                    <p class="text-gray-700 text-sm" v-html="sub.content"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Contact Info -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mt-12 text-center text-white" data-aos="fade-up">
        <h3 class="text-2xl font-bold mb-4">Pertanyaan tentang Privasi?</h3>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Jika Anda memiliki pertanyaan tentang kebijakan privasi kami, jangan ragu untuk menghubungi tim dukungan kami.
        </p>
        <button class="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
          Hubungi Tim Privasi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const lastUpdated = ref('15 Desember 2024')

const privacySections = ref([
  {
    title: 'Pengumpulan Informasi',
    content: 'Kami mengumpulkan informasi yang diperlukan untuk memberikan layanan terbaik kepada anggota APTIKNAS. Data yang dikumpulkan mencakup informasi identitas, kontak, dan profil profesional.',
    subsections: [
      {
        title: 'Data yang Dikumpulkan',
        content: 'Nama, alamat email, nomor telepon, institusi, dan informasi profil profesional lainnya.'
      },
      {
        title: 'Metode Pengumpulan',
        content: 'Melalui formulir pendaftaran, interaksi dengan layanan, dan komunikasi langsung.'
      }
    ]
  },
  {
    title: 'Penggunaan Data',
    content: 'Data yang kami kumpulkan digunakan untuk keperluan layanan keanggotaan, komunikasi, pengembangan produk, dan peningkatan pengalaman pengguna.',
    subsections: [
      {
        title: 'Tujuan Penggunaan',
        content: 'Verifikasi keanggotaan, pengiriman newsletter, notifikasi event, dan layanan dukungan.'
      }
    ]
  },
  {
    title: 'Perlindungan Data',
    content: 'Kami menerapkan standar keamanan tinggi dengan enkripsi data, akses terbatas, dan monitoring berkelanjutan untuk melindungi informasi pribadi Anda.',
    subsections: [
      {
        title: 'Keamanan Teknis',
        content: 'Enkripsi SSL/TLS, firewall, dan sistem deteksi intrusi.'
      },
      {
        title: 'Akses Data',
        content: 'Hanya personel yang berwenang yang dapat mengakses data pribadi.'
      }
    ]
  },
  {
    title: 'Hak Pengguna',
    content: 'Anda memiliki hak untuk mengakses, memperbaiki, menghapus, dan membatasi pemrosesan data pribadi Anda sesuai dengan peraturan yang berlaku.',
    subsections: [
      {
        title: 'Hak Akses dan Koreksi',
        content: 'Anda dapat meminta akses ke data pribadi dan mengoreksi ketidakakuratan.'
      },
      {
        title: 'Hak Penghapusan',
        content: 'Anda dapat meminta penghapusan data pribadi dalam kondisi tertentu.'
      }
    ]
  }
])

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true
  })
})
</script>