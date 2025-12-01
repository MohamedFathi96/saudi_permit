<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatsCard
      icon="mdi:file-document-multiple"
      label="Total"
      :count="stats.total"
      description="Total Applications"
      variant="blue"
    />

    <StatsCard
      icon="mdi:check-circle"
      label="Approved"
      :count="stats.approved"
      description="Approved Applications"
      variant="green"
    />

    <StatsCard
      icon="mdi:clock-outline"
      label="Pending"
      :count="stats.pending"
      description="Pending Review"
      variant="yellow"
    />

    <StatsCard
      icon="mdi:close-circle"
      label="Rejected"
      :count="stats.rejected"
      description="Rejected Applications"
      variant="red"
    />
  </div>
</template>

<script setup lang="ts">
import StatsCard from "./StatsCard.vue";

interface Stats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}

interface Props {
  stats: Stats;
}

defineProps<Props>();
</script>

