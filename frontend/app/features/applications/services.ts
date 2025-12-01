/**
 * Application services - Simplified to use Nuxt API routes
 * The Nuxt server routes handle communication with the backend
 */

import type { ApiResponse } from "#shared/types/api.type";
import type {
  PermitApplication,
  CreatePermitApplicationDto,
  UpdatePermitApplicationDto,
  UpdateApplicationStatusDto,
} from "./types";

/**
 * Fetch all permit applications
 * Users see only their own applications, admins see all
 */
export const fetchApplications = async (token: string): Promise<PermitApplication[]> => {
  const response = await $fetch<ApiResponse<PermitApplication[]>>("/api/permit-applications", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to fetch applications");
};

/**
 * Fetch a single permit application by ID
 */
export const fetchApplicationById = async (id: string, token: string): Promise<PermitApplication> => {
  const response = await $fetch<ApiResponse<PermitApplication>>(`/api/permit-applications/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to fetch application");
};

/**
 * Create a new permit application
 */
export const createApplication = async (
  data: CreatePermitApplicationDto,
  token: string
): Promise<PermitApplication> => {
  const response = await $fetch<ApiResponse<PermitApplication>>("/api/permit-applications", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to create application");
};

/**
 * Update an existing permit application
 */
export const updateApplication = async (
  id: string,
  data: UpdatePermitApplicationDto,
  token: string
): Promise<PermitApplication> => {
  const response = await $fetch<ApiResponse<PermitApplication>>(`/api/permit-applications/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to update application");
};

/**
 * Update application status (Admin only)
 */
export const updateApplicationStatus = async (
  id: string,
  data: UpdateApplicationStatusDto,
  token: string
): Promise<PermitApplication> => {
  const response = await $fetch<ApiResponse<PermitApplication>>(`/api/permit-applications/${id}/status`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to update application status");
};

/**
 * Delete a permit application
 */
export const deleteApplication = async (id: string, token: string): Promise<void> => {
  const response = await $fetch<ApiResponse<void>>(`/api/permit-applications/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to delete application");
  }
};
