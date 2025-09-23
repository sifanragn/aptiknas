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
            {{ item.description }}
          </p>
          <div class="bg-gray-100 p-4 rounded-lg mt-4">
            <h4 class="font-semibold text-green-500 mb-2">
              Benefit yang didapat:
            </h4>
            <ul class="list-disc list-inside text-xs md:text-sm space-y-1">
              <li
                v-for="(benefit, benefitIndex) in item.benefits"
                :key="benefitIndex"
              >
                {{ benefit }}
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import Timeline from "@/components/UI/timeline/Timeline.vue";

const data = [
  {
    id: "pendaftaran",
    label: "Pendaftaran Online",
    description:
      "Isi formulir pendaftaran online dengan data diri yang lengkap dan valid. Proses ini hanya membutuhkan waktu 5 menit. Pastikan semua informasi yang Anda berikan akurat dan dapat dipertanggungjawabkan.",
    benefits: [
      "Akses ke formulir digital yang mudah diisi",
      "Konfirmasi instan via email",
      "Support tim selama proses pendaftaran",
    ],
  },
  {
    id: "verifikasi",
    label: "Verifikasi Data",
    description:
      "Tim kami akan memverifikasi data yang Anda submit. Proses ini biasanya memakan waktu 1-2 hari kerja. Kami akan menghubungi Anda jika terdapat data yang perlu diklarifikasi.",
    benefits: [
      "Proses verifikasi yang transparan",
      "Notifikasi status via WhatsApp/Email",
      "Tim verifikasi yang profesional",
    ],
  },
  {
    id: "pembayaran",
    label: "Pembayaran",
    description:
      "Lakukan pembayaran biaya keanggotaan melalui berbagai channel pembayaran yang tersedia. Kami menerima transfer bank, e-wallet, dan pembayaran digital lainnya.",
    benefits: [
      "Multiple payment channels",
      "Invoice resmi yang dapat dibuktikan",
      "Konfirmasi pembayaran real-time",
    ],
  },
  {
    id: "aktivasi",
    label: "Aktivasi Keanggotaan",
    description:
      "Setelah pembayaran dikonfirmasi, keanggotaan Anda akan diaktivasi dan Anda dapat menikmati semua benefit keanggotaan APTIKNAS secara penuh.",
    benefits: [
      "Kartu anggota digital",
      "Akses ke platform member",
      "Welcome package eksklusif",
    ],
  },
  {
    id: "orientasi",
    label: "Orientasi Anggota",
    description:
      "Ikuti sesi orientasi untuk memahami hak dan kewajiban sebagai anggota serta memaksimalkan manfaat keanggotaan Anda.",
    benefits: [
      "Webinar onboarding gratis",
      "Material panduan lengkap",
      "Networking dengan anggota lain",
    ],
  },
];
</script>

<style scoped>
.list-disc {
  color: #511378;
}

.list-disc li {
  margin-bottom: 0.25rem;
}
</style>
