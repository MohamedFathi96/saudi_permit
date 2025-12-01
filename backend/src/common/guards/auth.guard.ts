import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/authorized.decorator';

@Injectable()
export class AuthorizedGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAuthorization = this.reflector.get<string[]>(
      'authorization',
      context.getHandler(),
    );

    if (!requiredAuthorization) return true;

    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated)
      throw new UnauthorizedException('Authentication required');

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new UnauthorizedException('User not found');

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) throw new ForbiddenException('Insufficient permissions');

    return true;
  }
}
