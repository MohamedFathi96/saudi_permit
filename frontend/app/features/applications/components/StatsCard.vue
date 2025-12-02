<template>
  <div class="rounded-xl shadow-sm p-6 text-white bg-secondary">
    <div class="flex items-center justify-between mb-4">
      <Icon :name="icon" class="w-8 h-8 opacity-80" />
      <span class="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full text-black">
        {{ label }}
      </span>
    </div>
    <h3 class="text-3xl font-bold mb-1">{{ count }}</h3>
    <p class="text-sm">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  label: string;
  count: number;
  description: string;
}

const props = defineProps<Props>();
</script>
