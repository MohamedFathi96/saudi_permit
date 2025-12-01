<template>
  <button
    :class="[
      'font-medium cursor-pointer rounded-md px-4 py-2 transition-all duration-200 rtl:font-medium',
      variantClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  disabled: { type: Boolean, default: false },
});

const variantClasses = computed(() => {
  return {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  }[props.variant];
});

const sizeClasses = computed(() => {
  return {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6",
  }[props.size];
});
</script>
