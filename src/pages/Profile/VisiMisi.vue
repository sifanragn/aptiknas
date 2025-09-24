<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { BookIcon, HandshakeIcon, TargetIcon } from "lucide-vue-next";
import Badge from "@/components/UI/Badge.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const selectedItemIndex = ref(0);
const itemRefs = ref([]);
const activeLineHeight = ref(0);
let observer = null;

// Data dummy untuk Visi, Misi, dan Sejarah
const dummyAboutUsData = ref([
  {
    id: 1,
    title: "Visi APTIKNAS",
    description:
      "<p>Menjadi organisasi profesional yang terdepan, inovatif, dan berkelanjutan dalam mendorong pertumbuhan industri Teknologi Informasi dan Komunikasi (TIK) nasional agar mampu berdaya saing di tingkat global. Kami bercita-cita untuk menciptakan ekosistem digital yang inklusif dan bermanfaat bagi seluruh masyarakat Indonesia.</p>",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    display_on_home: false,
    category: {
      name: "Visi",
    },
  },
  {
    id: 2,
    title: "Misi APTIKNAS",
    description:
      "<ul><li>Mengembangkan kompetensi dan profesionalisme anggota melalui program pelatihan dan sertifikasi.</li><li>Mendorong kolaborasi strategis antara pelaku industri, pemerintah, dan akademisi untuk menciptakan sinergi.</li><li>Memfasilitasi akses pasar dan pembiayaan bagi anggota, terutama UMKM di bidang TIK.</li><li>Mengadvokasi kebijakan yang mendukung pertumbuhan ekosistem digital yang sehat dan kompetitif.</li></ul>",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    display_on_home: false,
    category: {
      name: "Misi",
    },
  },
  {
    id: 3,
    title: "Sejarah APTIKNAS",
    description:
      "<p>APTIKNAS merupakan transformasi dari APKOMINDO yang didirikan pada tahun 1991, menjadikannya asosiasi TIK tertua di Indonesia. Dideklarasikan secara resmi pada 24 Februari 2017, APTIKNAS lahir dari semangat untuk menyatukan para pengusaha, praktisi, dan akademisi TIK dalam satu wadah yang solid untuk bersama-sama memajukan industri TIK nasional.</p>",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    display_on_home: false,
    category: {
      name: "Sejarah",
    },
  },
]);

// Mengambil data dari store
const aboutusData = computed(() => {
  return dummyAboutUsData.value;
});

// Filter data yang display_on_home = false
const filteredAboutus = computed(() => {
  return aboutusData.value.filter((item) => item.display_on_home === false);
});

// Format timeline items dari data API
const timelineItems = computed(() => {
  if (filteredAboutus.value.length === 0) return [];

  return filteredAboutus.value.map((item) => {
    // Tentukan icon berdasarkan kategori
    let icon = BookIcon; // default icon
    if (item.category && item.category.name) {
      const categoryName = item.category.name.toLowerCase();
      if (categoryName.includes("visi")) icon = TargetIcon; // Visi
      else if (categoryName.includes("misi")) icon = HandshakeIcon;
      else if (categoryName.includes("sejarah")) icon = BookIcon;
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description
        ? item.description.replace(/<[^>]*>/g, "").substring(0, 120) + "..."
        : "",
      content: item.description || "",
      icon: icon,
      image: getImageUrl(item.image),
      category: item.category ? item.category.name : "Umum",
    };
  });
});

const selectedItem = computed(
  () => timelineItems.value[selectedItemIndex.value]
);

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (imagePath) => {
  if (!imagePath)
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  // Jika gambar sudah berupa URL lengkap, langsung kembalikan
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Jika gambar adalah path relatif, tambahkan base URL
  const baseUrl = "http://127.0.0.1:8000";
  return `${baseUrl}/${imagePath}`;
};

onMounted(async () => {
  nextTick(() => {
    updateActiveLine();
    setupIntersectionObserver();
  });
  AOS.init({
    duration: 800,
    easing: "ease-out-quad",
    once: false, // Animasi berulang setiap kali scroll
    offset: 120,
  });
});

function selectItem(index) {
  selectedItemIndex.value = index;
}

function updateActiveLine() {
  const activeItemEl = itemRefs.value[selectedItemIndex.value];
  if (activeItemEl) {
    const circleEl = activeItemEl.querySelector(".numbered-circle");
    if (circleEl) {
      const circleCenter = activeItemEl.offsetTop + circleEl.offsetHeight / 2;
      activeLineHeight.value = circleCenter;
    }
  }
}

function setupIntersectionObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      const intersectingEntry = entries.find((entry) => entry.isIntersecting);
      if (intersectingEntry) {
        const index = itemRefs.value.findIndex(
          (ref) => ref === intersectingEntry.target
        );
        if (index !== -1) {
          selectedItemIndex.value = index;
        }
      }
    },
    {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }
  );

  itemRefs.value.forEach((el) => {
    if (el) observer.observe(el);
  });
}

watch(selectedItemIndex, () => {
  nextTick(updateActiveLine);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div class="w-full dark:bg-neutral-950 py-16 font-sans">
    <div
      class="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-16 items-center"
    >
      <!-- Left Image and Title -->
      <div
        class="md:w-1/2 flex flex-col items-start"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        <Badge text="Tentang Kami" customClass="text-sm" />
        <Transition name="fade" mode="out-in">
          <div :key="selectedItem?.id" class="w-full" v-if="selectedItem">
            <!-- Responsive title -->
            <h2
              class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold mb-2 mt-3"
            >
              {{ selectedItem.title }}
            </h2>
            <p class="text-neutral-600 dark:text-neutral-400 mb-6">
              {{ selectedItem.description }}
            </p>

            <!-- Responsive image -->
            <img
              :src="selectedItem.image"
              :alt="selectedItem.title"
              class="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[420px] 2xl:h-[480px] rounded-xl object-cover mb-4"
            />
          </div>
        </Transition>

        <!-- Empty state -->
        <div v-if="timelineItems.length === 0" class="w-full text-center py-10">
          <p class="text-neutral-500 dark:text-neutral-400">
            Tidak ada data tentang kami yang tersedia.
          </p>
        </div>
      </div>

      <!-- Right Timeline -->
      <div
        class="md:w-1/2 relative"
        v-if="timelineItems.length > 0"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <!-- Vertical Line -->
        <div
          class="absolute left-5 top-2 bottom-0 w-0.5 bg-gray-200 dark:bg-neutral-700"
        ></div>
        <!-- Active line -->
        <div
          class="absolute left-5 top-2 w-0.5 bg-green-600 transition-all duration-300 ease-in-out"
          :style="{ height: activeLineHeight + 'px' }"
        ></div>

        <!-- Timeline Items (max 3 items) -->
        <div
          v-for="(item, index) in timelineItems.slice(0, 3)"
          :key="item.id"
          class="relative flex items-start gap-8 mb-10 top-0 cursor-pointer"
          @click="selectItem(index)"
          :ref="
            (el) => {
              if (el) itemRefs[index] = el;
            }
          "
        >
          <!-- Numbered Circle -->
          <div
            class="numbered-circle relative z-10 flex h-10 w-10 items-center justify-center rounded-full shrink-0 font-bold text-lg transition-colors duration-300"
            :class="
              selectedItemIndex === index
                ? 'bg-green-600 text-white border-4 border-green-300'
                : 'bg-white dark:bg-neutral-800 border-4 border-gray-300/80 dark:border-neutral-700 text-gray-500 dark:text-neutral-400'
            "
          >
            {{ index + 1 }}
          </div>

          <!-- Content -->
          <div
            class="flex-1 transition-opacity duration-300"
            :class="selectedItemIndex === index ? 'opacity-100' : 'opacity-60'"
          >
            <div
              class="mb-2"
              :class="
                selectedItemIndex === index
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-neutral-500'
              "
            >
              <component :is="item.icon" class="w-8 h-8" />
            </div>
            <h3
              class="text-base sm:text-lg lg:text-xl font-bold mb-1 text-black dark:text-white"
            >
              {{ item.title }}
            </h3>
            <p
              class="text-sm text-neutral-600 dark:text-neutral-400"
              v-html="item.content"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
