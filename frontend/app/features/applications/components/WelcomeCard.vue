<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ $t('dashboard.welcome') }}, {{ userName }}! 👋</h2>
    <p class="text-gray-600">
      This is your dashboard overview. Here you can manage your permit applications and track their status.
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  userName?: string;
}

withDefaults(defineProps<Props>(), {
  userName: "User",
});
</script>

