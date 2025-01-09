import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CourseDTO } from './dto/course.dto';
import { NotFoundError } from 'rxjs';
import { Semester,Department } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CoursesService {

    constructor(
        private readonly prisma:PrismaService,

    ){}



// get all courses
 async getAll(){
    try{
    const courses=await this.prisma.course.findMany()
    return courses
    } catch(error){
        throw new Error("unable to fetch courses")
    }
 }


//get course by name
async getByName(name:string){
    try{
        const course=await this.prisma.course.findMany({
            where:{
                name:{
                contains:name,
                mode:"insensitive",
            },
        },
    });
            if(course.length===0){
                throw new NotFoundException(`course with name '${name} is not found`)
            }
            return {course}
    }catch(error){
        throw new Error (`Error fetching course by name:'$`)
    }
}

//get single course by code
async getByCode(code:string){
    try{
        const course=await this.prisma.course.findMany({
            where:{
                code:{
                    contains:code,
                    mode:"insensitive"
                },
            },
        });
        if(course.length===0){
            throw new NotFoundException(`course with the code'${code} is not found`)
        }
        return {course}
    }catch(error){
        throw new NotFoundException(`course with the code '${code}' is not found`)
    }
}




/// get courses by year
async getByYear(year: number) {
    try {
        const courses = await this.prisma.course.findMany({
            where: {
                year: year,
            },
        });

        if (courses.length === 0) {
            throw new NotFoundException(`No courses found for the year '${year}'`);
        }

        return { courses };
    } catch (error) {
        console.error(error)
        // throw new NotFoundException(`Unable to fetch courses for the year '${year}'`);
    }
}






//get courses by year and semester 
async getByYearAndSemester(year: number, semester: Semester) {
    try {
      // Ensure semester is part of the enum
      if (![Semester.One, Semester.Two].includes(semester)) {
        throw new BadRequestException(`Invalid semester value: '${semester}'`);
      }
  
      // Query the database for courses by year and semester
      const courses = await this.prisma.course.findMany({
        where: {
          year: year,
          semester: semester, // Filter by both year and semester
        },
      });
  
      // If no courses are found, throw a NotFoundException
      if (courses.length === 0) {
        throw new NotFoundException(`No courses found for year '${year}' and semester '${semester}'`);
      }
  
      // Return the found courses
      return { courses };
    } catch (error) {
      console.error(error);
      // Handle unexpected errors by throwing a more informative exception
      throw new Error(`Unable to fetch courses for year '${year}' and semester '${semester}'`);
    }
  }
  
  async getByYearSemesterAndDepartment(year: number, semester: Semester, department: Department) {
    try {
      
      // Query the database for courses filtered by year, semester, and department
      const courses = await this.prisma.course.findMany({
        where: {
          year: year,
          semester: semester, 
          department: department
        },
      });
  
      // If no courses are found, throw a NotFoundException
      if (courses.length === 0) {
        throw new NotFoundException(`No courses found for year '${year}', semester '${semester}', and department '${department}'`);
      }
  
      const courseNames = courses.map(course => course.name);
      return { courseNames };
    } catch (error) {
      console.error(error);
      // Handle unexpected errors by throwing a more informative exception
      throw new Error(`Unable to fetch courses for year '${year}', semester '${semester}', and department '${department}'`);
    }
  }
  
  











}
