export const useAuth = () => {
  const authStore = useAuthStore();

  return {
    // State
    user: computed(() => authStore.user),
    token: computed(() => authStore.token),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isLoading: computed(() => authStore.isLoading),
    error: computed(() => authStore.error),

    // Actions
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    fetchProfile: authStore.fetchProfile,
  };
};
