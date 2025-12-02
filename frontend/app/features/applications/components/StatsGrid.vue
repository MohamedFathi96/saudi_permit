<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatsCard
      icon="mdi:file-document-multiple"
      :label="$t('dashboard.stats.total')"
      :count="stats.total"
      :description="$t('dashboard.stats.total')"
      variant="blue"
    />

    <StatsCard
      icon="mdi:check-circle"
      :label="$t('dashboard.stats.approved')"
      :count="stats.approved"
      :description="$t('dashboard.stats.approved')"
      variant="green"
    />

    <StatsCard
      icon="mdi:clock-outline"
      :label="$t('dashboard.stats.pending')"
      :count="stats.pending"
      :description="$t('dashboard.stats.pending')"
      variant="yellow"
    />

    <StatsCard
      icon="mdi:close-circle"
      :label="$t('dashboard.stats.rejected')"
      :count="stats.rejected"
      :description="$t('dashboard.stats.rejected')"
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
