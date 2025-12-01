import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from '@modules/auth/auth.module';
import { PermitApplicationModule } from '@modules/permit-application/permit-application.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { GlobalExceptionFilter } from '@/common/exceptions/global-exception.filter';
import { AuthorizedGuard } from '@/common/guards/auth.guard';

@Module({
  imports: [
    AuthModule,
    PermitApplicationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizedGuard,
    },
  ],
})
export class AppModule {}
