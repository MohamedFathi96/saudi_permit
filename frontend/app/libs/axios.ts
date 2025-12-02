import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

class ApiClient {
  private axiosInstance: AxiosInstance;
  private tokenGetter: (() => string | null) | null = null;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  setTokenGetter(getter: () => string | null) {
    this.tokenGetter = getter;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.tokenGetter) {
          const token = this.tokenGetter();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (import.meta.client) {
                const authStore = useAuthStore();
                authStore.logout();
                navigateTo("/auth/login");
              }
              break;
            case 403:
              console.error("Forbidden: You don't have permission to access this resource");
              break;
            case 404:
              console.error("Not found: The requested resource was not found");
              break;
            case 500:
              console.error("Server error: Something went wrong on the server");
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

let apiClientInstance: ApiClient | null = null;

export const useApiClient = (): ApiClient => {
  if (!apiClientInstance) {
    const config = useRuntimeConfig();
    apiClientInstance = new ApiClient(config.public.backendUrl as string);

    apiClientInstance.setTokenGetter(() => {
      const authStore = useAuthStore();
      return authStore.token;
    });
  }

  return apiClientInstance;
};

export const apiClient = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return useApiClient().get<T>(url, config);
  },
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return useApiClient().post<T>(url, data, config);
  },
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return useApiClient().put<T>(url, data, config);
  },
  patch: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return useApiClient().patch<T>(url, data, config);
  },
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return useApiClient().delete<T>(url, config);
  },
};
