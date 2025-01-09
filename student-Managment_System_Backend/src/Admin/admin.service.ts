import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Assuming you have a Prisma service setup
import { CreateCourseDto } from './dto/createCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // Get all students with filtering options
  async getStudents(query: { department?: string; year?: number }) {
    const { department, year } = query;
    const filterOptions: any = {};

    if (department) {
      filterOptions['department'] = department;
    }
    if (year) {
      filterOptions['year'] = year; // Prisma will handle the filtering correctly if the data type is matched
    }

    return await this.prisma.student.findMany({
      where: filterOptions,
    });
  }

  // Get all courses from the system
  async getCourses() {
    return await this.prisma.course.findMany();
  }
  async getCourse(id:number){
    return await this.prisma.course.findUnique({where:{id}})
  }

  // Add a new course
  async addCourse(createCourseDto: CreateCourseDto) {
    return await this.prisma.course.create({
      data: createCourseDto,
    });
  }
  async deleteCourse(id: number){
    // Find the course by ID
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    // If the course doesn't exist, throw a NotFoundException
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // Delete the course
    await this.prisma.course.delete({
      where: { id },
    });
  }
  async updateCourse(id:number,updateCourseDto:UpdateCourseDto){
    const course=await this.prisma.course.findUnique({where:{id}})
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  
    // Update the course with the new details
    const updatedCourse = await this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  
    return updatedCourse;
  

  }
}
