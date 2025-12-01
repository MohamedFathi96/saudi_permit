<template>
  <div :class="cardClasses" class="rounded-xl shadow-sm p-6 text-white">
    <div class="flex items-center justify-between mb-4">
      <Icon :name="icon" class="w-8 h-8 opacity-80" />
      <span class="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
        {{ label }}
      </span>
    </div>
    <h3 class="text-3xl font-bold mb-1">{{ count }}</h3>
    <p :class="descriptionClasses" class="text-sm">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  label: string;
  count: number;
  description: string;
  variant: "blue" | "green" | "yellow" | "red";
}

const props = defineProps<Props>();

const variantClasses = {
  blue: {
    card: "bg-gradient-to-br from-blue-500 to-blue-600",
    description: "text-blue-100",
  },
  green: {
    card: "bg-gradient-to-br from-green-500 to-green-600",
    description: "text-green-100",
  },
  yellow: {
    card: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    description: "text-yellow-100",
  },
  red: {
    card: "bg-gradient-to-br from-red-500 to-red-600",
    description: "text-red-100",
  },
};

const cardClasses = computed(() => variantClasses[props.variant].card);
const descriptionClasses = computed(() => variantClasses[props.variant].description);
</script>

