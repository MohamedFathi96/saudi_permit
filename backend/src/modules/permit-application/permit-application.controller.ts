import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { PermitApplicationService } from './permit-application.service';
import { CreatePermitApplicationDto } from './dto/create-permit-application.dto';
import {
  UpdatePermitApplicationDto,
  UpdateApplicationStatusDto,
} from './dto/update-permit-application.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Authorized } from '@/common/decorators/authorized.decorator';
import { Role, type User } from '@prisma/client';

@ApiTags('Permit Applications')
@Controller('permit-applications')
export class PermitApplicationController {
  constructor(
    private readonly permitApplicationService: PermitApplicationService,
  ) {}

  @Authorized([Role.USER])
  @Post()
  @ApiOperation({ summary: 'Create a new permit application' })
  @ApiBody({ type: CreatePermitApplicationDto })
  create(
    @Body() createPermitApplicationDto: CreatePermitApplicationDto,
    @CurrentUser() user: User,
  ) {
    return this.permitApplicationService.create(
      createPermitApplicationDto,
      user.id,
    );
  }

  @Authorized([Role.USER, Role.ADMIN])
  @Get()
  @ApiOperation({
    summary: 'Get all permit applications',
    description:
      'Admins can see all applications, regular users can only see their own',
  })
  findAll(@CurrentUser() user: User) {
    return this.permitApplicationService.findAll(user);
  }

  @Authorized([Role.USER, Role.ADMIN])
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific permit application by ID' })
  @ApiParam({
    name: 'id',
    description: 'Permit application ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.permitApplicationService.findOne(id, user);
  }

  @Authorized([Role.USER, Role.ADMIN])
  @Patch(':id')
  @ApiOperation({
    summary: 'Update permit application details',
    description:
      'Users can update their own applications, admins can update any application. This endpoint does NOT update the status.',
  })
  @ApiParam({
    name: 'id',
    description: 'Permit application ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdatePermitApplicationDto })
  update(
    @Param('id') id: string,
    @Body() updatePermitApplicationDto: UpdatePermitApplicationDto,
    @CurrentUser() user: User,
  ) {
    return this.permitApplicationService.update(
      id,
      updatePermitApplicationDto,
      user,
    );
  }

  @Authorized([Role.ADMIN])
  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update permit application status (ADMIN ONLY)',
    description:
      'Only administrators can change the status of permit applications (Pending, Approved, Rejected)',
  })
  @ApiParam({
    name: 'id',
    description: 'Permit application ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateApplicationStatusDto })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateApplicationStatusDto,
  ) {
    return this.permitApplicationService.updateStatus(id, updateStatusDto);
  }

  @Authorized([Role.USER, Role.ADMIN])
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a permit application',
    description:
      'Users can delete their own applications, admins can delete any application',
  })
  @ApiParam({
    name: 'id',
    description: 'Permit application ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.permitApplicationService.remove(id, user);
  }
}
