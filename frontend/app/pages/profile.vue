<template>
  <NuxtLayout name="dashboard-layout">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-xl shadow-sm">
        <div class="bg-secondary rounded-t-lg p-4 text-white">
          <h1 class="text-2xl font-bold">{{ $t("layout.nav.profile") }}</h1>
        </div>

        <div class="space-y-4 p-6">
          <div>
            <label class="block text-sm font-medium text-gray-500">{{ $t("profile.name") }}</label>
            <p class="mt-1 text-lg text-gray-900">{{ user?.name || "-" }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500">{{ $t("profile.email") }}</label>
            <p class="mt-1 text-lg text-gray-900">{{ user?.email || "-" }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500">{{ $t("profile.role") }}</label>
            <p class="mt-1 text-lg text-gray-900 capitalize">{{ user?.role || "-" }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { user } = useAuth();

definePageMeta({
  middleware: "auth",
});
</script>
