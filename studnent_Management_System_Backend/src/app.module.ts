import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { StudentService } from './student/student.service';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CoursesModule } from './courses/courses.module';
import { CoursesService } from './courses/courses.service';
import { AdminModule } from './Admin/admin.module';
import { AdminService } from './Admin/admin.service';

@Module({
  imports: [AuthModule,StudentModule,PrismaModule,JwtModule,CoursesModule,AdminModule],
  controllers: [AppController],
  providers: [AppService,AuthService,StudentService,JwtService,CoursesService,AdminService],
})
export class AppModule {}
