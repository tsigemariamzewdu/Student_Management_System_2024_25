import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service'; // Import your Prisma service
import { StudentService } from 'src/student/student.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Replace with an environment variable for production
      signOptions: { expiresIn: '1h' }, // Set token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService,StudentService],
})
export class AuthModule {}
