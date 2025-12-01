import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of items',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;
}

export class ApiError {
  @ApiProperty({
    description: 'Error code',
    example: 'AUTH_ERROR',
    required: false,
  })
  code?: string;

  @ApiProperty({
    description: 'Additional error details',
    required: false,
  })
  details?: unknown;
}

export class ApiMeta {
  @ApiProperty({
    description: 'Pagination information',
    type: PaginationMeta,
    required: false,
  })
  pagination?: PaginationMeta;

  [key: string]: unknown;
}

export class ApiResponse<T = unknown> {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response data',
    nullable: true,
  })
  data: T | null;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Error information (only present on failure)',
    type: ApiError,
    required: false,
  })
  error?: ApiError;

  @ApiProperty({
    description: 'HTTP status code',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Additional metadata',
    type: ApiMeta,
    required: false,
  })
  meta?: ApiMeta;
}

export type SuccessResponse<T = any> = ApiResponse<T> & {
  success: true;
  data: T;
};

export type ErrorResponse = ApiResponse<null> & {
  success: false;
  data: null;
  error: ApiError;
};

export class ApiResponseHelper {
  static success<T>(
    data: T,
    message: string = 'Operation completed successfully',
    statusCode: number = 200,
    meta?: Record<string, unknown>,
  ): SuccessResponse<T> {
    return {
      success: true,
      data,
      message,
      statusCode,
      meta,
    };
  }

  static error(
    message: string,
    statusCode: number = 500,
    errorCode?: string,
    errorDetails?: unknown,
    meta?: Record<string, unknown>,
  ): ErrorResponse {
    return {
      success: false,
      data: null,
      message,
      error: {
        code: errorCode,
        details: errorDetails,
      },
      statusCode,
      meta,
    };
  }

  static paginated<T>(
    data: T,
    pagination: PaginationMeta,
    message: string = 'Data retrieved successfully',
    statusCode: number = 200,
  ): SuccessResponse<T> {
    return {
      success: true,
      data,
      message,
      statusCode,
      meta: {
        pagination,
      },
    };
  }
}
