<template>
  <div
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="scrolled ? 'py-4 px-6' : 'py-2 px-0'"
  >
    <header
      class="flex items-center justify-between transition-all duration-300"
      :class="
        scrolled
          ? 'px-6 py-3 rounded-full backdrop-blur-md shadow-lg border border-gray-200'
          : 'mx-2 my-7'
      "
    >
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img
          src="../../assets/logo.png"
          alt="Logo"
          class="h-10 sm:h-12 rounded-full"
        />
      </div>

      <!-- Nav -->
      <nav
        class="hidden md:flex items-center gap-6 lg:gap-10"
        :class="
          scrolled
            ? 'text-md'
            : 'text-sm p-2 bg-white rounded-full -shadow-md -space-x-8'
        "
      >
        <router-link
          to="/"
          class="px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-gray-100 hover:text-green-600"
        >
          Home
        </router-link>
        <router-link
          to="/profile"
          class="px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-gray-100 hover:text-green-600"
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
            class="flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-gray-100 hover:text-green-600"
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
            <router-link
              to="/kegiatan"
              class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
              @click="closeDropdown"
            >
              Kegiatan
            </router-link>
          </div>
        </div>
        <div
          class="relative group"
          @mouseenter="openDropdown('daftarDpd')"
          @mouseleave="closeDropdown"
        >
           <button
            class="flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-gray-100 hover:text-green-600"
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
            class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
            :class="{
              hidden: activeDropdown !== 'daftarDpd',
              block: activeDropdown === 'daftarDpd',
            }"
          >
            <router-link
              to="/dpd/dki-jakarta"
              class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm"
              @click="closeDropdown"
            >
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-2 text-green-600"
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
                DPD DKI Jakarta
              </div>
            </router-link>

            <router-link
              to="/dpd/banten"
              class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm"
              @click="closeDropdown"
            >
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-2 text-green-600"
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
                DPD Banten
              </div>
            </router-link>

            <!-- Divider -->
            <div class="border-t border-gray-200 my-1"></div>

            <router-link
              to="/dpd/semua"
              class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors text-sm bg-gray-50"
              @click="closeDropdown"
            >
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-2 text-green-600"
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

        <!-- Dropdown DPD -->
        <div
          class="relative group"
          @mouseenter="openDropdown('dpd')"
          @mouseleave="closeDropdown"
        >
          <button
            class="flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-gray-100 hover:text-green-600"
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
            <router-link
              to="/dpd-jakarta"
              class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
              @click="closeDropdown"
            >
              DPD Jakarta
            </router-link>
          </div>
        </div>
      </nav>

      <!-- Button -->
      <button
        class="hidden md:block bg-green-500 text-white px-5 py-2 rounded-full font-medium hover:bg-green-600 transition-all duration-200 border-1 border-gray-100"
      >
        Daftar Sekarang
      </button>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrolled: false,
      activeDropdown: null,
      dropdownTimeout: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 20;
    },
    openDropdown(dropdownName) {
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout);
      }
      this.activeDropdown = dropdownName;
    },
    closeDropdown() {
      this.dropdownTimeout = setTimeout(() => {
        this.activeDropdown = null;
      }, 200);
    },
    forceCloseDropdown() {
      this.activeDropdown = null;
    },
  },
};
</script>

<style scoped module>
.router-link-active {
  @apply bg-green-100 text-green-700;
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
