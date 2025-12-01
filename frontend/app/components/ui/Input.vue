<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" class="text-sm font-medium text-gray-700 rtl:text-right">{{ label }}</label>
    <input
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :class="[
        'border rounded-md w-full py-2 px-3 focus:ring-2 focus:outline-none transition-all',
        error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-primary',
      ]"
    />
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<script setup>
const model = defineModel();

defineProps({
  label: String,
  placeholder: String,
  type: { type: String, default: "text" },
  error: String,
});
</script>
