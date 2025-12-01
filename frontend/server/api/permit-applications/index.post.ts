import type { ApiResponse } from "#shared/types/api.type";
import type { PermitApplication, CreatePermitApplicationDto } from "~/features/applications/types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authHeader = getRequestHeader(event, "authorization");
  const body = await readBody<CreatePermitApplicationDto>(event);

  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authorization header is required",
    });
  }

  try {
    const response = await $fetch<ApiResponse<PermitApplication>>("/permit-applications", {
      baseURL: config.public.backendUrl || "http://localhost:3001",
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
      body,
    });

    return response;
  } catch (error: any) {
    // Handle error responses from backend
    if (error.response?._data) {
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data.message || "Failed to create application",
        data: error.response._data,
      });
    }

    // Handle network or other errors
    throw createError({
      statusCode: 500,
      statusMessage: "An unexpected error occurred while creating application",
    });
  }
});

