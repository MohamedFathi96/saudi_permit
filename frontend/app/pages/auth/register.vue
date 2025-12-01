<template>
  <RegisterPage />
</template>

<script setup lang="ts">
import RegisterPage from "~/features/auth/pages/RegisterPage.vue";

definePageMeta({
  middleware: "guest",
  layout: false,
});
</script>
