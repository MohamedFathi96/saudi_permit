import { Module } from '@nestjs/common';
import { PermitApplicationService } from './permit-application.service';
import { PermitApplicationController } from './permit-application.controller';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PermitApplicationController],
  providers: [PermitApplicationService],
  exports: [PermitApplicationService],
})
export class PermitApplicationModule {}

