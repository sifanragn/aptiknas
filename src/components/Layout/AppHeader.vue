<template>
  <div
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="scrolled ? 'py-4 px-6' : 'py-2 px-3'"
  >
    <header
      class="flex items-center justify-between transition-all duration-300"
      :class="scrolled ? 'relative' : 'mx-2 my-7'"
    >
      <!-- Background and Shimmer Effect -->
      <div
        v-if="scrolled"
        class="absolute inset-0 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg shadow-black/5 ring-1 ring-white/10 overflow-hidden"
      >
        <!-- Shimmer -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"
        ></div>
      </div>

      <!-- Header Content (relative to allow it to sit on top) -->
      <div
        class="relative flex items-center justify-between w-full"
        :class="scrolled ? 'px-6 py-3' : ''"
      >
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <img
            src="../../assets/logo.png"
            alt="Logo"
            class="h-10 sm:h-13 rounded-full"
          />
        </div>

        <!-- Nav -->
        <nav
          class="hidden md:flex items-center gap-6 lg:gap-5"
          :class="
            scrolled
              ? 'text-md'
              : 'text-sm p-2 bg-white rounded-full -shadow-md -space-x-8'
          "
        >
          <router-link
            to="/"
            class="px-3 py-1.5 rounded-full transition-all duration-200 hover:border-2 border-2 border-transparent hover:border-green-600 hover:text-green-600"
          >
            Home
          </router-link>
          <router-link
            to="/profile"
            class="px-3 py-1.5 rounded-full transition-all duration-200 hover:border-2 border-2 border-transparent hover:border-green-600 hover:text-green-600"
          >
            Profile
          </router-link>

          <!-- Dropdown Informasi -->
          <div
            class="relative group"
            @mouseenter="openDropdown('informasi')"
            @mouseleave="closeDropdown"
          >
            <button
              class="flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 border-2 border-transparent hover:border-green-600 hover:text-green-600"
              :class="{
                'border-green-600 text-green-600': isInformasiActive,
                'border-transparent': !isInformasiActive,
              }"
            >
              Informasi
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === 'informasi' }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
              :class="{
                hidden: activeDropdown !== 'informasi',
                block: activeDropdown === 'informasi',
              }"
            >
              <router-link
                to="/news"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
                @click="closeDropdown"
              >
                Berita
              </router-link>
              <router-link
                to="/agenda"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
                @click="closeDropdown"
              >
                Agenda
              </router-link>
            </div>
          </div>
          <!-- Dropdown Daftar DPD -->
          <div
            class="relative group"
            @mouseenter="openDropdown('daftarDpd')"
            @mouseleave="closeDropdown"
          >
            <button
              class="flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 border-2 border-transparent hover:border-green-600 hover:text-green-600"
              :class="{
                'border-green-600 text-green-600': isDaftarDpdActive,
                'border-transparent': !isDaftarDpdActive,
              }"
            >
              Daftar DPD
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === 'daftarDpd' }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              class="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto"
              :class="{
                hidden: activeDropdown !== 'daftarDpd',
                block: activeDropdown === 'daftarDpd',
              }"
            >
              <!-- Header -->
              <div class="bg-green-600 text-white px-4 py-3">
                <h3 class="text-sm font-semibold">Dewan Pengurus Daerah</h3>
                <p class="text-xs opacity-90">Pilih wilayah DPD</p>
              </div>

              <!-- DPD List -->
              <router-link
                v-for="dpd in dpdCategories"
                :key="dpd.id"
                :to="`/dpd/${generateSlug(dpd.name)}`"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm border-b border-gray-100 last:border-b-0"
                @click="closeDropdown"
              >
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-3 text-green-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span class="truncate">DPD {{ dpd.name }}</span>
                </div>
              </router-link>

              <!-- Divider -->
              <div class="border-t border-gray-200 my-1"></div>

              <!-- View All -->
              <router-link
                to="/dpd/"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm bg-gray-50"
                @click="closeDropdown"
              >
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-3 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Lihat Semua DPD
                </div>
              </router-link>
            </div>
          </div>
          <router-link
            to="/kegiatan"
            class="px-3 py-1.5 rounded-full transition-all duration-200 hover:border-2 border-2 border-transparent hover:border-green-600 hover:text-green-600"
          >
            Kegiatan
          </router-link>

          <!-- Dropdown DPD -->
          <div
            class="relative group"
            @mouseenter="openDropdown('dpd')"
            @mouseleave="closeDropdown"
          >
            <button
              class="flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 border-2 border-transparent hover:border-green-600 hover:text-green-600"
              :class="{
                'border-green-600 text-green-600': isKepengurusanActive,
                'border-transparent': !isKepengurusanActive,
              }"
            >
              Kepengurusan
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === 'dpd' }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
              :class="{
                hidden: activeDropdown !== 'dpd',
                block: activeDropdown === 'dpd',
              }"
            >
              <router-link
                to="/dpa"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
                @click="closeDropdown"
              >
                DPA
              </router-link>
              <router-link
                to="/dpp"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
                @click="closeDropdown"
              >
                DPP
              </router-link>
              <router-link
                to="/dpd"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
                @click="closeDropdown"
              >
                DPD
              </router-link>
            </div>
          </div>
        </nav>

        <!-- Button -->
        <button
          class="hidden md:block relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2.5 rounded-full font-semibold tracking-wide shadow-md border border-green-400 transition-all duration-500 ease-out hover:scale-105 hover:shadow-green-400/60 group"
        >
          <!-- Shine effect -->
          <span
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"
          ></span>
          <span class="relative z-10">Daftar Sekarang</span>
        </button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute } from "vue-router";

const scrolled = ref(false);
const activeDropdown = ref(null);
let dropdownTimeout = null;

const route = useRoute();

const isInformasiActive = computed(() => {
  return route.path.startsWith("/news") || route.path.startsWith("/agenda");
});

const isDaftarDpdActive = computed(() => {
  // Aktif jika path adalah /dpd atau sub-path dari /dpd
  return route.path.startsWith("/dpd");
});

const isKepengurusanActive = computed(() => {
  // Aktif jika path adalah /dpa atau /dpp. /dpd ditangani oleh dropdown "Daftar DPD".
  return ["/dpa", "/dpp"].some((path) => route.path.startsWith(path));
});

// Data dummy untuk DPD
const dpdCategories = ref([
  { id: 1, name: "DKI JAKARTA" },
  { id: 2, name: "JAWA BARAT" },
  { id: 3, name: "JAWA TENGAH" },
  { id: 4, name: "JAWA TIMUR" },
  { id: 5, name: "BANTEN" },
  { id: 6, name: "BALI" },
  { id: 7, name: "SUMATERA UTARA" },
  { id: 8, name: "SUMATERA SELATAN" },
  { id: 9, name: "SUMATERA BARAT" },
  { id: 10, name: "RIAU" },
  { id: 11, name: "KALIMANTAN BARAT" },
  { id: 12, name: "KALIMANTAN TIMUR" },
  { id: 13, name: "KALIMANTAN SELATAN" },
  { id: 14, name: "SULAWESI SELATAN" },
  { id: 15, name: "SULAWESI UTARA" },
  { id: 16, name: "NUSA TENGGARA BARAT" },
  { id: 17, name: "NUSA TENGGARA TIMUR" },
  { id: 18, name: "PAPUA" },
  { id: 19, name: "PAPUA BARAT" },
  { id: 20, name: "LAMPUNG" },
  { id: 21, name: "ACEH" },
  { id: 22, name: "JAMBI" },
  { id: 23, name: "BENGKULU" },
  { id: 24, name: "GORONTALO" },
]);

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

const openDropdown = (dropdownName) => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
  }
  activeDropdown.value = dropdownName;
};

const closeDropdown = () => {
  dropdownTimeout = setTimeout(() => {
    activeDropdown.value = null;
  }, 200);
};

const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
  }
});
</script>

<style scoped>
:deep(.router-link-active) {
  border-color: #16a34a; /* Corresponds to border-green-600 */
  color: #16a34a; /* Corresponds to text-green-600 */
}

.group:hover .group-hover\:block {
  display: block;
}

.transition-all {
  transition: all 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
<style>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
