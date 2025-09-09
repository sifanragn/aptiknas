<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { BookIcon, HandshakeIcon, TargetIcon } from 'lucide-vue-next';
import Badge from '@/components/UI/Badge.vue';

// Data dummy untuk timeline
const dummyTimelineItems = [
  {
    id: 'sejarah',
    title: 'Sejarah APTIKNAS',
    description: 'Berdiri sejak tahun 2005, APTIKNAS telah menjadi wadah bagi pengusaha TIK nasional untuk berkembang dan berkontribusi bagi negeri...',
    content: 'Berdiri sejak tahun 2005, APTIKNAS telah menjadi wadah bagi pengusaha TIK nasional untuk berkembang dan berkontribusi bagi negeri. Dengan semangat kolaborasi dan inovasi, kami terus mendorong transformasi digital di Indonesia.',
    icon: BookIcon,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'visi',
    title: 'Visi Kami',
    description: 'Menjadi asosiasi terdepan yang memajukan industri teknologi informasi dan komunikasi nasional...',
    content: 'Menjadi asosiasi terdepan yang memajukan industri teknologi informasi dan komunikasi nasional, serta menjadi mitra strategis pemerintah dalam perumusan kebijakan TIK yang berkelanjutan dan inklusif.',
    icon: HandshakeIcon,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'misi',
    title: 'Misi Kami',
    description: 'Mendorong inovasi dan pengembangan ekosistem TIK yang berkelanjutan...',
    content: 'Mendorong inovasi dan pengembangan ekosistem TIK yang berkelanjutan, memberdayakan anggota melalui berbagai program capacity building, serta menjalin kerjasama strategis dengan berbagai stakeholder.',
    icon: TargetIcon,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
];

const selectedItemIndex = ref(0);
const itemRefs = ref([]);
const activeLineHeight = ref(0);
let observer = null;

onMounted(() => {
  nextTick(() => {
    updateActiveLine();
    setupIntersectionObserver();
  });
});

const timelineItems = computed(() => {
  return dummyTimelineItems;
});

const selectedItem = computed(() => timelineItems.value[selectedItemIndex.value]);

function selectItem(index) {
  selectedItemIndex.value = index;
}

function updateActiveLine() {
  const activeItemEl = itemRefs.value[selectedItemIndex.value];
  if (activeItemEl) {
    const circleEl = activeItemEl.querySelector('.numbered-circle');
    if (circleEl) {
      const circleCenter = activeItemEl.offsetTop + circleEl.offsetHeight / 2;
      activeLineHeight.value = circleCenter;
    }
  }
}

function setupIntersectionObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      const intersectingEntry = entries.find(entry => entry.isIntersecting);
      if (intersectingEntry) {
        const index = itemRefs.value.findIndex(ref => ref === intersectingEntry.target);
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

  itemRefs.value.forEach(el => {
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
    <div class="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-16 items-center">
      <!-- Left Image and Title -->
      <div class="md:w-1/2 flex flex-col items-start">
        <Badge text="Tentang Kami" customClass="text-sm" />
        <Transition name="fade" mode="out-in">
          <div :key="selectedItem?.id" class="w-full" v-if="selectedItem">
            <!-- Responsive title -->
            <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold mb-2 mt-3">
              {{ selectedItem.title }}
            </h2>
            <p class="text-neutral-600 dark:text-neutral-400 mb-6">{{ selectedItem.description }}</p>
            
            <!-- Responsive image -->
            <img 
              :src="selectedItem.image" 
              :alt="selectedItem.title" 
              class="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[420px] 2xl:h-[480px] rounded-xl object-cover mb-4" 
            />
          </div>
        </Transition>
      </div>

      <!-- Right Timeline -->
      <div class="md:w-1/2 relative" v-if="timelineItems.length > 0">
        <!-- Vertical Line -->
        <div class="absolute left-5 top-2 bottom-0 w-0.5 bg-gray-200 dark:bg-neutral-700"></div>
        <!-- Active line -->
        <div class="absolute left-5 top-2 w-0.5 bg-green-600 transition-all duration-300 ease-in-out" :style="{ height: activeLineHeight + 'px' }"></div>

        <!-- Timeline Items (max 3 items) -->
        <div 
          v-for="(item, index) in timelineItems.slice(0, 3)" 
          :key="item.id" 
          class="relative flex items-start gap-8 mb-10 top-0 cursor-pointer" 
          @click="selectItem(index)" 
          :ref="el => { if (el) itemRefs[index] = el }"
        >
          <!-- Numbered Circle -->
          <div 
            class="numbered-circle relative z-10 flex h-10 w-10 items-center justify-center rounded-full shrink-0 font-bold text-lg transition-colors duration-300"
            :class="selectedItemIndex === index ? 'bg-green-600 text-white border-4 border-green-300' : 'bg-white dark:bg-neutral-800 border-4 border-gray-300/80 dark:border-neutral-700 text-gray-500 dark:text-neutral-400'"
          >
            {{ index + 1 }}
          </div>

          <!-- Content -->
          <div class="flex-1 transition-opacity duration-300" :class="selectedItemIndex === index ? 'opacity-100' : 'opacity-60'">
            <div class="mb-2" :class="selectedItemIndex === index ? 'text-green-600 dark:text-green-400' : 'text-neutral-500'">
              <component :is="item.icon" class="w-8 h-8" />
            </div>
            <h3 class="text-base sm:text-lg lg:text-xl font-bold mb-1 text-black dark:text-white">{{ item.title }}</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400" v-html="item.content"></p>
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