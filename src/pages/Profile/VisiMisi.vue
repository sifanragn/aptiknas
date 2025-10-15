<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { useAboutusStore } from "@/stores/aboutus";
import { BookIcon, HandshakeIcon, TargetIcon } from "lucide-vue-next";
import Badge from "@/components/UI/Badge.vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Gunakan aboutus store
const aboutusStore = useAboutusStore();

const selectedItemIndex = ref(0);
const itemRefs = ref([]);
const activeLineHeight = ref(0);
let observer = null;

// Filter data yang display_on_home = false dan hanya kategori Visi, Misi, Sejarah
const filteredAboutus = computed(() => {
  if (!aboutusStore.list || !aboutusStore.list.data) return [];

  // Handle struktur response yang berbeda
  let dataArray = [];

  if (Array.isArray(aboutusStore.list.data)) {
    // Response format: { success: true, data: [...] }
    dataArray = aboutusStore.list.data;
  } else if (
    aboutusStore.list.data &&
    Array.isArray(aboutusStore.list.data.data)
  ) {
    // Response format dengan pagination
    dataArray = aboutusStore.list.data.data;
  } else if (Array.isArray(aboutusStore.list)) {
    // Response langsung array
    dataArray = aboutusStore.list;
  }

  // Filter yang display_on_home = false dan hanya kategori Visi, Misi, Sejarah
  const allowedCategories = ["visi", "misi", "sejarah"];

  return dataArray
    .filter(
      (item) =>
        item.display_on_home === false &&
        item.category &&
        allowedCategories.includes(item.category.name.toLowerCase())
    )
    .slice(0, 3); // Maksimal 3 data
});

// Format timeline items dari data API
const timelineItems = computed(() => {
  if (filteredAboutus.value.length === 0) return [];

  return filteredAboutus.value.map((item, index) => {
    // Tentukan icon berdasarkan kategori
    let icon = BookIcon; // default icon
    if (item.category && item.category.name) {
      const categoryName = item.category.name.toLowerCase();
      if (categoryName.includes("visi")) icon = TargetIcon;
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
      originalIndex: index,
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
  const baseUrl = "https://cms-aptiknas.hexagon.co.id";

  // Jika path sudah mengandung 'storage/', langsung gabungkan. Jika tidak, tambahkan '/storage/'.
  const imageFinalPath = imagePath.startsWith("storage/")
    ? imagePath
    : `storage/${imagePath}`;
  return `${baseUrl}/${imageFinalPath.replace(/^\//, "")}`;
};

onMounted(async () => {
  // Fetch data dari store
  await aboutusStore.fetchAll();

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

        <!-- Loading State -->
        <div v-if="aboutusStore.loading" class="w-full text-center py-10">
          <p class="text-neutral-500 dark:text-neutral-400">Memuat data...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="aboutusStore.error" class="w-full text-center py-10">
          <p class="text-red-500 dark:text-red-400">
            Gagal memuat data: {{ aboutusStore.error }}
          </p>
        </div>

        <!-- Content -->
        <Transition name="fade" mode="out-in" v-else-if="selectedItem">
          <div :key="selectedItem?.id" class="w-full">
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
              @error="
                (event) => {
                  event.target.src =
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                }
              "
            />
          </div>
        </Transition>

        <!-- Empty state -->
        <div
          v-else-if="timelineItems.length === 0"
          class="w-full text-center py-10"
        >
          <p class="text-neutral-500 dark:text-neutral-400">
            Tidak ada data tentang kami yang tersedia.
          </p>
        </div>
      </div>

      <!-- Right Timeline -->
      <div
        class="md:w-1/2 relative"
        v-if="
          !aboutusStore.loading &&
          !aboutusStore.error &&
          timelineItems.length > 0
        "
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
          v-for="(item, index) in timelineItems"
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
