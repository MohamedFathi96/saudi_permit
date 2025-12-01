<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
    <div class="p-6">
      <!-- Header with Status Badge -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ application.permit_type }}</h3>
          <p class="text-sm text-gray-500">
            {{ formatDate(application.submitted_at) }}
          </p>
        </div>
        <span :class="statusClasses" class="px-3 py-1 rounded-full text-xs font-medium">
          {{ application.application_status }}
        </span>
      </div>

      <!-- Application Details -->
      <div class="space-y-3">
        <div class="flex items-start space-x-2">
          <Icon name="mdi:account" class="w-5 h-5 text-gray-400 mt-0.5" />
          <div class="flex-1">
            <p class="text-sm text-gray-600">Applicant</p>
            <p class="text-sm font-medium text-gray-800">{{ application.applicant_name }}</p>
          </div>
        </div>

        <div class="flex items-start space-x-2">
          <Icon name="mdi:email" class="w-5 h-5 text-gray-400 mt-0.5" />
          <div class="flex-1">
            <p class="text-sm text-gray-600">Email</p>
            <p class="text-sm font-medium text-gray-800">{{ application.applicant_email }}</p>
          </div>
        </div>

        <div class="flex items-start space-x-2">
          <Icon name="mdi:identifier" class="w-5 h-5 text-gray-400 mt-0.5" />
          <div class="flex-1">
            <p class="text-sm text-gray-600">Application ID</p>
            <p class="text-sm font-mono text-gray-800">{{ truncateId(application.id) }}</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-end space-x-2 mt-6 pt-4 border-t border-gray-100">
        <button
          @click="$emit('edit', application.id)"
          class="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ml-auto"
        >
          <Icon name="mdi:pencil" class="w-4 h-4" />
        </button>
        <button
          @click="$emit('delete', application.id)"
          class="inline-flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Icon name="mdi:delete" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PermitApplication } from "../types";
import { ApplicationStatus } from "../types";

interface Props {
  application: PermitApplication;
}

interface Emits {
  (e: "view", id: string): void;
  (e: "edit", id: string): void;
  (e: "delete", id: string): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const statusVariants = {
  [ApplicationStatus.Pending]: "bg-yellow-100 text-yellow-800",
  [ApplicationStatus.Approved]: "bg-green-100 text-green-800",
  [ApplicationStatus.Rejected]: "bg-red-100 text-red-800",
};

const statusClasses = computed(() => {
  return statusVariants[props.application.application_status as ApplicationStatus] || "bg-gray-100 text-gray-800";
});

const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const truncateId = (id: string): string => {
  if (id.length <= 12) return id;
  return `${id.substring(0, 8)}...${id.substring(id.length - 4)}`;
};
</script>
