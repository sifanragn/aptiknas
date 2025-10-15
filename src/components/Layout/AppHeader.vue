<template>
  <div
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="scrolled ? 'py-4 px-3  ' : 'py-4 px-8 mt-5'"
  >
    <header
      class="flex items-center justify-between transition-all duration-300"
      :class="scrolled ? 'relative' : ''"
    >
      <!-- Background and Shimmer Effect (hanya saat scrolled) -->
      <div
        v-if="scrolled"
        class="absolute inset-0 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg shadow-black/5 ring-1 ring-white/10 overflow-hidden"
      >
        <!-- Shimmer -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"
        ></div>
      </div>

      <!-- Header Content -->
      <div
        class="relative flex items-center justify-between w-full"
        :class="scrolled ? ' py-3' : ''"
      >
        <!-- Bagian 1: Logo -->
        <div
          class="w-fit flex flex-col items-start z-10"
          :class="scrolled ? '' : '-ml-5.5 -mt-1'"
        >
          <div class="w-full flex">
            <div
              class="w-full pb- px-4 ease-in-out"
              :class="[
                scrolled ? 'bg-transparent' : 'bg-[#f0f0f0]  rounded-br-4xl',
              ]"
            >
              <img
                src="../../assets/logo.png"
                alt="Logo APTIKNAS"
                class="lg:w-40 object-contain transition-all duration-300"
                :class="scrolled ? 'h-10' : 'h-24'"
              />
            </div>
            <div
              class="bg-transparent curve ease-in-out"
              :class="[
                scrolled
                  ? 'w-0 h-0 opacity-0 hidden'
                  : 'w-[10px] h-[10px] opacity-100',
              ]"
            >
              <div class="concave"></div>
            </div>
          </div>
          <div
            class="bg-transparent curve-2 ease-in-out"
            :class="[
              scrolled
                ? 'w-0 h-0 opacity-0 hidden'
                : 'w-[10px] h-[10px] opacity-100',
            ]"
          >
            <div class="concave-2"></div>
          </div>
        </div>

        <!-- Bagian 2: Navigation Items (Cent er) -->
        <nav
          class="hidden lg:flex items-center justify-center gap-6 lg:gap-5 rounded-full flex-1"
          :class="
            scrolled
              ? 'text-md'
              : 'text-sm bg-white mx-0 -mt-5 px-4 py-2 shadow-md shadow-green-200/20'
          "
        >
          <router-link
            to="/"
            class="px-4 py-2 rounded-full transition-all duration-200 hover:border-2 border-2 border-transparent hover:border-green-600 hover:text-green-600 font-medium"
            :class="scrolled ? 'text-gray-700' : 'text-gray-800'"
          >
            Home
          </router-link>
          <router-link
            to="/profile"
            class="px-4 py-2 rounded-full transition-all duration-200 hover:border-2 border-2 border-transparent hover:border-green-600 hover:text-green-600 font-medium"
            :class="scrolled ? 'text-gray-700' : 'text-gray-800'"
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
              class="flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 border-2 border-transparent hover:border-green-600 hover:text-green-600 font-medium"
              :class="{
                'border-green-600 text-green-600': isInformasiActive,
                'border-transparent': !isInformasiActive,
                'text-gray-700': scrolled && !isInformasiActive,
                'text-gray-800': !scrolled && !isInformasiActive,
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
              class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
              :class="{
                hidden: activeDropdown !== 'informasi',
                block: activeDropdown === 'informasi',
              }"
            >
              <router-link
                to="/news"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm"
                @click="closeDropdown"
              >
                Berita
              </router-link>
              <router-link
                to="/agenda"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm"
                @click="closeDropdown"
              >
                Agenda
              </router-link>
              <router-link
                to="/loker"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm"
                @click="closeDropdown"
              >
                Loker
              </router-link>
            </div>
          </div>

          <router-link
            to="/kegiatan"
            class="px-4 py-2 rounded-full transition-all duration-200 hover:border-2 border-2 border-transparent hover:border-green-600 hover:text-green-600 font-medium"
            :class="scrolled ? 'text-gray-700' : 'text-gray-800'"
          >
            Kegiatan
          </router-link>

          <!-- Dropdown Daftar DPD -->
          <div
            class="relative group"
            @mouseenter="openDropdown('daftarDpd')"
            @mouseleave="closeDropdown"
          >
            <button
              class="flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 border-2 border-transparent hover:border-green-600 hover:text-green-600 font-medium"
              :class="{
                'border-green-600 text-green-600': isDaftarDpdActive,
                'border-transparent': !isDaftarDpdActive,
                'text-gray-700': scrolled && !isDaftarDpdActive,
                'text-gray-800': !scrolled && !isDaftarDpdActive,
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
              class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto"
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
                  <span class="truncate"> {{ dpd.name }}</span>
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

          <!-- Dropdown Kepengurusan -->
          <div
            class="relative group"
            @mouseenter="openDropdown('kepengurusan')"
            @mouseleave="closeDropdown"
          >
            <button
              class="flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 border-2 border-transparent hover:border-green-600 hover:text-green-600 font-medium"
              :class="{
                'border-green-600 text-green-600': isKepengurusanActive,
                'border-transparent': !isKepengurusanActive,
                'text-gray-700': scrolled && !isKepengurusanActive,
                'text-gray-800': !scrolled && !isKepengurusanActive,
              }"
            >
              Kepengurusan
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === 'kepengurusan' }"
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
              class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
              :class="{
                hidden: activeDropdown !== 'kepengurusan',
                block: activeDropdown === 'kepengurusan',
              }"
            >
              <router-link
                to="/dpa"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm"
                @click="closeDropdown"
              >
                DPA
              </router-link>
              <router-link
                to="/dpp"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm"
                @click="closeDropdown"
              >
                DPP
              </router-link>
              <router-link
                to="/dpd"
                class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm"
                @click="closeDropdown"
              >
                DPD
              </router-link>
            </div>
          </div>
        </nav>

        <!-- Bagian 3: Button Daftar Sekarang -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <!-- Animated Hamburger/Close Button -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 focus:outline-none z-50 transition-colors duration-200"
            :class="scrolled ? 'text-gray-700' : 'text-gray-800'"
            aria-label="Toggle menu"
          >
            <div class="w-6 h-6 relative">
              <span
                class="absolute top-1/2 left-0 w-full h-0.5 transition-all duration-300"
                :class="{
                  'rotate-45': isMobileMenuOpen,
                  '-translate-y-2': !isMobileMenuOpen,
                  'bg-gray-800': !scrolled,
                  'bg-gray-700': scrolled,
                }"
              ></span>
              <span
                class="absolute top-1/2 left-0 w-full h-0.5 transition-all duration-300"
                :class="{
                  '-rotate-45': isMobileMenuOpen,
                  'translate-y-2': !isMobileMenuOpen,
                  'bg-gray-800': !scrolled,
                  'bg-gray-700': scrolled,
                }"
              ></span>
            </div>
          </button>

          <!-- Button Daftar Sekarang -->
          <div
            class="w-fit mb-auto flex flex-col items-end z-10"
            :class="scrolled ? '' : '-mr-5.5 -mt-1'"
          >
            <div class="flex">
              <div
                class="bg-transparent curve-3 ease-in-out"
                :class="[
                  scrolled
                    ? 'w-0 h-0 opacity-0 hidden'
                    : 'w-[10px] h-[10px] opacity-100 ',
                ]"
              >
                <div class="concave-3"></div>
              </div>
              <div
                class="w-full ease-in-out px-4 flex items-center"
                :class="[
                  scrolled
                    ? 'bg-transparent'
                    : 'h-24 bg-[#f0f0f0] rounded-bl-4xl',
                ]"
              >
                <button
                  class="hidden lg:block relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 text-black px-6 py-2.5 rounded-full font-semibold tracking-wide shadow-md border border-green-400 transition-all duration-500 ease-out hover:scale-105 hover:shadow-green-400/60 group"
                >
                  <!-- Shine effect -->
                  <span
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"
                  ></span>
                  <span class="relative z-10">Daftar Sekarang</span>
                </button>
              </div>
            </div>
            <div
              class="bg-transparent curve-4 ease-in-out"
              :class="[
                scrolled
                  ? 'w-0 h-0 opacity-0 hidden'
                  : 'w-[10px] h-[10px] opacity-100 -mr-[0.1px] ',
              ]"
            >
              <div class="concave-4"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Sidebar -->
      <transition
        enter-active-class="transition-all ease-in-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all ease-in-out duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 lg:hidden">
          <!-- Overlay -->
          <div
            @click="closeMobileMenu"
            class="absolute inset-0 bg-black/50"
          ></div>

          <!-- Menu Panel -->
          <div
            class="relative h-full w-80 bg-white ml-auto p-6 shadow-lg transform transition-transform duration-300 ease-in-out"
            :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
          >
            <div class="flex justify-between items-center mb-8">
              <img
                src="../../assets/logo.png"
                alt="Logo"
                class="h-10 rounded-full"
              />
            </div>
            <nav
              class="flex flex-col space-y-4 text-lg font-medium text-gray-800"
            >
              <router-link to="/" @click="closeMobileMenu" class="py-2"
                >Home</router-link
              >
              <router-link to="/profile" @click="closeMobileMenu" class="py-2"
                >Profile</router-link
              >

              <!-- Accordion for Informasi -->
              <div>
                <button
                  @click="toggleMobileDropdown('informasi')"
                  class="w-full flex justify-between items-center py-2"
                >
                  <span>Informasi</span>
                  <svg
                    class="w-5 h-5 transition-transform"
                    :class="{
                      'rotate-180': activeMobileDropdown === 'informasi',
                    }"
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
                  v-if="activeMobileDropdown === 'informasi'"
                  class="pl-4 pt-2 space-y-2"
                >
                  <router-link
                    to="/news"
                    @click="closeMobileMenu"
                    class="block py-2 text-gray-600"
                    >Berita</router-link
                  >
                  <router-link
                    to="/agenda"
                    @click="closeMobileMenu"
                    class="block py-2 text-gray-600"
                    >Agenda</router-link
                  >
                  <router-link
                    to="/loker"
                    @click="closeMobileMenu"
                    class="block py-2 text-gray-600"
                    >Loker</router-link
                  >
                </div>
              </div>

              <!-- Accordion for Daftar DPD -->
              <div>
                <button
                  @click="toggleMobileDropdown('daftarDpd')"
                  class="w-full flex justify-between items-center py-2"
                >
                  <span>Daftar DPD</span>
                  <svg
                    class="w-5 h-5 transition-transform"
                    :class="{
                      'rotate-180': activeMobileDropdown === 'daftarDpd',
                    }"
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
                  v-if="activeMobileDropdown === 'daftarDpd'"
                  class="pl-4 pt-2 space-y-2 max-h-48 overflow-y-auto"
                >
                  <router-link
                    v-for="dpd in dpdCategories"
                    :key="dpd.id"
                    :to="`/dpd/${generateSlug(dpd.name)}`"
                    class="block py-2 text-gray-600"
                    @click="closeMobileMenu"
                  >
                    DPD {{ dpd.name }}
                  </router-link>
                  <router-link
                    to="/dpd/"
                    @click="closeMobileMenu"
                    class="block py-2 text-gray-600 font-semibold"
                    >Lihat Semua DPD</router-link
                  >
                </div>
              </div>

              <router-link to="/kegiatan" @click="closeMobileMenu" class="py-2"
                >Kegiatan</router-link
              >

              <!-- Accordion for Kepengurusan -->
              <div>
                <button
                  @click="toggleMobileDropdown('kepengurusan')"
                  class="w-full flex justify-between items-center py-2"
                >
                  <span>Kepengurusan</span>
                  <svg
                    class="w-5 h-5 transition-transform"
                    :class="{
                      'rotate-180': activeMobileDropdown === 'kepengurusan',
                    }"
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
                  v-if="activeMobileDropdown === 'kepengurusan'"
                  class="pl-4 pt-2 space-y-2"
                >
                  <router-link
                    to="/dpa"
                    @click="closeMobileMenu"
                    class="block py-2 text-gray-600"
                    >DPA</router-link
                  >
                  <router-link
                    to="/dpp"
                    @click="closeMobileMenu"
                    class="block py-2 text-gray-600"
                    >DPP</router-link
                  >
                  <router-link
                    to="/dpd"
                    @click="closeMobileMenu"
                    class="block py-2 text-gray-600"
                    >DPD</router-link
                  >
                </div>
              </div>

              <button
                class="mt-8 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold tracking-wide shadow-md"
                @click="closeMobileMenu"
              >
                Daftar Sekarang
              </button>
            </nav>
          </div>
        </div>
      </transition>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute } from "vue-router";
import { useCategoryDaftarStore } from "@/stores/category-dpd";

const scrolled = ref(false);
const activeDropdown = ref(null);
let dropdownTimeout = null;
const route = useRoute();
const isInformasiActive = computed(() => {
  return (
    route.path.startsWith("/news") ||
    route.path.startsWith("/agenda") ||
    route.path.startsWith("/loker")
  );
});
const isDaftarDpdActive = computed(() => {
  return route.path.startsWith("/dpd");
});
const isKepengurusanActive = computed(() => {
  return ["/dpa", "/dpp"].some((path) => route.path.startsWith(path));
});

// Gunakan store untuk kategori DPD
const categoryDpdStore = useCategoryDaftarStore();
const dpdCategories = computed(() => {
  if (!categoryDpdStore.categories) return [];
  return [...categoryDpdStore.categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
});

const isMobileMenuOpen = ref(false);
const activeMobileDropdown = ref(null);

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const toggleMobileDropdown = (dropdown) => {
  activeMobileDropdown.value =
    activeMobileDropdown.value === dropdown ? null : dropdown;
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
  // Ambil data kategori DPD dari store
  categoryDpdStore.fetchCategories();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
  }
});
</script>

<style scoped>
.curve {
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 20px;
}
.concave {
  border-radius: 50%;
  box-shadow: -20px -20px #f0f0f0;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

:deep(.router-link-active) {
  border-color: #16a34a;
  color: #16a34a;
}

.curve-2 {
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 20px;
}

.concave-2 {
  border-radius: 50%;
  box-shadow: -20px -20px #f0f0f0;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.curve-3 {
  height: 20px;
  overflow: hidden;
  position: relative;
  transform: rotateY(180deg);
  width: 20px;
}

.concave-3 {
  border-radius: 50%;
  box-shadow: -20px -20px #f0f0f0;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.curve-4 {
  height: 20px;
  overflow: hidden;
  position: relative;
  transform: rotateY(180deg);
  width: 20px;
}

.concave-4 {
  border-radius: 50%;
  box-shadow: -20px -20px #f0f0f0;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

:deep(.router-link-active) {
  border-color: #16a34a;
  color: #16a34a;
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

/* Pastikan layout 3 bagian terlihat jelas */
@media (min-width: 1024px) {
  .flex-1 {
    flex: 1 1 0%;
  }

  .mx-8 {
    margin-left: 2rem;
    margin-right: 2rem;
  }
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
