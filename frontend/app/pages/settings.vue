<template>
  <NuxtLayout name="dashboard-layout">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ $t("layout.nav.settings") }}</h1>

        <p class="text-gray-500">{{ $t("settings.comingSoon") }}</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

