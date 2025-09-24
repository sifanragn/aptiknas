<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { watch } from "vue";
import AppHeader from "@/components/Layout/AppHeader.vue";
import AppFooter from "@/components/Layout/AppFooter.vue";

// Scroll ke atas saat route berubah
const route = useRoute();
watch(
  () => route.path,
  () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  }
);
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#F0F0F0] overflow-hidden">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<style>
/* Animasi transisi halaman */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
