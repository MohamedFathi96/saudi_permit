import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreatePermitApplicationDto } from './dto/create-permit-application.dto';
import {
  UpdatePermitApplicationDto,
  UpdateApplicationStatusDto,
} from './dto/update-permit-application.dto';
import { PermitApplicationResponse } from './dto/permit-application-response.dto';
import {
  ApiResponseHelper,
  SuccessResponse,
} from '@/common/dto/responceHelper';
import { Role, User } from '@prisma/client';

@Injectable()
export class PermitApplicationService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createDto: CreatePermitApplicationDto,
    userId: string,
  ): Promise<SuccessResponse<PermitApplicationResponse>> {
    const application = await this.prismaService.permitApplication.create({
      data: {
        applicant_name: createDto.applicant_name,
        applicant_email: createDto.applicant_email,
        permit_type: createDto.permit_type,
        userId,
      },
    });

    return ApiResponseHelper.success(
      application,
      'Permit application created successfully',
      201,
    );
  }

  async findAll(
    user: User,
  ): Promise<SuccessResponse<PermitApplicationResponse[]>> {
    const whereClause = user.role === Role.ADMIN ? {} : { userId: user.id };

    const applications = await this.prismaService.permitApplication.findMany({
      where: whereClause,
      orderBy: {
        submitted_at: 'desc',
      },
    });

    return ApiResponseHelper.success(
      applications as PermitApplicationResponse[],
      'Permit applications retrieved successfully',
    );
  }

  async findOne(
    id: string,
    user: User,
  ): Promise<SuccessResponse<PermitApplicationResponse>> {
    const application = await this.prismaService.permitApplication.findUnique({
      where: { id },
    });

    if (!application)
      throw new NotFoundException('Permit application not found');

    this.checkApplicationPermission(user, application, 'view');

    return ApiResponseHelper.success(
      application as PermitApplicationResponse,
      'Permit application retrieved successfully',
    );
  }

  async update(
    id: string,
    updateDto: UpdatePermitApplicationDto,
    user: User,
  ): Promise<SuccessResponse<PermitApplicationResponse>> {
    const existingApplication =
      await this.prismaService.permitApplication.findUnique({
        where: { id },
      });

    if (!existingApplication)
      throw new NotFoundException('Permit application not found');

    this.checkApplicationPermission(user, existingApplication, 'update');

    const updatedApplication =
      await this.prismaService.permitApplication.update({
        where: { id },
        data: updateDto,
      });

    return ApiResponseHelper.success(
      updatedApplication as PermitApplicationResponse,
      'Permit application updated successfully',
    );
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateApplicationStatusDto,
  ): Promise<SuccessResponse<PermitApplicationResponse>> {
    const existingApplication =
      await this.prismaService.permitApplication.findUnique({
        where: { id },
      });

    if (!existingApplication) {
      throw new NotFoundException('Permit application not found');
    }

    const updatedApplication =
      await this.prismaService.permitApplication.update({
        where: { id },
        data: {
          application_status: updateStatusDto.application_status,
        },
      });

    return ApiResponseHelper.success(
      updatedApplication as PermitApplicationResponse,
      'Permit application status updated successfully',
    );
  }

  async remove(id: string, user: User): Promise<SuccessResponse<null>> {
    const existingApplication =
      await this.prismaService.permitApplication.findUnique({
        where: { id },
      });

    if (!existingApplication) {
      throw new NotFoundException('Permit application not found');
    }

    this.checkApplicationPermission(user, existingApplication, 'delete');

    await this.prismaService.permitApplication.delete({
      where: { id },
    });

    return ApiResponseHelper.success(
      null,
      'Permit application deleted successfully',
    );
  }

  private checkApplicationPermission(
    user: User,
    application: { userId: string | null },
    action: string = 'access',
  ): void {
    if (user.role !== Role.ADMIN && application.userId !== user.id) {
      throw new ForbiddenException(
        `You do not have permission to ${action} this application`,
      );
    }
  }
}
