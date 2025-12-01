import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '@prisma/client';

export class PermitApplicationResponse {
  @ApiProperty({
    description: 'Unique identifier of the permit application',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the applicant',
    example: 'John Doe',
  })
  applicant_name: string;

  @ApiProperty({
    description: 'Email address of the applicant',
    example: 'john.doe@example.com',
  })
  applicant_email: string;

  @ApiProperty({
    description: 'Type of permit being requested',
    example: 'Work Permit',
  })
  permit_type: string;

  @ApiProperty({
    description: 'Status of the permit application',
    example: ApplicationStatus.Pending,
    enum: ApplicationStatus,
  })
  application_status: ApplicationStatus;

  @ApiProperty({
    description: 'Date and time when the application was submitted',
    example: '2025-12-01T10:00:00.000Z',
  })
  submitted_at: Date;

  @ApiProperty({
    description: 'User ID if the application is linked to a user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  userId: string | null;
}

