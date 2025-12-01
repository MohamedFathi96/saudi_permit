import type { ApiResponse } from "#shared/types/api.type";
import type { PermitApplication, UpdateApplicationStatusDto } from "~/features/applications/types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authHeader = getRequestHeader(event, "authorization");
  const id = getRouterParam(event, "id");
  const body = await readBody<UpdateApplicationStatusDto>(event);

  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authorization header is required",
    });
  }

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Application ID is required",
    });
  }

  try {
    const response = await $fetch<ApiResponse<PermitApplication>>(
      `/permit-applications/${id}/status`,
      {
        baseURL: config.public.backendUrl || "http://localhost:3001",
        method: "PATCH",
        headers: {
          Authorization: authHeader,
        },
        body,
      }
    );

    return response;
  } catch (error: any) {
    // Handle error responses from backend
    if (error.response?._data) {
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data.message || "Failed to update application status",
        data: error.response._data,
      });
    }

    // Handle network or other errors
    throw createError({
      statusCode: 500,
      statusMessage: "An unexpected error occurred while updating application status",
    });
  }
});

