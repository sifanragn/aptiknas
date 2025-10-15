<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 mt-17 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-2 h-8 bg-indigo-600 rounded-full"></div>
          <span class="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
            Jejaring Partner
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Partner Strategis APTIKNAS
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Berkolaborasi dengan organisasi dan perusahaan terkemuka untuk mendukung perkembangan industri TIK Indonesia.
        </p>
      </div>

      <!-- Partnership Benefits -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div v-for="benefit in partnershipBenefits" :key="benefit.title"
             class="text-center" data-aos="fade-up" :data-aos-delay="benefit.delay">
          <div class="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <component :is="benefit.icon" class="w-10 h-10 text-indigo-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">{{ benefit.title }}</h3>
          <p class="text-gray-600">{{ benefit.description }}</p>
        </div>
      </div>

      <!-- Partner Categories -->
      <div class="space-y-16">
        <section v-for="(category, index) in partnerCategories" :key="category.title"
                 class="bg-white rounded-2xl shadow-lg overflow-hidden"
                 data-aos="fade-up" :data-aos-delay="index * 100">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <component :is="category.icon" class="w-6 h-6" />
              </div>
              <div>
                <h2 class="text-2xl font-bold">{{ category.title }}</h2>
                <p class="text-indigo-100 opacity-90">{{ category.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="partner in category.partners" :key="partner.name"
                   class="group text-center">
                <div class="bg-gray-50 rounded-2xl p-6 h-full flex flex-col items-center justify-center group-hover:bg-indigo-50 transition-colors">
                  <img :src="partner.logo" :alt="partner.name" 
                       class="h-16 object-contain mb-4 grayscale group-hover:grayscale-0 transition-all">
                  <h4 class="font-semibold text-gray-900 mb-2">{{ partner.name }}</h4>
                  <p class="text-gray-600 text-sm flex-1">{{ partner.description }}</p>
                  <a v-if="partner.website" :href="partner.website" target="_blank"
                     class="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
                    Kunjungi Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Become Partner CTA -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 mt-16 text-center text-white" data-aos="fade-up">
        <h2 class="text-3xl font-bold mb-4">Jadi Partner Kami</h2>
        <p class="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
          Mari berkolaborasi untuk memajukan industri TIK Indonesia. Hubungi tim partnership kami untuk informasi lebih lanjut.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <button class="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Ajukan Partnership
          </button>
          <button class="border border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
            Download Proposal
          </button>
        </div>
      </div>

      <!-- Partnership Stats -->
      <div class="grid md:grid-cols-4 gap-8 mt-16">
        <div v-for="stat in partnershipStats" :key="stat.label"
             class="text-center" data-aos="zoom-in" :data-aos-delay="stat.delay">
          <div class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{{ stat.value }}</div>
          <div class="text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const partnershipBenefits = ref([
  {
    title: 'Network Eksklusif',
    description: 'Akses ke jaringan profesional dan bisnis di industri TIK',
    icon: 'NetworkIcon',
    delay: 0
  },
  {
    title: 'Brand Exposure',
    description: 'Tingkatkan visibilitas brand melalui berbagai platform APTIKNAS',
    icon: 'MegaphoneIcon',
    delay: 100
  },
  {
    title: 'Business Opportunities',
    description: 'Peluang bisnis dan kolaborasi dengan anggota APTIKNAS',
    icon: 'ChartBarIcon',
    delay: 200
  }
])

const partnerCategories = ref([
  {
    title: 'Corporate Partners',
    description: 'Perusahaan terkemuka yang mendukung perkembangan industri TIK',
    icon: 'BuildingOfficeIcon',
    partners: [
      {
        name: 'Telkom Indonesia',
        logo: 'https://via.placeholder.com/150x80?text=Telkom',
        description: 'Provider telekomunikasi terkemuka di Indonesia',
        website: 'https://telkom.co.id'
      },
      {
        name: 'Google Cloud',
        logo: 'https://via.placeholder.com/150x80?text=Google+Cloud',
        description: 'Layanan cloud computing dan teknologi',
        website: 'https://cloud.google.com'
      },
      {
        name: 'Microsoft',
        logo: 'https://via.placeholder.com/150x80?text=Microsoft',
        description: 'Perangkat lunak dan solusi teknologi',
        website: 'https://microsoft.com'
      }
    ]
  },
  {
    title: 'Government Partners',
    description: 'Lembaga pemerintah yang mendukung digitalisasi Indonesia',
    icon: 'BuildingLibraryIcon',
    partners: [
      {
        name: 'Kominfo',
        logo: 'https://via.placeholder.com/150x80?text=Kominfo',
        description: 'Kementerian Komunikasi dan Informatika',
        website: 'https://kominfo.go.id'
      },
      {
        name: 'Bekraf',
        logo: 'https://via.placeholder.com/150x80?text=Bekraf',
        description: 'Badan Ekonomi Kreatif Indonesia',
        website: 'https://bekraf.go.id'
      }
    ]
  },
  {
    title: 'Education Partners',
    description: 'Institusi pendidikan yang mendukung pengembangan SDM TIK',
    icon: 'AcademicCapIcon',
    partners: [
      {
        name: 'Universitas Indonesia',
        logo: 'https://via.placeholder.com/150x80?text=UI',
        description: 'Perguruan tinggi negeri terkemuka',
        website: 'https://ui.ac.id'
      },
      {
        name: 'ITB',
        logo: 'https://via.placeholder.com/150x80?text=ITB',
        description: 'Institut Teknologi Bandung',
        website: 'https://itb.ac.id'
      }
    ]
  }
])

const partnershipStats = ref([
  { value: '50+', label: 'Corporate Partners', delay: 0 },
  { value: '15+', label: 'Government Partners', delay: 100 },
  { value: '25+', label: 'Education Partners', delay: 200 },
  { value: '10+', label: 'International Partners', delay: 300 }
])

// Define icons
const NetworkIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
}

const MegaphoneIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>`
}

const ChartBarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`
}

const BuildingOfficeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`
}

const BuildingLibraryIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"/></svg>`
}

const AcademicCapIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>`
}

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true
  })
})
</script>