<template>
  <NuxtLayout name="dashboard-layout">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button
          :class="[
            'inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors',
            locale === 'ar' ? 'flex-row-reverse' : ''
          ]"
          @click="router.back()"
        >
          <Icon :name="locale === 'ar' ? 'mdi:arrow-right' : 'mdi:arrow-left'" :class="locale === 'ar' ? 'w-5 h-5 ml-2' : 'w-5 h-5 mr-2'" />
          {{ $t('newApplication.back') }}
        </button>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ $t('newApplication.title') }}</h1>
        <p class="text-gray-600">{{ $t('newApplication.description') }}</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <ApplicationForm ref="formRef" mode="create" @submit="handleSubmit" @cancel="handleCancel" />
      </div>

      <!-- Information Card -->
      <div class="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div :class="['flex items-start', locale === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3']">
          <Icon name="mdi:information" class="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="text-sm font-semibold text-blue-900 mb-2">{{ $t('newApplication.importantInfo') }}</h3>
            <ul :class="['text-sm text-blue-800 space-y-1 list-disc', locale === 'ar' ? 'list-inside pr-4' : 'list-inside']">
              <li>{{ $t('newApplication.infoItems.allFieldsRequired') }}</li>
              <li>{{ $t('newApplication.infoItems.reviewProcess') }}</li>
              <li>{{ $t('newApplication.infoItems.emailNotification') }}</li>
              <li>{{ $t('newApplication.infoItems.processingTime') }}</li>
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
const { locale, t } = useI18n();
const formRef = ref<InstanceType<typeof ApplicationForm> | null>(null);

const handleSubmit = async (data: ApplicationFormData) => {
  try {
    await createApplication(data);

    // Show success message
    formRef.value?.setSuccess(t('newApplication.successMessage'));

    // Redirect to applications list after a short delay
    setTimeout(() => {
      router.push("/applications");
    }, 1500);
  } catch (error: any) {
    formRef.value?.setError(error.message || t('newApplication.errorMessage'));
  }
};

const handleCancel = () => {
  router.push("/applications");
};
</script>
