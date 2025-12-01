import { applyDecorators, SetMetadata } from '@nestjs/common';
import type { Role } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

export const ROLES_KEY = 'roles';
export const Authorized = (roleOrRoles?: Role | Role[]) => {
  let authorizedRoles: Role[] = [];
  if (roleOrRoles)
    authorizedRoles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];

  return applyDecorators(
    SetMetadata('authorization', true),
    SetMetadata(ROLES_KEY, authorizedRoles),
    ApiBearerAuth('JWT-auth'),
  );
};
