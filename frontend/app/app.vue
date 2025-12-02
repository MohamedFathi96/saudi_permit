<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

// Update HTML lang attribute when locale changes
watch(
  locale,
  (newLocale) => {
    if (import.meta.client) {
      document.documentElement.lang = newLocale;
    }
  },
  { immediate: true }
);

// Set initial lang on mount
onMounted(() => {
  document.documentElement.lang = locale.value;
});
</script>
