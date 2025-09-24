<script setup>
import Main from "@/pages/HubungiKamiPages.vue/MainPage.vue";
import CardHubung from "@/pages/HubungiKamiPages.vue/CardHubung.vue";
import Form from "@/pages/HubungiKamiPages.vue/Form.vue";
</script>
<template>
  <div class="grid grid-cols-2 pt-30">
    <div class="col-span-1">
      <Main />
      <CardHubung />
    </div>
    <div class="col-span-1">
      <Form />
    </div>
  </div>
</template>
