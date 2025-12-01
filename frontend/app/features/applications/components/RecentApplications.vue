<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">Recent Applications</h3>
      <p class="text-sm text-gray-600 mt-1">Your latest permit applications</p>
    </div>
    <div class="p-6">
      <div class="text-center py-8 text-gray-500">
        <Icon name="mdi:file-document-outline" class="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No applications yet. Start by creating a new application.</p>
        <NuxtLink
          to="/applications/new"
          class="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icon name="mdi:plus" class="w-5 h-5" />
          <span>New Application</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// In the future, this component can accept applications as props
// and display them in a list/table format
</script>

