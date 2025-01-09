import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { PrismaService } from 'prisma/prisma.service';
import { StudentController } from './student.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [StudentService,PrismaService,JwtService],
      controllers: [StudentController]
})
export class StudentModule {}
