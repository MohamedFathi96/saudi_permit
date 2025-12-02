import { apiClient } from "~/libs/axios";
import type { ApiResponse } from "#shared/types/api.type";
import type {
  PermitApplication,
  CreatePermitApplicationDto,
  UpdatePermitApplicationDto,
  UpdateApplicationStatusDto,
} from "./types";

export const fetchApplications = async (): Promise<PermitApplication[]> => {
  const response = await apiClient.get<ApiResponse<PermitApplication[]>>("/permit-applications");

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to fetch applications");
};

export const fetchApplicationById = async (id: string): Promise<PermitApplication> => {
  const response = await apiClient.get<ApiResponse<PermitApplication>>(`/permit-applications/${id}`);

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to fetch application");
};

export const createApplication = async (data: CreatePermitApplicationDto): Promise<PermitApplication> => {
  const response = await apiClient.post<ApiResponse<PermitApplication>>("/permit-applications", data);

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to create application");
};

export const updateApplication = async (id: string, data: UpdatePermitApplicationDto): Promise<PermitApplication> => {
  const response = await apiClient.patch<ApiResponse<PermitApplication>>(`/permit-applications/${id}`, data);

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to update application");
};

export const updateApplicationStatus = async (
  id: string,
  data: UpdateApplicationStatusDto
): Promise<PermitApplication> => {
  const response = await apiClient.patch<ApiResponse<PermitApplication>>(`/permit-applications/${id}/status`, data);

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.message || "Failed to update application status");
};

export const deleteApplication = async (id: string): Promise<void> => {
  const response = await apiClient.delete<ApiResponse<void>>(`/permit-applications/${id}`);

  if (!response.success) {
    throw new Error(response.message || "Failed to delete application");
  }
};
