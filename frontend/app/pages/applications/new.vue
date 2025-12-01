<template>
  <NewApplicationPage />
</template>

<script setup lang="ts">
import NewApplicationPage from "~/features/applications/pages/NewApplicationPage.vue";
definePageMeta({
  middleware: "auth",
});
</script>
