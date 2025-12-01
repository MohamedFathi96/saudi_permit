export enum ApplicationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface PermitApplication {
  id: string;
  applicant_name: string;
  applicant_email: string;
  permit_type: string;
  application_status: ApplicationStatus;
  submitted_at: string | Date;
  userId: string | null;
}

export interface CreatePermitApplicationDto {
  applicant_name: string;
  applicant_email: string;
  permit_type: string;
}

export interface UpdatePermitApplicationDto {
  applicant_name?: string;
  applicant_email?: string;
  permit_type?: string;
}

export interface UpdateApplicationStatusDto {
  application_status: ApplicationStatus;
}

export interface ApplicationStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}
