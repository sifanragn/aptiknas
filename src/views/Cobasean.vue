<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { motion } from "motion-v";
import Logo from "@/assets/logo.png";
import ShimmerButton from "@/components/UI/shimmer-button/ShimmerButton.vue";

defineProps({
  position: String,
});

const emit = defineEmits(["mobileMenuToggle"]);

const isScrolled = ref(false);
const route = useRoute();
const activeTransform = ref<string>("");
const isMobileMenuOpen = ref(false);
const isSistemInformasiOpen = ref(false);
const isSistemInformasiHover = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0.1;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  emit("mobileMenuToggle", isMobileMenuOpen.value);
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  emit("mobileMenuToggle", false);
};

const toggleSistemInformasi = () => {
  isSistemInformasiOpen.value = !isSistemInformasiOpen.value;
};

watch(
  route,
  (_) => {
    activeTransform.value = "";
    if (isMobileMenuOpen.value) {
      isMobileMenuOpen.value = false;
      emit("mobileMenuToggle", false);
    }

    setTimeout(() => {
      activeTransform.value = "-translate-y-2";
    }, 50);
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const desktopMenuItems = [
  { path: "/", label: "Home" },
  { path: "/profile", label: "Profile" },
  {
    path: "/news",
    label: "Informasi",
    hasDropdown: true,
    dropdownKey: "informasi",
  },
  {
    path: "/dpd",
    label: "Daftar DPD",
    hasDropdown: true,
    dropdownKey: "daftarDpd",
  },
  { path: "/kegiatan", label: "Kegiatan" },
  {
    path: "/kepengurusan",
    label: "Kepengurusan",
    hasDropdown: true,
    dropdownKey: "kepengurusan",
  },
];

const sistemInformasiItems = [
  { label: "Berita", link: "/news" },
  { label: "Agenda", link: "/agenda" },
];

const kepengurusanItems = [
  { label: "DPA", link: "/dpa" },
  { label: "DPP", link: "/dpp" },
  { label: "DPD", link: "/dpd" },
];
</script>

<template>
  <!-- Desktop -->
  <nav
    class="w-full top-0 z-50 transition-all duration-500 px-8 pt-8 hidden lg:block"
    :class="[position || 'sticky']"
  >
    <div
      class="w-full h-full flex justify-between items-center transition-all duration-500"
      :class="[
        isScrolled
          ? 'bg-white/80 rounded-[32px] backdrop-blur-sm'
          : 'bg-transparent',
      ]"
    >
      <div class="w-fit flex flex-col items-start z-10">
        <div class="w-full flex">
          <div
            class="w-full pb-4 px-4 ease-in-out"
            :class="[
              isScrolled ? 'bg-transparent ' : 'bg-white rounded-br-4xl',
            ]"
          >
            <img
              :src="Logo"
              alt="Logo APTIKNAS"
              class="lg:w-12 object-contain" 
            />
          </div>
          <div
            class="bg-transparent curve ease-in-out"
            :class="[
              isScrolled
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
            isScrolled
              ? 'w-0 h-0 opacity-0 hidden'
              : 'w-[10px] h-[10px] opacity-100',
          ]"
        >
          <div class="concave-2"></div>
        </div>
      </div>
      <!-- <div class="">
                <img :src="Logo" alt="Logo BTH University" class="lg:w-12 object-contain">
            </div> -->

      <div class="flex justify-center items-center gap-12">
        <div v-for="item in desktopMenuItems" :key="item.path" class="relative">
          <RouterLink
            v-if="!item.hasDropdown && !item.isExternal"
            :to="item.path"
            class="lg:text-sm xl:text-base hover:text-gstart relative px-3 py-2 rounded-lg transition-colors duration-300"
            :class="route.path === item.path ? 'text-gstart' : 'text-netral'"
          >
            {{ item.label }}
            <motion.div
              v-if="route.path === item.path"
              layoutId="activeDesktopNavItem"
              :initial="{ scaleY: 0, opacity: 0 }"
              :animate="{ scaleY: 1, opacity: 1 }"
              :exit="{ scaleY: 0, opacity: 0 }"
              class="absolute inset-0 bg-black/5 rounded-lg z-[-1]"
              :style="{
                originY: 'center',
              }"
              :transition="{
                type: 'spring',
                bounce: 0.15,
                duration: 0.5,
              }"
            />
          </RouterLink>
          <a
            v-else-if="item.isExternal"
            :href="item.path"
            target="_blank"
            class="lg:text-sm xl:text-base hover:text-gstart relative px-3 py-2 rounded-lg transition-colors duration-300 text-netral"
          >
            {{ item.label }}
          </a>
          <div
            v-else
            class="relative"
            @mouseenter="isSistemInformasiHover = true"
            @mouseleave="isSistemInformasiHover = false"
          >
            <button
              @click="toggleSistemInformasi"
              class="lg:text-sm xl:text-base hover:text-gstart relative px-3 py-2 rounded-lg transition-colors duration-300 flex items-center gap-1"
              :class="
                route.path === item.path ||
                isSistemInformasiOpen ||
                isSistemInformasiHover
                  ? 'text-gstart'
                  : 'text-netral'
              "
            >
              {{ item.label }}
              <svg
                v-if="item.hasDropdown"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transition-transform duration-300"
                :class="
                  isSistemInformasiOpen || isSistemInformasiHover
                    ? 'rotate-180'
                    : ''
                "
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div
              v-if="isSistemInformasiOpen || isSistemInformasiHover"
              class="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <RouterLink
                v-if="item.dropdownKey === 'informasi'"
                v-for="dropdownItem in sistemInformasiItems"
                :key="dropdownItem.label"
                :to="dropdownItem.link"
                class="block px-4 py-2 text-sm text-netral hover:text-gstart hover:bg-gray-50 transition-colors duration-300"
              >
                {{ dropdownItem.label }}
              </RouterLink>
              <a
                v-else-if="item.dropdownKey === 'kepengurusan'"
                v-for="dropdownItem in kepengurusanItems"
                :key="dropdownItem.label"
                :href="dropdownItem.link"
                target="_blank"
                class="block px-4 py-2 text-sm text-netral hover:text-gstart hover:bg-gray-50 transition-colors duration-300"
              >
                {{ dropdownItem.label }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="w-fit mb-auto flex flex-col items-end z-10">
        <div class="flex">
          <div
            class="bg-transparent curve-3 ease-in-out"
            :class="[
              isScrolled
                ? 'w-0 h-0 opacity-0 hidden'
                : 'w-[10px] h-[10px] opacity-100',
            ]"
          >
            <div class="concave-3"></div>
          </div>
          <div
            class="w-fit ease-in-out py-4"
            :class="[isScrolled ? 'bg-transparent' : 'bg-white rounded-bl-4xl']"
          >
            <div class="flex items-center gap-2 px-4">
              <RouterLink to="/daftar">
                <ShimmerButton background="#16a34a">Daftar</ShimmerButton>
              </RouterLink>
              <div
                class="w-12 xl:w-14 h-12 xl:h-14 p-3 bg-primary rounded-full flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full h-full"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M10.5 25.5L25.5 10.5M25.5 10.5H13.5M25.5 10.5V22.5"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-transparent curve-4 ease-in-out"
          :class="[
            isScrolled
              ? 'w-0 h-0 opacity-0 hidden'
              : 'w-[10px] h-[10px] opacity-100',
          ]"
        >
          <div class="concave-4"></div>
        </div>
      </div>

      <!-- <div class="w-fit">
                <div class="flex items-center gap-2">
                    <Button text="Admisi" />
                    <div class="w-12 xl:w-14 h-12 xl:h-14 p-3 bg-primary rounded-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 36 36" fill="none">
                            <path d="M10.5 25.5L25.5 10.5M25.5 10.5H13.5M25.5 10.5V22.5" stroke="white" stroke-width="3"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div> -->
    </div>
  </nav>

  <!-- Mobile -->
  <nav
    class="w-full h-fit fixed top-0 lg:hidden z-20 transition-all duration-500"
    :class="[isMobileMenuOpen ? 'bg-white' : 'bg-transparent']"
  >
    <!-- Menu -->
    <div
      class="flex justify-between items-center transition-all duration-500"
      :class="[
        isScrolled ? ' rounded-lg backdrop-blur-sm' : 'bg-transparent',
        isMobileMenuOpen ? 'opacity-0 p-4' : 'opacity-100 p-4',
      ]"
    >
      <div>
        <img :src="Logo" alt="Logo APTIKNAS" class="w-12 object-contain" />
      </div>
      <div class="flex items-center gap-4">
        <RouterLink to="/daftar">
          <ShimmerButton class="px-8" background="#16a34a"
            >Daftar</ShimmerButton
          >
        </RouterLink>
        <svg
          @click="toggleMobileMenu"
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="23"
          viewBox="0 0 36 23"
          fill="none"
          class="cursor-pointer transition-all duration-500"
          :class="
            isMobileMenuOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          "
        >
          <path
            d="M2 1.5H8M34 1.5H16M34 21.5H28M2 21.5H20M2 11.5H34"
            stroke="#F03C06"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>

    <div
      class="fixed w-full min-h-screen z-20 transition-all duration-500"
      :class="
        isMobileMenuOpen
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0'
      "
    >
      <div
        @click="closeMobileMenu"
        class="w-fit ml-auto pr-4 cursor-pointer transition-all duration-500"
        :class="
          isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M15.5137 32.486L32.4857 15.514M32.4857 32.486L15.5137 15.514"
            stroke="#F03C06"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- List Menu Mobile -->
      <div
        class="pl-4 space-y-6 relative z-50 transition-all duration-500"
        :class="
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        "
      >
        <div
          class="transition-all duration-500"
          :class="
            isMobileMenuOpen
              ? 'translate-x-0 opacity-100'
              : '-translate-x-8 opacity-0'
          "
          :style="{ transitionDelay: isMobileMenuOpen ? '100ms' : '0ms' }"
        >
          <img :src="Logo" alt="Logo APTIKNAS" class="w-12 object-contain" />
        </div>
        <div
          class="flex flex-col transition-all duration-500"
          :class="
            isMobileMenuOpen
              ? 'translate-x-0 opacity-100'
              : '-translate-x-8 opacity-0'
          "
          :style="{ transitionDelay: isMobileMenuOpen ? '200ms' : '0ms' }"
        >
          <RouterLink
            v-for="(item, index) in desktopMenuItems.filter(
              (item) => !item.hasDropdown && !item.isExternal
            )"
            :key="item.path"
            :to="item.path"
            class="lg:text-sm xl:text-base hover:text-gstart hover:border-l border-primary relative px-3 py-2 transition-all duration-500"
            :class="[
              route.path === item.path
                ? 'border-l border-primary text-gstart'
                : 'text-netral',
              isMobileMenuOpen
                ? 'translate-x-0 opacity-100'
                : '-translate-x-8 opacity-0',
            ]"
            :style="{
              transitionDelay: isMobileMenuOpen
                ? `${300 + index * 50}ms`
                : '0ms',
            }"
          >
            {{ item.label }}
          </RouterLink>
          <a
            v-for="(item, index) in desktopMenuItems.filter(
              (item) => item.isExternal
            )"
            :key="item.path"
            :href="item.path"
            target="_blank"
            class="lg:text-sm xl:text-base hover:text-gstart hover:border-l border-primary relative px-3 py-2 transition-all duration-500 text-netral"
            :class="[
              isMobileMenuOpen
                ? 'translate-x-0 opacity-100'
                : '-translate-x-8 opacity-0',
            ]"
            :style="{
              transitionDelay: isMobileMenuOpen
                ? `${
                    300 +
                    (index +
                      desktopMenuItems.filter(
                        (item) => !item.hasDropdown && !item.isExternal
                      ).length) *
                      50
                  }ms`
                : '0ms',
            }"
          >
            {{ item.label }}
          </a>
          <div class="relative">
            <button
              @click="toggleSistemInformasi"
              class="lg:text-sm xl:text-base hover:text-gstart hover:border-l border-primary relative px-3 py-2 transition-all duration-500 flex items-center gap-1 w-full text-left"
              :class="[
                isSistemInformasiOpen
                  ? 'border-l border-primary text-gstart'
                  : 'text-netral',
                isMobileMenuOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-8 opacity-0',
              ]"
              :style="{
                transitionDelay: isMobileMenuOpen
                  ? `${
                      300 +
                      desktopMenuItems.filter((item) => !item.hasDropdown)
                        .length *
                        50
                    }ms`
                  : '0ms',
              }"
            >
              {{ desktopMenuItems.find((item) => item.hasDropdown)?.label }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transition-transform duration-300"
                :class="isSistemInformasiOpen ? 'rotate-180' : ''"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div
              v-if="isSistemInformasiOpen"
              class="pl-4 transition-all duration-300"
            >
              <a
                v-for="dropdownItem in sistemInformasiItems"
                :key="dropdownItem.label"
                :href="dropdownItem.link"
                target="_blank"
                class="block px-3 py-2 text-sm text-netral hover:text-gstart transition-colors duration-300"
              >
                {{ dropdownItem.label }}
              </a>
            </div>
          </div>
        </div>
        <div
          class="flex items-center gap-2 transition-all duration-500"
          :class="
            isMobileMenuOpen
              ? 'translate-x-0 opacity-100'
              : '-translate-x-8 opacity-0'
          "
          :style="{ transitionDelay: isMobileMenuOpen ? '600ms' : '0ms' }"
        >
          <RouterLink to="/daftar">
            <ShimmerButton background="#16a34a">Daftar</ShimmerButton>
          </RouterLink>
          <div
            class="w-12 xl:w-14 h-12 xl:h-14 p-3 bg-primary rounded-full flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                d="M10.5 25.5L25.5 10.5M25.5 10.5H13.5M25.5 10.5V22.5"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.curve {
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 20px;
}

.concave {
  border-radius: 50%;
  box-shadow: -20px -20px white;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.curve-2 {
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 20px;
}

.concave-2 {
  border-radius: 50%;
  box-shadow: -20px -20px white;
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
  box-shadow: -20px -20px white;
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
  box-shadow: -20px -20px white;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
