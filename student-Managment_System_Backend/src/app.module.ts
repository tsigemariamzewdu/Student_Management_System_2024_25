import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { StudentModule } from './student/student.module';
import { PrismaModule } from "../prisma/prisma.module"; // Import PrismaModule
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, CoursesModule, StudentModule, PrismaModule, AdminModule], 
  controllers: [AppController, AdminController], 
  providers: [AppService, AdminService], 
})
export class AppModule {}
