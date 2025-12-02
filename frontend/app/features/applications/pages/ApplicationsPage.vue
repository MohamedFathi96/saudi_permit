<template>
  <NuxtLayout name="dashboard-layout">
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">My Applications</h1>
          <p class="text-gray-600 mt-1">View and manage your permit applications</p>
        </div>
        <NuxtLink
          to="/applications/new"
          class="inline-flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <Icon name="mdi:plus" class="w-5 h-5" />
          <span>New Application</span>
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div class="h-4 bg-gray-200 rounded w-1/2 mb-6" />
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded" />
            <div class="h-4 bg-gray-200 rounded" />
            <div class="h-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <Icon name="mdi:alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 class="text-lg font-semibold text-red-800 mb-2">Failed to Load Applications</h3>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          class="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          @click="() => refresh()"
        >
          <Icon name="mdi:refresh" class="w-5 h-5" />
          <span>Retry</span>
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!pending && !error && (!applications || applications.length === 0)"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
      >
        <Icon name="mdi:file-document-outline" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-800 mb-2">No Applications Yet</h3>
        <p class="text-gray-600 mb-6">Start by creating your first permit application.</p>
        <NuxtLink
          to="/applications/new"
          class="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icon name="mdi:plus" class="w-5 h-5" />
          <span>New Application</span>
        </NuxtLink>
      </div>

      <!-- Applications Grid -->
      <div v-else-if="!pending && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ApplicationCard
          v-for="application in applications"
          :key="application.id"
          :application="application"
          @view="handleView"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { PermitApplication } from "../types";
import ApplicationCard from "../components/ApplicationCard.vue";
import { fetchApplications, deleteApplication } from "../services";

const { token } = useAuth();
const router = useRouter();

const {
  data: applications,
  pending,
  error: fetchError,
  refresh,
} = await useAsyncData<PermitApplication[]>(
  "applications",
  async () => {
    return await fetchApplications();
  },
  {
    // Watch token changes and refetch
    watch: [token],
  }
);

// Computed error message
const error = computed(() => {
  if (fetchError.value) {
    return fetchError.value.message || "Failed to load applications";
  }
  return null;
});

const handleView = (id: string) => {
  router.push(`/applications/${id}`);
};

const handleEdit = (id: string) => {
  router.push(`/applications/${id}/edit`);
};

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this application?")) {
    return;
  }

  try {
    await deleteApplication(id);
    // Refresh the list after deletion
    await refresh();
  } catch (err: any) {
    console.error("Error deleting application:", err);
    alert(err.message || "Failed to delete application");
  }
};
</script>
