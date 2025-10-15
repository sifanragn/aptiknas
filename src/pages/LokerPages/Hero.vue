<template>
  <div class="hero-section mt-17">
    <!-- Hero -->
    <div class="text-center relative">
      <h2 class="text-sm md:text-xl text-gray-600 -mt-24 md:-mt-32">
        Jadilah bagian dari komunitas dinamis yang menjunjung inovasi,
        kolaborasi,<br />
        dan pengembangan profesi di bidang TIK.
      </h2>
      <div class="relative mt-10 w-fit mx-auto">
        <h1
          class="text-5xl md:text-8xl lg:text-9xl tracking-tight text-gray-900 relative z-10"
        >
          PELUANG KARIR
        </h1>

        <div
          class="absolute bottom-0 md:-right-50 xl:-right-20 2xl:-right-20 h-15 xl:h-28 md:h-23 w-full xl:w-[26.5rem] bg-gradient-to-r from-green-500/20 to-transparent z-0"
        ></div>
        <div
          class="absolute bottom-0 md:-right-50 xl:-right-20 2xl:-right-20 h-13 xl:h-26 md:h-21 w-full xl:w-[26.5rem] border-l-2 border-green-600 z-0"
        ></div>
      </div>

      <!-- Button -->
      <div class="mt-16 md:mt-20 flex justify-center gap-4 mb-10">
        <button
          class="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm hover:bg-gray-800 transition"
        >
          Lihat Lowongan
        </button>
        <button
          class="inline-flex items-center gap-2 text-sm rounded-full px-5 py-2.5 bg-green-100 text-green-800 hover:bg-green-200"
        >
          Tentang Kami
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.hero-section {
  background-image: url("@/assets/bg-loker.svg");
  padding: 8rem 1rem;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
