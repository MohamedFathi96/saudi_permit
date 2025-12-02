<template>
  <div class="min-h-screen bg-gray-50" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
        locale === 'ar' ? 'right-0' : 'left-0',
        isSidebarOpen
          ? 'translate-x-0'
          : locale === 'ar'
          ? 'translate-x-full lg:translate-x-0'
          : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Logo/Brand -->
      <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div :class="['flex items-center', locale === 'ar' ? 'space-x-reverse space-x-3 gap-2' : 'space-x-3']">
          <div class="w-8 h-8 bg-linear-to-br bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="mdi:file-document-outline" class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-800">{{ $t("layout.appName") }}</span>
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
          :key="item.key"
          :to="item.path"
          :class="[
            'flex items-center px-4 py-3 rounded-lg transition-all duration-200',
            locale === 'ar' ? 'space-x-reverse space-x-3 gap-2' : 'space-x-3 gap-2',
            isActive(item.path) ? 'bg-secondary text-white shadow-md' : 'text-gray-700 hover:bg-gray-100',
          ]"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          <span class="font-medium">{{ $t(item.label) }}</span>
        </NuxtLink>
      </nav>

      <!-- User Profile & Logout -->
      <div class="border-t border-gray-200 p-4">
        <div
          :class="[
            'flex items-center px-4 py-3 mb-2 rounded-lg bg-gray-50',
            locale === 'ar' ? 'space-x-reverse space-x-3 gap-2' : 'space-x-3 gap-2',
          ]"
        >
          <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
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
          :class="[
            'w-full flex items-center justify-center px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            locale === 'ar' ? 'space-x-reverse space-x-2 gap-2' : 'space-x-2 gap-2',
          ]"
        >
          <Icon
            :name="isLoggingOut ? 'mdi:loading' : 'mdi:logout'"
            :class="['w-5 h-5', isLoggingOut && 'animate-spin']"
          />
          <span class="font-medium">{{ $t(isLoggingOut ? "layout.loggingOut" : "layout.logout") }}</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div :class="locale === 'ar' ? 'lg:pr-64' : 'lg:pl-64'">
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

          <!-- Language Selector -->
          <div class="relative" ref="languageDropdownRef">
            <button
              @click="toggleLanguageDropdown"
              :class="[
                'flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors',
                locale === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2',
              ]"
            >
              <Icon name="mdi:translate" class="w-5 h-5 text-gray-600" />
              <span class="text-sm font-medium text-gray-700">{{ currentLocaleName }}</span>
              <Icon name="mdi:chevron-down" class="w-4 h-4 text-gray-600" />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isLanguageDropdownOpen"
              :class="[
                'absolute top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50',
                locale === 'ar' ? 'left-0' : 'right-0',
              ]"
            >
              <button
                v-for="loc in availableLocales"
                :key="loc.code"
                @click="changeLocale(loc.code)"
                :class="[
                  'w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors',
                  locale === loc.code ? 'bg-secondary text-white hover:bg-secondary' : 'text-gray-700',
                ]"
              >
                {{ loc.name }}
              </button>
            </div>
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
const { locale, locales, setLocale, t } = useI18n();

// Sidebar state
const isSidebarOpen = ref(false);
const isLoggingOut = ref(false);
const isLanguageDropdownOpen = ref(false);
const languageDropdownRef = ref<HTMLElement | null>(null);

// Navigation items
const navigationItems = [
  {
    key: "dashboard",
    label: "layout.nav.dashboard",
    path: "/",
    icon: "mdi:view-dashboard",
  },
  {
    key: "applications",
    label: "layout.nav.applications",
    path: "/applications",
    icon: "mdi:file-document-multiple",
  },
  {
    key: "newApplication",
    label: "layout.nav.newApplication",
    path: "/applications/new",
    icon: "mdi:file-document-plus",
  },
  {
    key: "profile",
    label: "layout.nav.profile",
    path: "/profile",
    icon: "mdi:account",
  },
  {
    key: "settings",
    label: "layout.nav.settings",
    path: "/settings",
    icon: "mdi:cog",
  },
];

// Computed properties
const userInitials = computed(() => {
  if (!user.value?.name) return "U";
  const names = user.value.name.split(" ");
  if (names.length >= 2) {
    const firstName = names[0];
    const lastName = names[1];
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
  }
  return user.value.name.slice(0, 2).toUpperCase();
});

const currentPageTitle = computed(() => {
  const currentItem = navigationItems.find((item) => item.path === route.path);
  return currentItem ? t(currentItem.label) : t("layout.nav.dashboard");
});

const availableLocales = computed(() => {
  return locales.value;
});

const currentLocaleName = computed(() => {
  const current = availableLocales.value.find((l) => l.code === locale.value);
  return current?.name || "English";
});

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const isActive = (path: string) => {
  return route.path === path;
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

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};

const changeLocale = async (code: string) => {
  await setLocale(code as "en" | "ar");
  isLanguageDropdownOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Node;
  if (languageDropdownRef.value && !languageDropdownRef.value.contains(target)) {
    isLanguageDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => route.path,
  () => {
    if (isSidebarOpen.value) {
      isSidebarOpen.value = false;
    }
  }
);
</script>
