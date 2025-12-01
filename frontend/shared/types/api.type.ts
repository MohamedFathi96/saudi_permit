import type { Ref } from "vue";

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  data: T | null;
  message: string;
  error?: {
    code?: string;
    details?: unknown;
  };
  statusCode: number;
};

export type PaginatedApiResponse<T = unknown> = ApiResponse<T[]> & {
  meta: {
    pagination: PaginationMeta;
  };
};

export type PaginatedQueryParams = {
  page?: Ref<number> | number;
  limit?: Ref<number> | number;
  search?: Ref<string | null> | string | null;
};
