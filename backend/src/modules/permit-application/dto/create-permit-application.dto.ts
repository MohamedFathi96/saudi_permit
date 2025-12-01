import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermitApplicationDto {
  @ApiProperty({
    description: 'Name of the applicant',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  applicant_name: string;

  @ApiProperty({
    description: 'Email address of the applicant',
    example: 'john.doe@example.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  applicant_email: string;

  @ApiProperty({
    description: 'Type of permit being requested',
    example: 'Work Permit',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  permit_type: string;
}
