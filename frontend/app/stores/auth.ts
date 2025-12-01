import { defineStore } from "pinia";
import type { User, LoginCredentials, RegisterCredentials } from "~/features/auth/types";
import type { ApiResponse } from "#shared/types/api.type";

const TOKEN_STORAGE_KEY = "auth_token";
const USER_STORAGE_KEY = "auth_user";

export const useAuthStore = defineStore("auth", () => {
  // State
  const token = ref<string | null>(null);
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);

  // Actions
  const initializeAuth = () => {
    if (import.meta.client) {
      // Load token and user from localStorage
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (storedToken && storedUser) {
        token.value = storedToken;
        try {
          user.value = JSON.parse(storedUser);
        } catch (e) {
          // If parsing fails, clear the storage
          clearAuth();
        }
      }
    }
  };

  const setAuth = (accessToken: string, userData: User) => {
    token.value = accessToken;
    user.value = userData;

    if (import.meta.client) {
      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    }
  };

  const clearAuth = () => {
    token.value = null;
    user.value = null;

    if (import.meta.client) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiResponse<any>>("/api/auth/login", {
        method: "POST",
        body: credentials,
      });

      if (response.success && response.data) {
        setAuth(response.data.accessToken, response.data.user);
        return response;
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (e: any) {
      const errorMessage = e.data?.message || e.message || "Login failed";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiResponse<any>>("/api/auth/register", {
        method: "POST",
        body: credentials,
      });

      if (response.success && response.data) {
        setAuth(response.data.accessToken, response.data.user);
        return response;
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (e: any) {
      const errorMessage = e.data?.message || e.message || "Registration failed";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    clearAuth();
    error.value = null;

    // Navigate to login page
    if (import.meta.client) {
      navigateTo("/auth/login");
    }
  };

  const fetchProfile = async () => {
    if (!token.value) {
      throw new Error("No authentication token");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiResponse<any>>("/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      if (response.success && response.data) {
        // Update user data (without accessToken as profile endpoint doesn't return it)
        user.value = {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
        };

        if (import.meta.client) {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user.value));
        }

        return response;
      } else {
        throw new Error(response.message || "Failed to fetch profile");
      }
    } catch (e: any) {
      const errorMessage = e.data?.message || e.message || "Failed to fetch profile";
      error.value = errorMessage;

      // If unauthorized, clear auth
      if (e.statusCode === 401) {
        clearAuth();
      }

      throw new Error(errorMessage);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    token,
    user,
    isLoading,
    error,

    // Getters
    isAuthenticated,

    // Actions
    initializeAuth,
    login,
    register,
    logout,
    fetchProfile,
    setAuth,
    clearAuth,
  };
});
