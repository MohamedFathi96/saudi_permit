<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Logo/Brand -->
      <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Icon name="mdi:file-document-outline" class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-800">Saudi Permit</span>
        </div>
        <!-- Mobile close button -->
        <button @click="toggleSidebar" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Icon name="mdi:close" class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.path"
          :class="[
            'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
            isActive(item.path)
              ? 'bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100',
          ]"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          <span class="font-medium">{{ item.name }}</span>
        </NuxtLink>
      </nav>

      <!-- User Profile & Logout -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg bg-gray-50">
          <div
            class="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center"
          >
            <span class="text-white font-semibold text-sm">
              {{ userInitials }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ user?.name || "User" }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ user?.email }}
            </p>
          </div>
        </div>

        <button
          @click="handleLogout"
          :disabled="isLoggingOut"
          class="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon
            :name="isLoggingOut ? 'mdi:loading' : 'mdi:logout'"
            :class="['w-5 h-5', isLoggingOut && 'animate-spin']"
          />
          <span class="font-medium">{{ isLoggingOut ? "Logging out..." : "Logout" }}</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="lg:pl-64">
      <!-- Top Header -->
      <header class="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <!-- Mobile menu button -->
          <button @click="toggleSidebar" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Icon name="mdi:menu" class="w-6 h-6 text-gray-600" />
          </button>

          <!-- Page Title -->
          <h1 class="text-lg sm:text-xl font-semibold text-gray-800">
            {{ currentPageTitle }}
          </h1>

          <!-- Header Actions -->
          <div class="flex items-center space-x-3">
            <!-- Notifications -->
            <button class="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Icon name="mdi:bell-outline" class="w-6 h-6 text-gray-600" />
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- Settings -->
            <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Icon name="mdi:cog-outline" class="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity"
    ></div>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth();
const route = useRoute();

// Sidebar state
const isSidebarOpen = ref(false);
const isLoggingOut = ref(false);

// Navigation items
const navigationItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: "mdi:view-dashboard",
  },
  {
    name: "Applications",
    path: "/applications",
    icon: "mdi:file-document-multiple",
  },
  {
    name: "New Application",
    path: "/applications/new",
    icon: "mdi:file-document-plus",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "mdi:account",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "mdi:cog",
  },
];

// Computed properties
const userInitials = computed(() => {
  if (!user.value?.name) return "U";
  const names = user.value.name.split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return user.value.name.slice(0, 2).toUpperCase();
});

const currentPageTitle = computed(() => {
  const currentItem = navigationItems.find((item) => item.path === route.path);
  return currentItem?.name || "Dashboard";
});

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const isActive = (path: string) => {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
};

const handleLogout = async () => {
  if (isLoggingOut.value) return;

  isLoggingOut.value = true;
  try {
    await logout();
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    isLoggingOut.value = false;
  }
};

watch(
  () => route.path,
  () => {
    if (isSidebarOpen.value) {
      isSidebarOpen.value = false;
    }
  }
);
</script>
