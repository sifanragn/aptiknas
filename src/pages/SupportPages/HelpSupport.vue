<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12 mt-17">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12" data-aos="fade-up">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-2 h-8 bg-purple-600 rounded-full"></div>
          <span class="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Pusat Bantuan
          </span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Bagaimana Kami Dapat Membantu?
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Temukan solusi cepat untuk pertanyaan umum atau hubungi tim support kami.
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <div class="relative">
            <input type="text" v-model="searchQuery" placeholder="Cari solusi..."
                   class="w-full px-6 py-4 pl-12 bg-white border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors">
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid md:grid-cols-3 gap-6 mb-12" data-aos="fade-up">
        <div v-for="action in quickActions" :key="action.title"
             class="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer group"
             @click="scrollToSection(action.target)">
          <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
            <component :is="action.icon" class="w-8 h-8 text-purple-600" />
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ action.title }}</h3>
          <p class="text-gray-600 text-sm">{{ action.description }}</p>
        </div>
      </div>

      <!-- FAQ Sections -->
      <div class="space-y-8">
        <section v-for="(category, index) in faqCategories" :key="category.title"
                 :id="category.id"
                 class="bg-white rounded-2xl shadow-lg overflow-hidden"
                 data-aos="fade-up" :data-aos-delay="index * 100">
          <div class="border-b border-gray-100">
            <div class="p-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <component :is="category.icon" class="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">{{ category.title }}</h2>
                  <p class="text-gray-600">{{ category.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="(faq, faqIndex) in category.faqs" :key="faqIndex"
                   class="border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                <button @click="toggleFAQ(faqIndex, category.id)"
                        class="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span class="font-medium text-gray-900">{{ faq.question }}</span>
                  <svg :class="['w-5 h-5 text-gray-500 transform transition-transform', 
                              openFAQs[category.id] === faqIndex ? 'rotate-180' : '']" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-if="openFAQs[category.id] === faqIndex" class="px-6 pb-4">
                  <p class="text-gray-700 leading-relaxed" v-html="faq.answer"></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Support CTA -->
      <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mt-12 text-center text-white" data-aos="fade-up">
        <h3 class="text-2xl font-bold mb-4">Butuh Bantuan Lebih Lanjut?</h3>
        <p class="text-purple-100 mb-6 max-w-2xl mx-auto">
          Tim support kami siap membantu Anda 24/7 melalui berbagai channel yang tersedia.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <button class="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Hubungi Support
          </button>
          <button class="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors">
            Live Chat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const searchQuery = ref('')
const openFAQs = reactive({})

const quickActions = ref([
  {
    title: 'Keanggotaan',
    description: 'Panduan pendaftaran dan manfaat keanggotaan',
    target: 'membership',
    icon: 'UserGroupIcon'
  },
  {
    title: 'Teknis',
    description: 'Masalah platform dan akses digital',
    target: 'technical',
    icon: 'CogIcon'
  },
  {
    title: 'Pembayaran',
    description: 'Informasi iuran dan metode pembayaran',
    target: 'payment',
    icon: 'CreditCardIcon'
  }
])

const faqCategories = ref([
  {
    id: 'membership',
    title: 'Keanggotaan',
    description: 'Pertanyaan seputar pendaftaran dan manfaat keanggotaan',
    icon: 'UserGroupIcon',
    faqs: [
      {
        question: 'Bagaimana cara mendaftar menjadi anggota APTIKNAS?',
        answer: 'Pendaftaran dapat dilakukan melalui website resmi APTIKNAS. Isi formulir online, lengkapi dokumen yang diperlukan, dan lakukan pembayaran iuran keanggotaan. Proses verifikasi membutuhkan waktu 1-2 hari kerja.'
      },
      {
        question: 'Apa saja benefit yang didapat sebagai anggota?',
        answer: 'Anggota mendapatkan akses ke network profesional, event eksklusif, training & workshop, update industri, dan berbagai diskon dari partner APTIKNAS.'
      },
      {
        question: 'Berapa biaya keanggotaan APTIKNAS?',
        answer: 'Biaya keanggotaan bervariasi berdasarkan kategori (perorangan, perusahaan, institusi). Silakan hubungi tim kami untuk informasi detail mengenai biaya terkini.'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Bantuan Teknis',
    description: 'Panduan penggunaan platform dan solusi teknis',
    icon: 'CogIcon',
    faqs: [
      {
        question: 'Bagaimana cara reset password?',
        answer: 'Klik "Lupa Password" di halaman login, masukkan email terdaftar, dan ikuti instruksi yang dikirim ke email Anda. Link reset password akan berlaku selama 24 jam.'
      },
      {
        question: 'Platform tidak bisa diakses, apa yang harus dilakukan?',
        answer: 'Pastikan koneksi internet stabil, clear cache browser, atau coba akses dari browser berbeda. Jika masalah berlanjut, hubungi tim technical support.'
      }
    ]
  },
  {
    id: 'payment',
    title: 'Pembayaran & Iuran',
    description: 'Informasi mengenai pembayaran dan renew keanggotaan',
    icon: 'CreditCardIcon',
    faqs: [
      {
        question: 'Metode pembayaran apa saja yang diterima?',
        answer: 'Kami menerima transfer bank, e-wallet (OVO, Gopay, Dana), dan kartu kredit. Invoice resmi akan dikirimkan setelah pembayaran berhasil.'
      },
      {
        question: 'Bagaimana cara renew keanggotaan?',
        answer: 'Anda akan mendapatkan notifikasi 30 hari sebelum masa keanggotaan berakhir. Renew dapat dilakukan melalui dashboard anggota dengan proses yang sama seperti pembayaran awal.'
      }
    ]
  }
])

const toggleFAQ = (index, categoryId) => {
  if (openFAQs[categoryId] === index) {
    openFAQs[categoryId] = null
  } else {
    openFAQs[categoryId] = index
  }
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Define icons
const UserGroupIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`
}

const CogIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
}

const CreditCardIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>`
}

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true
  })
})
</script>