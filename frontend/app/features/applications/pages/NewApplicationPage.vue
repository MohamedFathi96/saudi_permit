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
        <h1 class="text-3xl font-bold text-gray-800 mb-2">New Permit Application</h1>
        <p class="text-gray-600">Fill out the form below to submit a new permit application</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <ApplicationForm
          ref="formRef"
          mode="create"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>

      <!-- Information Card -->
      <div class="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div class="flex items-start space-x-3">
          <Icon name="mdi:information" class="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="text-sm font-semibold text-blue-900 mb-2">Important Information</h3>
            <ul class="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>All fields are required to submit an application</li>
              <li>Your application will be reviewed by our team</li>
              <li>You'll receive an email notification once the review is complete</li>
              <li>Processing time typically takes 3-5 business days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import ApplicationForm from "../components/ApplicationForm.vue";
import { createApplication } from "../services";
import type { ApplicationFormData } from "../schemas";

const { token } = useAuth();
const router = useRouter();
const formRef = ref<InstanceType<typeof ApplicationForm> | null>(null);

const handleSubmit = async (data: ApplicationFormData) => {
  if (!token.value) {
    formRef.value?.setError("You must be logged in to create an application");
    return;
  }

  try {
    await createApplication(data, token.value);
    
    // Show success message
    formRef.value?.setSuccess("Application created successfully! Redirecting...");
    
    // Redirect to applications list after a short delay
    setTimeout(() => {
      router.push("/applications");
    }, 1500);
  } catch (error: any) {
    formRef.value?.setError(error.message || "Failed to create application");
  }
};

const handleCancel = () => {
  router.push("/applications");
};
</script>

