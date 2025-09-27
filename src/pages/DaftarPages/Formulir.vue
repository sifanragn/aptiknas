<template>
  <div class="min-h-screen bg-gradient-to-br flex justify-center items-center p-6 mt-20">
    <div class="bg-white/80 backdrop-blur-sm w-full max-w-4xl shadow-xl rounded-2xl p-10 border border-gray-100">
      <!-- Judul -->
      <h1 class="text-3xl font-bold text-gray-800">Formulir Pendaftaran Anggota</h1>
      <p class="text-gray-600 mt-2 mb-10">
        Isi data berikut dengan lengkap dan benar untuk mempercepat proses pendaftaran Anda.
      </p>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Nama Perusahaan -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Perusahaan</label>
          <input v-model="form.nama_perusahaan" type="text"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm" />
        </div>

        <!-- Kategori Usaha -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Kategori Usaha</label>
          <select v-model="form.kategori_usaha"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm">
            <option value="">Pilih kategori</option>
            <option value="Perdagangan">Perdagangan</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Jasa">Jasa</option>
          </select>
        </div>

        <!-- Nama PIC -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Nama PIC (Person in Charge)</label>
          <input v-model="form.nama_pic" type="text"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm" />
        </div>

        <!-- Nomor WA + Email -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp PIC</label>
            <input v-model="form.whatsapp" type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email PIC</label>
            <input v-model="form.email" type="email"
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm" />
          </div>
        </div>

        <!-- Alamat -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap</label>
          <textarea v-model="form.alamat"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm min-h-[80px]"></textarea>
        </div>

        <!-- NIB & NPWP -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">No NIB SIUP</label>
            <input v-model="form.nib" type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">NPWP Perusahaan</label>
            <input v-model="form.npwp" type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm" />
          </div>
        </div>

        <!-- Upload KTP -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Unggah KTP PIC</label>
          <div
            class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition relative group cursor-pointer">
            <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden" />
            <div @click="$refs.fileInput.click()" class="space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto text-gray-400 group-hover:text-green-500 transition" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <p class="mt-1 text-gray-600">Drop file di sini atau klik untuk mengunggah</p>
              <p class="text-sm text-gray-400">PDF, JPG, PNG (Maks. 5MB)</p>
            </div>
            <p v-if="form.fileName" class="mt-3 text-green-600 text-sm font-medium">✔ {{ form.fileName }}</p>
          </div>
        </div>

        <!-- Submit -->
        <div class="pt-4">
          <button type="submit"
            class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition">
            Kirim Pendaftaran
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
