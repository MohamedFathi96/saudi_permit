<template>
  <EditApplicationPage />
</template>

<script setup lang="ts">
import EditApplicationPage from "~/features/applications/pages/EditApplicationPage.vue";

definePageMeta({
  middleware: "auth",
});
</script>
