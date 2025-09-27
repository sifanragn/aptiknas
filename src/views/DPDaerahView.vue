<script setup>
import { computed } from "vue";
import Hero from "@/pages/HomePages/Hero.vue";
import Content from "@/pages/DPDPages/Content.vue";
import Anggota from "@/pages/DPDPages/Anggota.vue";
import { dpdPageContent } from "@/pages/DPDPages/data.ts";

const props = defineProps({
  daerah: {
    type: String,
    required: true,
  },
});

const currentContent = computed(() => {
  return dpdPageContent[props.daerah] || [];
});
</script>
<template>
  <div class="flex flex-col items-center justify-center">
    <Hero />
    <Content :sections="currentContent" />
    <Anggota :daerah="daerah" />
  </div>
</template>
