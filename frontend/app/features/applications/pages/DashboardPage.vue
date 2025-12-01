<template>
  <NuxtLayout name="dashboard-layout">
    <div class="space-y-6">
      <!-- Welcome Card -->
      <WelcomeCard :user-name="user?.name" />

      <!-- Stats Grid -->
      <StatsGrid :stats="stats" />

      <!-- Recent Applications -->
      <RecentApplications />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import WelcomeCard from "../components/WelcomeCard.vue";
import StatsGrid from "../components/StatsGrid.vue";
import RecentApplications from "../components/RecentApplications.vue";

const { user } = useAuth();

// TODO: Replace with actual data from API
const stats = ref({
  total: 12,
  approved: 8,
  pending: 3,
  rejected: 1,
});
</script>

