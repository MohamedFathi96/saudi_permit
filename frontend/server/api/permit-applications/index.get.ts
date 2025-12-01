import type { ApiResponse } from "#shared/types/api.type";
import type { PermitApplication } from "~/features/applications/types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authHeader = getRequestHeader(event, "authorization");

  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authorization header is required",
    });
  }

  try {
    const response = await $fetch<ApiResponse<PermitApplication[]>>("/permit-applications", {
      baseURL: config.public.backendUrl || "http://localhost:3001",
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });

    return response;
  } catch (error: any) {
    // Handle error responses from backend
    if (error.response?._data) {
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data.message || "Failed to fetch applications",
        data: error.response._data,
      });
    }

    // Handle network or other errors
    throw createError({
      statusCode: 500,
      statusMessage: "An unexpected error occurred while fetching applications",
    });
  }
});

