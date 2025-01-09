import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('No authorization token provided');
    }

    const token = authorizationHeader.split(' ')[1]; 

    if (!token) {
      throw new UnauthorizedException('Invalid or expired authentication token');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET, 
      });
      request.user = payload; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired authentication token');
    }
  }
}
