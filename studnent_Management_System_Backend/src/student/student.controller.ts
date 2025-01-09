import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard"


@Controller('student')
@UseGuards(JwtAuthGuard) // Use JwtAuthGuard here instead of JwtAuthMiddleware
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Add course to a student
  @Post('add')
  async addCourseToStudent(
    @Body('studentId') studentId: number,
    @Body('courseId') courseId: number,
  ) {
    try {
      const updatedStudent = await this.studentService.addCourseToStudent(
        studentId,
        courseId,
      );
      return { updatedStudent };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to add course to student');
    }
  }

  // Add multiple courses to a student
  @Post('add-courses')
  async addCoursesToStudent(
    @Body('studentId') studentId: number,
    @Body('courseNames') courseNames: string[],
  ) {
    try {
      const updatedStudent = await this.studentService.addCoursesToStudent(studentId, courseNames);
      return { updatedStudent};
    } catch (error) {
      console.error('Failed to add courses to student:', error.message);
      throw new InternalServerErrorException('Failed to add courses to student');
    }
  }
  
  // Delete a course from a student
  @Delete(':studentId/courses/:courseId')
  async deleteCourse(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    try {
      return await this.studentService.deleteCourse(studentId, courseId);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete course');
    }
  }

  // Delete all courses for a student
  @Delete(':studentId/courses')
  async deleteAllCourses(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    try {
      return await this.studentService.deleteAllCourses(studentId);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete all courses');
    }
  }
}
