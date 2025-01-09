import { BadRequestException, Controller, Get, Param,Query } from '@nestjs/common';
import { CoursesService } from './courses.service'; 
import { CourseDTO } from './dto/course.dto'; //

import {Department,Semester} from "@prisma/client";

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
// get all courses 
  @Get('getAllCourses')
  async getAllCourses() {
    try {
      // Call the service method to get all courses
      return await this.coursesService.getAll();
    } catch (error) {
      // Handle any errors that occur during the fetch
      throw new Error('Unable to fetch courses: ' + error.message);
    }
  }


//   get course by name 
@Get("getByName/:name")
    async getCourseByName(@Param("name")name:string){
        try{
            return await this.coursesService.getByName(name);


        }catch(error){
            throw new Error("unable to fetch course by name")
        }
    }

// get course by code
@Get("getByCode/:code")
    async getCourseByCode(@Param("code") code:string){
        try{
            return await this.coursesService.getByCode(code);

        }catch(error){
            throw new Error("Unable to fetch course by code")
        }

    }
  @Get("getByYear/:year")
  async getCourseByYear(@Param("year") year:string){
    const numericYear = parseInt(year, 10);
    if(isNaN(numericYear)){
        throw new BadRequestException("year must be a valid number")
    }
    try{
        return await this.coursesService.getByYear(numericYear);

    }
    catch(error){
        throw new Error(`Unable to fetch course by year '${error}`)
    }
  }
  @Get("getCourses/:year/:semester")  // Use path parameters in the URL
  async getCourses(
    @Param("year") year: string,
    @Param("semester") semester: string
  ) {
   
    const numericYear = parseInt(year, 10);
    if (isNaN(numericYear)) {
      throw new BadRequestException("Year must be a valid number");
    }
  
    // Parse semester (handle cases for semester values like 'One' or 'Two')
    const numericSemester: Semester = semester as Semester; // Casting the semester to your enum
    if (![Semester.One, Semester.Two].includes(numericSemester)) {
      throw new BadRequestException("Invalid semester value");
    }
  
    try {
      return await this.coursesService.getByYearAndSemester(numericYear, numericSemester);
    } catch (error) {
      throw new Error(`Unable to fetch courses by year '${year}' and semester '${semester}'`);
    }
  }
  
  // Controller to fetch courses by year, semester, and department
@Get("getCourses/:year/:semester/:department")
async getCoursesByDepartment(
  @Param("year") year: string,
  @Param("semester") semester: Semester,
  @Param("department") department: Department
) {
  // Parse the year to a number
  const numericYear = parseInt(year, 10);
  if (isNaN(numericYear)) {
    throw new BadRequestException("Year must be a valid number");
  }

  // Parse semester (handling cases for values like 'One', 'Two')
  const numericSemester: Semester = semester as Semester; // Casting semester to enum
  if (![Semester.One, Semester.Two].includes(numericSemester)) {
    throw new BadRequestException("Invalid semester value");
  }

  // Validate department (assuming it's a string that can be matched directly)
  if (!department || department.trim() === "") {
    throw new BadRequestException("Department must be a valid non-empty string");
  }

  try {
    return await this.coursesService.getByYearSemesterAndDepartment(
      numericYear,
      numericSemester,
      department
    );
  } catch (error) {
    throw new Error(`Unable to fetch courses for year '${year}', semester '${semester}', and department '${department}'`);
  }
}


}

