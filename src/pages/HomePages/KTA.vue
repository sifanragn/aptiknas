<template>
  <div class="h-fit w-full">
    <Timeline
      :items="data"
      title="Proses Keanggotaan APTIKNAS"
      description="Ikuti langkah-langkah mudah untuk menjadi anggota resmi APTIKNAS dan nikmati berbagai benefit eksklusif."
    >
      <template
        v-for="(item, index) in data"
        :key="item.id + 'template'"
        #[item.id]
      >
        <div class="mb-8 text-neutral-800 dark:text-neutral-200">
          <p class="text-sm md:text-base font-normal mb-4">
            {{ item.shortDescription }}
          </p>
          <div class="flex justify-end mt-4">
            <button
              @click="openModal(item)"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Lihat Detail Lengkap
            </button>
          </div>
        </div>
      </template>
    </Timeline>

    <!-- Modal/Popup -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6 pb-4 border-b">
            <div>
              <h3 class="text-2xl font-bold text-green-700 mb-2">
                {{ selectedItem?.label }}
              </h3>
              <p class="text-gray-600 text-sm">{{ selectedItem?.stepInfo }}</p>
            </div>
            <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-700 text-2xl p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              &times;
            </button>
          </div>
          
          <div class="mb-6">
            <h4 class="font-semibold text-gray-800 mb-3 text-lg">Deskripsi Lengkap</h4>
            <p class="text-gray-700 leading-relaxed">{{ selectedItem?.description }}</p>
          </div>
          
          <div class="mb-6">
            <h4 class="font-semibold text-green-600 mb-3 text-lg">Benefit yang Didapat</h4>
            <ul class="space-y-3">
              <li
                v-for="(benefit, benefitIndex) in selectedItem?.benefits"
                :key="benefitIndex"
                class="flex items-start gap-3 text-gray-700"
              >
                <span class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <div v-if="selectedItem?.additionalInfo" class="mb-6 bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-700 mb-2">Informasi Tambahan</h4>
            <p class="text-blue-800 text-sm">{{ selectedItem.additionalInfo }}</p>
          </div>
          
          <div class="flex justify-end pt-4 border-t">
            <button
              @click="closeModal"
              class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Timeline from "@/components/UI/timeline/Timeline.vue";
import { ref } from "vue";

interface TimelineItem {
  id: string;
  label: string;
  stepInfo: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  additionalInfo?: string;
}

const showModal = ref(false);
const selectedItem = ref<TimelineItem | null>(null);

const openModal = (item: TimelineItem) => {
  selectedItem.value = item;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedItem.value = null;
};

const data: TimelineItem[] = [
  {
    id: "pendaftaran",
    label: "Pendaftaran Online",
    stepInfo: "Langkah 1 - Proses 5 menit",
    shortDescription: "Isi formulir pendaftaran online dengan data diri lengkap.",
    description: "Isi formulir pendaftaran online dengan data diri yang lengkap dan valid. Proses ini hanya membutuhkan waktu 5 menit. Pastikan semua informasi yang Anda berikan akurat dan dapat dipertanggungjawabkan. Setelah mengisi formulir, Anda akan menerima email konfirmasi dalam waktu 15 menit.",
    benefits: [
      "Akses ke formulir digital yang mudah diisi",
      "Konfirmasi instan via email",
      "Support tim selama proses pendaftaran",
      "Panduan langkah demi langkah",
      "Simpan dan lanjutkan nanti fitur"
    ],
    additionalInfo: "Pastikan email dan nomor WhatsApp aktif untuk menerima notifikasi"
  },
  {
    id: "verifikasi",
    label: "Verifikasi Data",
    stepInfo: "Langkah 2 - 1-2 hari kerja",
    shortDescription: "Tim kami verifikasi data Anda dalam 1-2 hari kerja.",
    description: "Tim kami akan memverifikasi data yang Anda submit. Proses ini biasanya memakan waktu 1-2 hari kerja. Kami akan menghubungi Anda jika terdapat data yang perlu diklarifikasi. Verifikasi mencakup validasi identitas, informasi kontak, dan kelengkapan dokumen yang diperlukan.",
    benefits: [
      "Proses verifikasi yang transparan",
      "Notifikasi status via WhatsApp/Email",
      "Tim verifikasi yang profesional",
      "Keamanan data terjamin",
      "Bantuan koreksi data jika diperlukan"
    ]
  },
  {
    id: "pembayaran",
    label: "Pembayaran",
    stepInfo: "Langkah 3 - Proses instan",
    shortDescription: "Bayar biaya keanggotaan via berbagai channel pembayaran.",
    description: "Lakukan pembayaran biaya keanggotaan melalui berbagai channel pembayaran yang tersedia. Kami menerima transfer bank, e-wallet, dan pembayaran digital lainnya. Setiap pembayaran akan diverifikasi otomatis dan Anda akan menerima invoice resmi yang dapat diunduh.",
    benefits: [
      "Multiple payment channels",
      "Invoice resmi yang dapat dibuktikan",
      "Konfirmasi pembayaran real-time",
      "Pilihan metode pembayaran lengkap",
      "Riwayat pembayaran tersimpan"
    ],
    additionalInfo: "Pembayaran akan diverifikasi otomatis dalam 1-2 jam"
  },
  {
    id: "aktivasi",
    label: "Aktivasi Keanggotaan",
    stepInfo: "Langkah 4 - Maksimal 24 jam",
    shortDescription: "Keanggotaan aktif setelah pembayaran terverifikasi.",
    description: "Setelah pembayaran dikonfirmasi, keanggotaan Anda akan diaktivasi dan Anda dapat menikmati semua benefit keanggotaan APTIKNAS secara penuh. Proses aktivasi berlangsung otomatis dalam waktu maksimal 24 jam setelah pembayaran terverifikasi.",
    benefits: [
      "Kartu anggota digital",
      "Akses ke platform member",
      "Welcome package eksklusif",
      "Akses ke newsletter anggota",
      "Diskon untuk event APTIKNAS"
    ]
  },
  {
    id: "orientasi",
    label: "Orientasi Anggota",
    stepInfo: "Langkah 5 - Sesi fleksibel",
    shortDescription: "Ikuti sesi orientasi untuk maksimalkan manfaat keanggotaan.",
    description: "Ikuti sesi orientasi untuk memahami hak dan kewajiban sebagai anggota serta memaksimalkan manfaat keanggotaan Anda. Sesi orientasi tersedia dalam format online dan offline, dengan jadwal fleksibel yang dapat disesuaikan dengan ketersediaan Anda.",
    benefits: [
      "Webinar onboarding gratis",
      "Material panduan lengkap",
      "Networking dengan anggota lain",
      "Sesi tanya jawab dengan mentor",
      "Akses ke komunitas eksklusif"
    ],
    additionalInfo: "Jadwal orientasi dapat dipilih sesuai ketersediaan waktu Anda"
  }
];
</script>

<style scoped>
/* Custom styles untuk tampilan yang lebih baik */
</style>