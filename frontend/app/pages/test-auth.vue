<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">
          Authentication Test Page
        </h1>

        <!-- Auth Status -->
        <div class="mb-8 p-4 rounded-lg" :class="isAuthenticated ? 'bg-green-50' : 'bg-yellow-50'">
          <h2 class="text-lg font-semibold mb-2" :class="isAuthenticated ? 'text-green-800' : 'text-yellow-800'">
            Status: {{ isAuthenticated ? "Authenticated ✅" : "Not Authenticated ⚠️" }}
          </h2>
        </div>

        <!-- User Info -->
        <div v-if="isAuthenticated" class="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 class="text-lg font-semibold text-blue-800 mb-3">Current User</h2>
          <div class="space-y-2">
            <p><strong>ID:</strong> {{ user?.id }}</p>
            <p><strong>Email:</strong> {{ user?.email }}</p>
            <p><strong>Name:</strong> {{ user?.name || "Not provided" }}</p>
            <p><strong>Role:</strong> {{ user?.role }}</p>
          </div>
        </div>

        <!-- Token Info -->
        <div v-if="token" class="mb-8 p-4 bg-purple-50 rounded-lg">
          <h2 class="text-lg font-semibold text-purple-800 mb-3">Token</h2>
          <p class="text-sm font-mono break-all">{{ token.substring(0, 50) }}...</p>
        </div>

        <!-- Actions -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-800 mb-3">Actions</h2>
          
          <div v-if="!isAuthenticated" class="space-y-3">
            <NuxtLink
              to="/auth/login"
              class="block w-full text-center py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Login
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="block w-full text-center py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Go to Register
            </NuxtLink>
          </div>

          <div v-else class="space-y-3">
            <button
              @click="handleFetchProfile"
              :disabled="isLoading"
              class="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {{ isLoading ? "Loading..." : "Refresh Profile" }}
            </button>
            <button
              @click="handleLogout"
              class="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          <NuxtLink
            to="/"
            class="block w-full text-center py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Go to Home
          </NuxtLink>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 class="text-red-800 font-semibold mb-2">Error:</h3>
          <p class="text-red-700">{{ error }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-700">{{ successMessage }}</p>
        </div>
      </div>

      <!-- Documentation Links -->
      <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Documentation</h2>
        <div class="space-y-2 text-sm">
          <p>📋 <strong>Quick Reference:</strong> <code class="bg-gray-100 px-2 py-1 rounded">AUTH_QUICK_REFERENCE.md</code></p>
          <p>💡 <strong>Usage Examples:</strong> <code class="bg-gray-100 px-2 py-1 rounded">USAGE_EXAMPLES.md</code></p>
          <p>📖 <strong>Complete Setup:</strong> <code class="bg-gray-100 px-2 py-1 rounded">AUTH_SETUP.md</code></p>
          <p>🚀 <strong>Getting Started:</strong> <code class="bg-gray-100 px-2 py-1 rounded">GETTING_STARTED.md</code></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, token, isAuthenticated, isLoading, error, logout, fetchProfile } = useAuth();

const successMessage = ref<string | null>(null);

const handleLogout = () => {
  logout();
  successMessage.value = "Logged out successfully!";
};

const handleFetchProfile = async () => {
  try {
    await fetchProfile();
    successMessage.value = "Profile refreshed successfully!";
    setTimeout(() => {
      successMessage.value = null;
    }, 3000);
  } catch (err) {
    // Error is already in error ref
  }
};

// Clear success message on mount
onMounted(() => {
  successMessage.value = null;
});
</script>

