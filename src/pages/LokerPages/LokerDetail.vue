<template>
  <div>
    <div v-if="job" class="min-h-screen p-6 md:p-12">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <!-- Informasi Lowongan -->
          <div class="bg-white rounded-xl p-6 space-y-6 text-gray-900">
            <h2 class="text-xl font-semibold" v-if="job.position_title">
              {{ job.position_title }} at {{ job.location || "N/A" }}
            </h2>

            <div
              class="bg-green-100 border border-green-400 rounded-lg p-4 space-y-2 text-sm"
            >
              <div class="flex justify-between">
                <span class="text-green-700">Pengalaman</span>
                <span>: {{ job.pengalaman || "Tidak disebutkan" }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-green-700">Jam Kerja</span>
                <span>: {{ job.jam_kerja || "Tidak disebutkan" }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-green-700">Hari Kerja</span>
                <span>: {{ job.hari_kerja || "Tidak disebutkan" }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-green-700">Lokasi</span>
                <span>: {{ job.location || "Tidak disebutkan" }}</span>
              </div>
            </div>

            <div>
              <h3 class="font-medium">Klasifikasi</h3>
              <p class="text-sm mt-1 border border-gray-300 p-3 rounded-lg">
                {{
                  Array.isArray(job.klasifikasi)
                    ? job.klasifikasi.join(", ")
                    : job.klasifikasi
                }}
              </p>
            </div>

            <div>
              <h3 class="font-medium">Ringkasan</h3>
              <div
                class="text-sm mt-1 border border-gray-300 p-3 rounded-lg prose max-w-none"
                v-html="job.ringkasan"
              ></div>
            </div>

            <div>
              <h3 class="font-medium">Deskripsi Pekerjaan</h3>
              <ul
                class="text-sm mt-1 border border-gray-300 p-3 rounded-lg list-disc list-inside space-y-1"
              >
                <li
                  v-for="(desc, index) in (job.description || '').split('\\n')"
                  :key="index"
                  class="flex items-start gap-2"
                >
                  <span class="list-item-marker">•</span>
                  <span v-html="desc" class="inline-block align-top"></span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Form Pendaftaran -->
          <div class="bg-white rounded-xl p-6 shadow-xl">
            <h2 class="text-lg font-semibold mb-2">Mulai Langkah Kariermu</h2>
            <p class="text-sm text-gray-600 mb-6" v-if="job.position_title">
              Lamar posisi <strong>{{ job.position_title }}</strong> dan jadilah
              bagian dari jaringan profesional TIK se-Indonesia.
            </p>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-4">
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"
              ></div>
              <p class="text-sm text-gray-600 mt-2">Mengirimkan lamaran...</p>
            </div>

            <!-- Success Message -->
            <div
              v-if="successMessage"
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
            >
              {{ successMessage }}
            </div>

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
              {{ errorMessage }}
            </div>

            <form
              @submit.prevent="submitApplication"
              class="space-y-4"
              v-if="!successMessage"
            >
              <div>
                <label class="text-sm">Nama</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full border border-gray-300 rounded-md p-2 mt-1"
                  placeholder="Nama lengkap"
                  required
                  :disabled="loading"
                />
              </div>

              <div>
                <label class="text-sm">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="w-full border border-gray-300 rounded-md p-2 mt-1"
                  placeholder="you@example.com"
                  required
                  :disabled="loading"
                />
              </div>

              <div>
                <label class="text-sm">No Telepon</label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="w-full border border-gray-300 rounded-md p-2 mt-1"
                  placeholder="08xxxxxxxxxx"
                  required
                  :disabled="loading"
                />
              </div>

              <div>
                <label class="text-sm">Cover Letter</label>
                <textarea
                  v-model="formData.cover_letter"
                  rows="4"
                  class="w-full border border-gray-300 rounded-md p-2 mt-1"
                  placeholder="Tuliskan sedikit tentang dirimu..."
                  :disabled="loading"
                ></textarea>
              </div>

              <!-- Upload CV -->
              <div
                @click="triggerCvUpload"
                @dragover.prevent
                @drop.prevent="handleCvDrop"
                class="border-2 border-dashed border-green-300 rounded-lg p-6 text-center bg-green-50 cursor-pointer"
                :class="{ 'opacity-50': loading }"
              >
                <div class="text-[green] text-2xl mb-2">
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <p class="text-sm text-gray-600">
                  <span v-if="formData.cv">{{ formData.cv.name }}</span>
                  <span v-else
                    >Drop Your CV files or
                    <a href="#" class="text-[green] font-semibold"
                      >Browse</a
                    ></span
                  >
                </p>
                <p class="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX
                </p>
                <input
                  type="file"
                  ref="cvInput"
                  @change="handleCvSelect"
                  class="hidden"
                  accept=".pdf,.doc,.docx"
                  :disabled="loading"
                />
              </div>

              <button
                type="submit"
                class="w-full bg-[green]/60 hover:bg-green-800 text-white py-2 rounded-md mt-4"
                :disabled="loading"
                :class="{ 'opacity-50 cursor-not-allowed': loading }"
              >
                {{ loading ? "Mengirim..." : "Submit" }}
              </button>
            </form>

            <!-- Tombol untuk apply lagi setelah success -->
            <div v-if="successMessage" class="text-center">
              <button
                @click="resetForm"
                class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Apply Lagi
              </button>
            </div>
          </div>
        </div>
        <!-- Tombol Kembali -->
        <div class="mt-8">
          <button
            @click="$emit('back-to-list')"
            class="mb-6 inline-flex items-center gap-2 text-md text-gray-700 hover:text-black"
          >
            <i class="fa-solid fa-arrow-left"></i>
            Kembali ke Daftar Lowongan
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-screen">
      <p class="text-gray-500">Pilih lowongan untuk melihat detailnya.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useCareerStore } from "@/stores/career";

// DEFINE PROPS dengan benar
const props = defineProps({
  job: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["back-to-list", "select-job"]);
const careerStore = useCareerStore();

// Form state
const formData = ref({
  name: "",
  email: "",
  phone: "",
  cover_letter: "",
  cv: null,
  career_id: null,
});

// UI state
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const cvInput = ref(null);

// Watch perubahan pada job prop
watch(
  () => props.job,
  (newJob) => {
    if (newJob) {
      formData.value.career_id = newJob.id;
    }
  },
  { immediate: true }
);

// Atau gunakan onMounted untuk set initial value
onMounted(() => {
  if (props.job) {
    formData.value.career_id = props.job.id;
  }
});

const triggerCvUpload = () => {
  if (!loading.value) {
    cvInput.value?.click();
  }
};

const handleCvSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    // Validasi file
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      errorMessage.value =
        "Format file tidak didukung. Harus PDF, DOC, atau DOCX";
      return;
    }

    if (file.size > maxSize) {
      errorMessage.value = "Ukuran file terlalu besar. Maksimal 5MB";
      return;
    }

    formData.value.cv = file;
    errorMessage.value = "";
  }
};

const handleCvDrop = (event) => {
  if (!loading.value) {
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      handleCvSelect({ target: { files: [file] } });
    }
  }
};

const submitApplication = async () => {
  // Reset messages
  successMessage.value = "";
  errorMessage.value = "";

  // Validasi form
  if (!formData.value.name || !formData.value.email || !formData.value.phone) {
    errorMessage.value = "Harap isi semua field yang wajib diisi";
    return;
  }

  if (!formData.value.cv) {
    errorMessage.value = "Harap upload CV terlebih dahulu";
    return;
  }

  // Pastikan career_id ada
  if (!formData.value.career_id) {
    errorMessage.value = "Terjadi kesalahan: ID lowongan tidak ditemukan";
    return;
  }

  loading.value = true;

  try {
    // Buat FormData object untuk mengirim file
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.value.name);
    formDataToSend.append("email", formData.value.email);
    formDataToSend.append("phone", formData.value.phone);
    formDataToSend.append("cover_letter", formData.value.cover_letter);
    formDataToSend.append("cv", formData.value.cv);
    formDataToSend.append("career_id", formData.value.career_id);

    // Kirim ke API
    const response = await careerStore.createApplication(formDataToSend);

    if (response.success) {
      successMessage.value = "Lamaran berhasil dikirim!";
      resetForm();
    } else {
      errorMessage.value = response.message || "Gagal mengirim lamaran";
    }
  } catch (error) {
    console.error("Error submitting application:", error);
    errorMessage.value =
      error.response?.data?.message ||
      "Terjadi kesalahan saat mengirim lamaran";
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  formData.value = {
    name: "",
    email: "",
    phone: "",
    cover_letter: "",
    cv: null,
    career_id: props.job?.id || null, // Pastikan menggunakan props.job
  };
  successMessage.value = "";
  errorMessage.value = "";

  // Reset file input
  if (cvInput.value) {
    cvInput.value.value = "";
  }
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

/* Custom styles untuk disabled state */
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
