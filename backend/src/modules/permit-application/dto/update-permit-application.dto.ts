import {
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '@prisma/client';

export class UpdatePermitApplicationDto {
  @ApiProperty({
    description: 'Name of the applicant',
    example: 'John Doe',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  applicant_name?: string;

  @ApiProperty({
    description: 'Email address of the applicant',
    example: 'john.doe@example.com',
    required: false,
    type: String,
  })
  @IsEmail()
  @IsOptional()
  applicant_email?: string;

  @ApiProperty({
    description: 'Type of permit being requested',
    example: 'Work Permit',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  permit_type?: string;
}

export class UpdateApplicationStatusDto {
  @ApiProperty({
    description: 'Status of the permit application',
    example: ApplicationStatus.Approved,
    enum: ApplicationStatus,
  })
  @IsEnum(ApplicationStatus)
  @IsNotEmpty()
  application_status: ApplicationStatus;
}

