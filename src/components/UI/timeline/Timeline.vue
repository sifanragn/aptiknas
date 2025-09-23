<template>
  <section ref="timelineContainerRef" class="w-full font-sans py-16">
    <div
      class="mx-auto max-w-7xl px-4 lg:px-10 md:px-8 text-center"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <Badge>Bagaimana</Badge>
      <h2 class="text-3xl font-bold text-gray-900 mt-4 mb-2" v-if="title">
        {{ title }}
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto mb-12" v-if="description">
        {{ description }}
      </p>
    </div>

    <div ref="timelineRef" class="relative z-0 mx-auto max-w-5xl">
      <!-- Timeline line -->
      <div
        :style="{ height: height + 'px' }"
        class="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-[2px] bg-white hidden md:block"
      >
        <Motion
          as="div"
          :style="{
            height: heightTransform,
            opacity: opacityTransform,
          }"
          class="absolute top-0 w-[2px] bg-green-500"
        ></Motion>
      </div>

      <!-- Timeline items -->
      <div
        v-for="(item, index) in items"
        :key="item.id + index"
        class="relative py-8 md:py-12"
        data-aos="fade-up"
        :data-aos-delay="100 * index"
      >
        <!-- Dot with number -->
        <div
          class="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform"
          data-aos="zoom-in"
          :data-aos-delay="150 * index"
        >
          <div
            class="hidden md:flex size-12 border-4 border-green-200 items-center justify-center rounded-full bg-green-500 text-white font-bold"
          >
            {{ index + 1 }}
          </div>
        </div>

        <!-- Content - Alternating layout -->
        <div class="flex flex-col md:flex-row items-center gap-8 relative">
          <!-- Image (left for even, right for odd) -->
          <div
            :class="['md:w-1/2', index % 2 === 0 ? 'md:order-1' : 'md:order-2']"
            :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
            :data-aos-delay="200 + 100 * index"
          >
            <img
              :src="item.imageUrl"
              :alt="item.label"
              class="w-70 max-w-md rounded-lg shadow-lg mx-auto"
              data-aos="zoom-in"
              :data-aos-delay="250 + 100 * index"
            />
            <div
              class="absolute translate-x-1/2 -bottom-5 right-1/2 md:hidden flex size-12 items-center justify-center rounded-full bg-green-500 text-white font-bold"
            >
              {{ index + 1 }}
            </div>
          </div>

          <!-- Text content (right for even, left for odd) -->
          <div
            :class="[
              'md:w-1/2 px-4',
              index % 2 === 0
                ? 'md:order-2 md:text-left md:pl-30'
                : 'md:order-1 md:text-right md:pr-30',
            ]"
            :data-aos="index % 2 === 0 ? 'fade-left' : 'fade-right'"
            :data-aos-delay="200 + 100 * index"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              {{ item.label }}
            </h3>
            <slot :name="item.id"></slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Motion, useScroll, useTransform } from "motion-v";
import { nextTick, onMounted, ref } from "vue";
import Badge from "@/components/UI/Badge.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  title: String,
  description: String,
});
const loading = ref(false);
const error = ref(null);

const timelineContainerRef = ref<HTMLElement | null>(null);
const timelineRef = ref<HTMLElement | null>(null);
const height = ref(0);

onMounted(async () => {
  await nextTick();
  if (timelineRef.value) {
    const rect = timelineRef.value.getBoundingClientRect();
    height.value = rect.height;
  }

  AOS.init({
    once: true,
    duration: 800,
    easing: "ease-in-out",
  });
});

const { scrollYProgress } = useScroll({
  target: timelineContainerRef,
  offset: ["start end", "end start"],
});

const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
const heightTransform = useTransform(scrollYProgress, (latest) => {
  return latest * height.value;
});
</script>
