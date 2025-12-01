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
import { fetchApplications } from "../services";
import { ApplicationStatus } from "../types";

const { user, token } = useAuth();

// Stats computed from applications
const stats = ref({
  total: 0,
  approved: 0,
  pending: 0,
  rejected: 0,
});

// Load applications and calculate stats
const loadStats = async () => {
  if (!token.value) return;

  try {
    const applications = await fetchApplications(token.value);

    stats.value = {
      total: applications.length,
      approved: applications.filter((app) => app.application_status === ApplicationStatus.Approved).length,
      pending: applications.filter((app) => app.application_status === ApplicationStatus.Pending).length,
      rejected: applications.filter((app) => app.application_status === ApplicationStatus.Rejected).length,
    };
  } catch (error) {
    console.error("Failed to load stats:", error);
    // Keep default values on error
  }
};

onMounted(() => {
  loadStats();
});
</script>
