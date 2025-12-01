import type { ApiResponse } from "#shared/types/api.type";
import type { AuthResponse, LoginCredentials } from "~/features/auth/types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<LoginCredentials>(event);

  try {
    const response = await $fetch<ApiResponse<AuthResponse>>("/auth/login", {
      baseURL: config.public.backendUrl || "http://localhost:3001",
      method: "POST",
      body,
    });

    return response;
  } catch (error: any) {
    // Handle error responses from backend
    if (error.response?._data) {
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data.message || "Login failed",
        data: error.response._data,
      });
    }

    // Handle network or other errors
    throw createError({
      statusCode: 500,
      statusMessage: "An unexpected error occurred during login",
    });
  }
});
