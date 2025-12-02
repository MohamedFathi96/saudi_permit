<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">{{ $t('dashboard.recentApplications') }}</h3>
      <p class="text-sm text-gray-600 mt-1">Your latest permit applications</p>
    </div>
    <div class="p-6">
      <div class="text-center py-8 text-gray-500">
        <Icon name="mdi:file-document-outline" class="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No applications yet. Start by creating a new application.</p>
        <NuxtLink
          to="/applications/new"
          :class="[
            'inline-flex items-center mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors',
            locale === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'
          ]"
        >
          <Icon name="mdi:plus" class="w-5 h-5" />
          <span>{{ $t('layout.nav.newApplication') }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
// In the future, this component can accept applications as props
// and display them in a list/table format
</script>
