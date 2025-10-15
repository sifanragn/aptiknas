<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 mt-17 to-green-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12" data-aos="fade-up">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-2 h-8 bg-green-600 rounded-full"></div>
          <span class="text-green-600 font-semibold text-sm uppercase tracking-wider">
            Syarat & Ketentuan
          </span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Syarat & Ketentuan Layanan
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Ketentuan penggunaan layanan dan keanggotaan APTIKNAS yang perlu dipahami dan disetujui.
        </p>
      </div>

      <!-- Quick Navigation -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8" data-aos="fade-up">
        <h3 class="font-semibold text-gray-900 mb-4">Navigasi Cepat</h3>
        <div class="flex flex-wrap gap-3">
          <button v-for="section in termsSections" :key="section.title" 
                  @click="scrollToSection(section.title)"
                  class="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
            {{ section.title }}
          </button>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="space-y-8">
        <section v-for="(section, index) in termsSections" :key="section.title" 
                 :id="'section-' + index"
                 class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                 data-aos="fade-up" :data-aos-delay="index * 100">
          <div class="border-l-4 border-green-500">
            <div class="p-8">
              <div class="flex items-start gap-4 mb-6">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <component :is="section.icon" class="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div class="flex-1">
                  <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ section.title }}</h2>
                  
                  <!-- Articles -->
                  <div class="space-y-6">
                    <article v-for="(article, articleIndex) in section.articles" :key="articleIndex"
                             class="border-l-2 border-green-200 pl-6 py-2">
                      <h4 class="font-semibold text-gray-900 mb-2">{{ article.title }}</h4>
                      <p class="text-gray-700 leading-relaxed" v-html="article.content"></p>
                      
                      <!-- Points -->
                      <ul v-if="article.points" class="mt-3 space-y-2">
                        <li v-for="(point, pointIndex) in article.points" :key="pointIndex" 
                            class="flex items-start gap-2 text-gray-700">
                          <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                          <span v-html="point"></span>
                        </li>
                      </ul>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Agreement -->
      <div class="bg-white rounded-2xl shadow-lg border border-green-200 p-8 mt-12 text-center" data-aos="fade-up">
        <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Penerimaan Syarat & Ketentuan</h3>
        <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
          Dengan menggunakan layanan APTIKNAS, Anda menyetujui semua syarat dan ketentuan yang tercantum di atas.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const termsSections = ref([
  {
    title: 'Keanggotaan',
    icon: 'UsersIcon',
    articles: [
      {
        title: 'Persyaratan Keanggotaan',
        content: 'Keanggotaan APTIKNAS terbuka untuk profesional, perusahaan, dan institusi di bidang teknologi informasi dan komunikasi.',
        points: [
          'Usia minimal 18 tahun',
          'Berkecimpung di bidang TIK',
          'Menyetujui AD/ART APTIKNAS',
          'Membayar iuran keanggotaan'
        ]
      },
      {
        title: 'Hak Anggota',
        content: 'Setiap anggota berhak mendapatkan benefit dan akses ke layanan APTIKNAS sesuai dengan kategori keanggotaan.',
        points: [
          'Akses ke platform digital',
          'Partisipasi dalam event',
          'Networking opportunities',
          'Update industri terkini'
        ]
      }
    ]
  },
  {
    title: 'Layanan Digital',
    icon: 'GlobeIcon',
    articles: [
      {
        title: 'Platform Online',
        content: 'APTIKNAS menyediakan berbagai platform digital untuk mendukung kebutuhan anggota dalam berjejaring dan berkembang.',
        points: [
          'Portal anggota dengan akses 24/7',
          'Aplikasi mobile yang responsif',
          'Forum diskusi online',
          'Resource library eksklusif'
        ]
      }
    ]
  },
  {
    title: 'Kewajiban',
    icon: 'ShieldCheckIcon',
    articles: [
      {
        title: 'Kewajiban Anggota',
        content: 'Setiap anggota memiliki kewajiban untuk mematuhi peraturan dan menjaga etika profesional selama menjadi anggota.',
        points: [
          'Mempertahankan integritas profesional',
          'Tidak menyalahgunakan akses',
          'Menjaga kerahasiaan informasi',
          'Berpartisipasi aktif dalam kegiatan'
        ]
      }
    ]
  },
  {
    title: 'Sanksi',
    icon: 'ScaleIcon',
    articles: [
      {
        title: 'Pelanggaran dan Sanksi',
        content: 'Pelanggaran terhadap syarat dan ketentuan dapat mengakibatkan sanksi termasuk pencabutan keanggotaan.',
        points: [
          'Peringatan tertulis',
          'Penangguhan sementara',
          'Pencabutan keanggotaan',
          'Tindakan hukum jika diperlukan'
        ]
      }
    ]
  }
])

const scrollToSection = (title) => {
  const index = termsSections.value.findIndex(section => section.title === title)
  const element = document.getElementById(`section-${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Define icons
const UsersIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/></svg>`
}

const GlobeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9a9 9 0 00-9 9m9-9c0 5-4 9-9 9"/></svg>`
}

const ShieldCheckIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`
}

const ScaleIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>`
}

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true
  })
})
</script>