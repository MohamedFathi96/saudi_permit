<template>
  <NuxtLayout name="dashboard-layout">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button
          class="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          @click="router.back()"
        >
          <Icon name="mdi:arrow-left" class="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Edit Permit Application</h1>
        <p class="text-gray-600">Update your permit application details</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div class="animate-pulse space-y-6">
          <div class="h-4 bg-gray-200 rounded w-3/4" />
          <div class="h-10 bg-gray-200 rounded" />
          <div class="h-4 bg-gray-200 rounded w-3/4" />
          <div class="h-10 bg-gray-200 rounded" />
          <div class="h-4 bg-gray-200 rounded w-3/4" />
          <div class="h-10 bg-gray-200 rounded" />
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6">
        <Icon name="mdi:alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 class="text-lg font-semibold text-red-800 text-center mb-2">Failed to Load Application</h3>
        <p class="text-red-600 text-center mb-4">{{ error }}</p>
        <div class="flex justify-center">
          <button
            class="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            @click="loadApplication"
          >
            <Icon name="mdi:refresh" class="w-5 h-5" />
            <span>Retry</span>
          </button>
        </div>
      </div>

      <!-- Form Card -->
      <div v-else-if="application" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <!-- Status Badge -->
        <div class="mb-6 flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <p class="text-sm text-gray-600">Application Status</p>
            <span
              :class="statusClasses"
              class="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium"
            >
              {{ application.application_status }}
            </span>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">Submitted</p>
            <p class="text-sm font-medium text-gray-800 mt-1">{{ formatDate(application.submitted_at) }}</p>
          </div>
        </div>

        <ApplicationForm
          ref="formRef"
          mode="edit"
          :initial-data="application"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>

      <!-- Information Card -->
      <div class="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div class="flex items-start space-x-3">
          <Icon name="mdi:alert" class="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="text-sm font-semibold text-amber-900 mb-2">Note</h3>
            <p class="text-sm text-amber-800">
              You can only edit applications that are in "Pending" status. Once approved or rejected, applications cannot be modified.
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import ApplicationForm from "../components/ApplicationForm.vue";
import { fetchApplicationById, updateApplication } from "../services";
import type { ApplicationFormData } from "../schemas";
import { ApplicationStatus } from "../types";

const { token } = useAuth();
const router = useRouter();
const route = useRoute();
const formRef = ref<InstanceType<typeof ApplicationForm> | null>(null);

const application = ref(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const applicationId = computed(() => route.params.id as string);

const statusVariants = {
  [ApplicationStatus.Pending]: "bg-yellow-100 text-yellow-800",
  [ApplicationStatus.Approved]: "bg-green-100 text-green-800",
  [ApplicationStatus.Rejected]: "bg-red-100 text-red-800",
};

const statusClasses = computed(() => {
  if (!application.value) return "bg-gray-100 text-gray-800";
  return statusVariants[application.value.application_status as ApplicationStatus] || "bg-gray-100 text-gray-800";
});

const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const loadApplication = async () => {
  if (!token.value || !applicationId.value) {
    error.value = "Invalid request";
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    application.value = await fetchApplicationById(applicationId.value, token.value);
  } catch (e: any) {
    error.value = e.message || "Failed to load application";
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async (data: ApplicationFormData) => {
  if (!token.value || !applicationId.value) {
    formRef.value?.setError("Invalid request");
    return;
  }

  try {
    await updateApplication(applicationId.value, data, token.value);
    
    // Show success message
    formRef.value?.setSuccess("Application updated successfully! Redirecting...");
    
    // Redirect to applications list after a short delay
    setTimeout(() => {
      router.push("/applications");
    }, 1500);
  } catch (error: any) {
    formRef.value?.setError(error.message || "Failed to update application");
  }
};

const handleCancel = () => {
  router.push("/applications");
};

// Load application on mount
onMounted(() => {
  loadApplication();
});
</script>

