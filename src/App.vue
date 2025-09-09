<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/Layout/AppHeader.vue'
import AppFooter from './components/Layout/AppFooter.vue'
</script>

<template>
  <div class=" flex flex-col bg-[#F0F0F0] overflow-hidden">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
/* Styles khusus untuk App.vue jika diperlukan */
</style>