import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { singupDto } from 'src/auth/dto/signup.dto';



@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
//add single course
async addCourseToStudent(studentId: number, courseId: number) {
    try {
      // Find the student by ID
      const student = await this.prisma.student.findUnique({
        where: { id: studentId },
      });
  
      if (!student) {
        throw new BadRequestException(`Student with ID ${studentId} not found`);
      }
  
      // Find the course by ID
      const course = await this.prisma.course.findUnique({
        where: { id: courseId },
      });
  
      if (!course) {
        throw new BadRequestException(`Course with ID ${courseId} not found`);
      }
  
      // Check if the course is already added to the student
      const isCourseAlreadyAdded = await this.prisma.student.findFirst({
        where: {
          id: studentId,
          courses: {
            some: { id: courseId }, // Check if the course is already connected
          },
        },
      });
  
      if (isCourseAlreadyAdded) {
        throw new BadRequestException(
          `The course with ID ${courseId} is already added to the student`
        );
      }
  
      // Add the course to the student's courses array
      const updatedStudent = await this.prisma.student.update({
        where: { id: studentId },
        data: {
          courses: {
            connect: course,
          },
        },
        include: { courses: true },
      });
  
      return updatedStudent; 
    } catch (error) {
      console.error(error);
      throw new Error("Unable to add course to student");
    }
  }
  
  async addCoursesToStudent(studentId: number, courseNames: string[]) {
    try {
      // Find courses by their names
      const courses = await this.prisma.course.findMany({
        where: { name: { in: courseNames } },
      });
  
      if (!courses || courses.length === 0) {
        throw new NotFoundException('No courses found');
      }
  
      // Link courses to the student
      const updatedStudent = await this.prisma.student.update({
        where: { id: studentId },
        data: {
          courses: {
            connect: courses.map(course => ({ id: course.id })),
          },
        },
        include: { courses: true },
      });
  
      return updatedStudent;
    } catch (error) {
      console.error('Failed to add courses to student:', error);
      throw new InternalServerErrorException('Failed to add courses to student');
    }
  }
  
  
// delete a course
async deleteCourse(
    studnetId:number,
    courseId:number
) {try{
    const student=await this.prisma.student.findUnique({
    where :{
        id:studnetId
    }
    });
    
    if(!student){
        throw new BadRequestException(`Student with ID ${studnetId} not found`);

    }
    const course=await this.prisma.course.findUnique({
        where:{id:courseId}
    });
    
    if(!course){
        throw new BadRequestException(`courses with ID ${courseId} not found `)

    }
    const isCourseAssociated=await this.prisma.student.findFirst({
        where:{
            id:studnetId,
            courses:{
                some:{id:courseId}
            }

        }
    });
    if(!isCourseAssociated){
        throw new BadRequestException(`the course with ID ${courseId} is not associated`)
    };
    const updatedStudent=await this.prisma.student.update({
        where:{id:studnetId},
        data:{
            courses:{
                disconnect:{id:courseId}
            }
        },
        include:{
            courses:true
        }
    })
    return updatedStudent;

}catch(error){
    console.error(error)
    throw new Error("unable to remove course from student")

}

}

// delete all courses
async deleteAllCourses(studentId: number) {
  try {
    // Verify the student exists
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { courses: true },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    if (student.courses.length === 0) {
      throw new NotFoundException(`No courses found for student with ID ${studentId}`);
    }

    // Disconnect all courses for the student
    await this.prisma.student.update({
      where: { id: studentId },
      data: {
        courses: {
          set: [], // This removes all associations with courses
        },
      },
    });

    return { message: `All courses for student ID ${studentId} have been removed` };
  } catch (error) {
    console.error('Error deleting courses:', error);
    throw new InternalServerErrorException('An error occurred while deleting courses');
  }
}
//find student by id
async findStudentByUserId(userId:number){

  return await this.prisma.student.findUnique({
    where:{
      userId:userId
    }
  })
}

//create a student
async createStudent(signupDto:singupDto,userId:number) {
    try {
      // Ensure signupDto.email is provided
      if (!signupDto.email) {
        throw new Error('Email is required');
      }
  
     
  
      
  
      
      const newStudent = await this.prisma.student.create({
        data: {
          userId:userId,
          year:signupDto.year,
          department:signupDto.department
        },
      });
  
      
      
  
      return newStudent
    } catch (error) {
      console.error("Error in registering the user", error);
      throw new InternalServerErrorException("An error occurred while registering the user");
    }
  }
  // get studnet course
  async 


}
