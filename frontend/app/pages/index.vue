<template>
  <DashboardPage />
</template>

<script setup lang="ts">
import DashboardPage from "~/features/applications/pages/DashboardPage.vue";

definePageMeta({
  middleware: "auth",
});
</script>
