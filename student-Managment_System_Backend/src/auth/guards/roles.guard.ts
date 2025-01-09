// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';  // Import JwtAuthGuard
import { Reflector } from '@nestjs/core';  // To access route metadata
import { Role } from '../roles.enum';  // Import the roles enum
import { ROLES_KEY } from '../decorators/roles.decorator';  // Import the roles key constant

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,  // To reflect metadata from route handlers
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());  // Get roles metadata from the route
    if (!roles) {
      return true;  // If no roles are specified, allow access
    }

    // Get the request object
    const request = context.switchToHttp().getRequest();
    const user = request.user;  // The user object will be set by the JwtAuthGuard

    // Check if the user's role matches the allowed roles
    if (!roles.includes(user.role)) {
      throw new ForbiddenException('Access denied, insufficient role');
    }

    return true;  // Grant access if roles match
  }
}
