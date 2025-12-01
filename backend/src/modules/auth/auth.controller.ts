import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/create-auth.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Role, type User } from '@prisma/client';
import { Authorized } from '@/common/decorators/authorized.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Authorized([Role.USER, Role.ADMIN])
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return this.authService.getProfile(user.id);
  }
}
