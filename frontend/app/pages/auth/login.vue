<template>
  <LoginPage />
</template>

<script setup lang="ts">
import LoginPage from "~/features/auth/pages/LoginPage.vue";

definePageMeta({
  middleware: "guest",
  layout: false,
});
</script>
