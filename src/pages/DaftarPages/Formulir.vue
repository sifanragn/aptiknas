<template>
  <div class="min-h-screen bg-gray-50 flex justify-center items-center p-6">
    <div class="bg-white w-full max-w-4xl shadow-md rounded-xl p-8">
      <!-- Judul -->
      <h1 class="text-2xl font-bold text-gray-800">Formulir Pendaftaran Anggota</h1>
      <p class="text-gray-600 mb-8">
        Isi data berikut dengan lengkap dan benar untuk proses pendaftaran yang cepat
      </p>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Nama Perusahaan -->
        <div>
          <label class="block text-gray-700 mb-1 font-medium">Nama Perusahaan</label>
          <input v-model="form.nama_perusahaan" type="text"
            class="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
        </div>

        <!-- Kategori Usaha -->
        <div>
          <label class="block text-gray-700 mb-1 font-medium">Kategori Usaha</label>
          <select v-model="form.kategori_usaha"
            class="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Pilih kategori</option>
            <option value="Perdagangan">Perdagangan</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Jasa">Jasa</option>
          </select>
        </div>

        <!-- Nama PIC -->
        <div>
          <label class="block text-gray-700 mb-1 font-medium">Nama PIC (Person in Charge)</label>
          <input v-model="form.nama_pic" type="text"
            class="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
        </div>

        <!-- Nomor WA + Email -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 mb-1 font-medium">Nomor WhatsApp PIC</label>
            <input v-model="form.whatsapp" type="text"
              class="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 font-medium">Email PIC</label>
            <input v-model="form.email" type="email"
              class="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
          </div>
        </div>

        <!-- Alamat -->
        <div>
          <label class="block text-gray-700 mb-1 font-medium">Alamat Lengkap</label>
          <input v-model="form.alamat" type="text"
            class="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
        </div>

        <!-- NIB & NPWP -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 mb-1 font-medium">No NIB SIUP</label>
            <input v-model="form.nib" type="text"
              class="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 font-medium">NPWP Perusahaan</label>
            <input v-model="form.npwp" type="text"
              class="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
          </div>
        </div>

        <!-- Upload KTP -->
        <div>
          <label class="block text-gray-700 mb-1 font-medium">Unggah KTP PIC</label>
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition cursor-pointer">
            <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden" />
            <div @click="$refs.fileInput.click()">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4v16m8-8H4" />
              </svg>
              <p class="mt-2 text-gray-600">Drop file di sini atau klik untuk mengunggah</p>
              <p class="text-sm text-gray-400">Format yang didukung: PDF, JPG, PNG (Maks. 5MB)</p>
            </div>
            <p v-if="form.fileName" class="mt-2 text-green-600 text-sm">✔ {{ form.fileName }}</p>
          </div>
        </div>

        <!-- Submit -->
        <div>
          <button type="submit"
            class="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg text-white font-medium transition">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  nama_perusahaan: "",
  kategori_usaha: "",
  nama_pic: "",
  whatsapp: "",
  email: "",
  alamat: "",
  nib: "",
  npwp: "",
  fileName: null,
});

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.fileName = file.name;
  }
};

const handleSubmit = () => {
  console.log("Data dikirim:", form.value);
  alert("Form berhasil dikirim!");
};
</script>
