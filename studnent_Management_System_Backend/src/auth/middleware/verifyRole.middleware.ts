import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {} 

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.accesToken; 

    if (!token) {
      throw new UnauthorizedException('Authentication token not found');
    }

    try {
    
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded; 

     
      const userRole = decoded.role;
      if (!this.allowedRoles.includes(userRole)) {
        throw new UnauthorizedException('Access denied: insufficient permissions');
      }

      return true; 
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired authentication token');
    }
  }
}
