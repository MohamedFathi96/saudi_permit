<template>
  <ApplicationsPage />
</template>

<script setup lang="ts">
import ApplicationsPage from "~/features/applications/pages/ApplicationsPage.vue";

definePageMeta({
  middleware: "auth",
});
</script>
