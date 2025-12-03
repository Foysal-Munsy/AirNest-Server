import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: {
    role?: string;
  };
}

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException(
        'Access denied. User not found in request context.',
      );
    }

    // Restrict access to Admin users only.
    const isAdmin =
      typeof user.role === 'string' && user.role.toLowerCase() === 'admin';

    if (!isAdmin) {
      throw new ForbiddenException('Access denied. Admin role required.');
    }

    return true;
  }
}
