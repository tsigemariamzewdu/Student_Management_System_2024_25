import { Controller, Get, Post, Body, Query, BadRequestException, Delete, Param, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateCourseDto } from './dto/createCourse.dto';
import { ParseIntPipe } from '@nestjs/common';
import { UpdateCourseDto } from './dto/updateCourse.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Get all students with optional filters by department and year
  @Get('students')
  async getStudents(
    @Query('department') department?: string,
    @Query('year') year?: string, // Accept year as a string
  ) {
    const parsedYear = year ? parseInt(year, 10) : undefined; // Safely parse the year to a number
    if (year && isNaN(parsedYear)) {
      throw new BadRequestException('Year must be a valid number');
    }
    return this.adminService.getStudents({ department, year: parsedYear });
  }
  // Get all courses
  @Get('courses')
  async getCourses() {
    return this.adminService.getCourses();
  }
  @Get('courses/:id')
  async getCourse(@Param('id',ParseIntPipe) id: number) {
    return this.adminService.getCourse(id);
  }


  // Add a new course to the system
  @Post('courses')
  async addCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.adminService.addCourse(createCourseDto);
  }
  @Delete("courses/:id")
  async deleteCourse(@Param('id',ParseIntPipe) id: number) {
    return this.adminService.deleteCourse(id);
  }
  @Patch("courses/:id")
  async updateCourse(@Param("id",ParseIntPipe)id :number, @Body()updateCourseDto:UpdateCourseDto){
    return this.adminService.updateCourse(id,updateCourseDto)
  }
  
  
}
