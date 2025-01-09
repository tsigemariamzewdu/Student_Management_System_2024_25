import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { StudentService } from './student/student.service';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule,StudentModule,PrismaModule,JwtModule],
  controllers: [AppController],
  providers: [AppService,AuthService,StudentService,JwtService],
})
export class AppModule {}
