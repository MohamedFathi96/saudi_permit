<template>
  <form class="space-y-6" @submit="onSubmit">
    <!-- Error Message -->
    <div v-if="formError" class="p-4 text-sm text-red-800 bg-red-50 rounded-lg border border-red-200">
      {{ formError }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="p-4 text-sm text-green-800 bg-green-50 rounded-lg border border-green-200">
      {{ successMessage }}
    </div>

    <!-- Applicant Name -->
    <div>
      <UiInput
        v-model="applicant_name"
        label="Applicant Name"
        type="text"
        placeholder="Enter full name"
        :error="errors.applicant_name"
        required
      />
    </div>

    <!-- Applicant Email -->
    <div>
      <UiInput
        v-model="applicant_email"
        label="Applicant Email"
        type="email"
        placeholder="Enter email address"
        :error="errors.applicant_email"
        required
      />
    </div>

    <!-- Permit Type -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Permit Type <span class="text-red-500">*</span>
      </label>
      <select
        v-model="permit_type"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        :class="{ 'border-red-500': errors.permit_type }"
      >
        <option value="" disabled>Select permit type</option>
        <option value="Work Permit">Work Permit</option>
        <option value="Residence Permit">Residence Permit</option>
        <option value="Business Permit">Business Permit</option>
        <option value="Visit Permit">Visit Permit</option>
        <option value="Student Permit">Student Permit</option>
        <option value="Transit Permit">Transit Permit</option>
      </select>
      <p v-if="errors.permit_type" class="mt-1 text-sm text-red-600">
        {{ errors.permit_type }}
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center gap-4 pt-4">
      <UiButton type="submit" variant="secondary" size="lg" class="flex-1" :disabled="isSubmitting">
        <Icon v-if="isSubmitting" name="mdi:loading" class="w-5 h-5 mr-2 animate-spin" />
        {{ isSubmitting ? submitLoadingText : submitText }}
      </UiButton>
      <UiButton
        type="button"
        variant="outline"
        size="lg"
        class="flex-1"
        :disabled="isSubmitting"
        @click="handleCancel"
      >
        Cancel
      </UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { applicationSchema } from "../schemas";
import type { ApplicationFormData } from "../schemas";
import type { PermitApplication } from "../types";

interface Props {
  initialData?: PermitApplication | null;
  mode?: "create" | "edit";
}

interface Emits {
  (e: "submit", data: ApplicationFormData): void;
  (e: "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: null,
  mode: "create",
});

const emit = defineEmits<Emits>();

// Form setup
const { defineField, handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(applicationSchema),
  initialValues: {
    applicant_name: props.initialData?.applicant_name || "",
    applicant_email: props.initialData?.applicant_email || "",
    permit_type: props.initialData?.permit_type || "",
  },
  validateOnMount: false,
});

const [applicant_name] = defineField("applicant_name");
const [applicant_email] = defineField("applicant_email");
const [permit_type] = defineField("permit_type");

const formError = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const submitText = computed(() => (props.mode === "create" ? "Create Application" : "Update Application"));
const submitLoadingText = computed(() => (props.mode === "create" ? "Creating..." : "Updating..."));

const onSubmit = handleSubmit(async (values: ApplicationFormData) => {
  formError.value = null;
  successMessage.value = null;

  try {
    emit("submit", values);
  } catch (error: any) {
    formError.value = error.message || "An error occurred";
  }
});

const handleCancel = () => {
  emit("cancel");
};

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      resetForm({
        values: {
          applicant_name: newData.applicant_name,
          applicant_email: newData.applicant_email,
          permit_type: newData.permit_type,
        },
      });
    }
  }
);

// Expose methods for parent component
defineExpose({
  setError: (message: string) => {
    formError.value = message;
  },
  setSuccess: (message: string) => {
    successMessage.value = message;
  },
  reset: () => {
    resetForm();
    formError.value = null;
    successMessage.value = null;
  },
});
</script>

