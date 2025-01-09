import { Controller, Post, Body, HttpCode, HttpStatus,Res, ConflictException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Department } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';
import { singupDto } from './dto/signup.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { StudentService } from 'src/student/student.service';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly studentService:StudentService
  ) {}

  // Route for user registration
  @Post('register')
  async register(@Body() registerDto: singupDto, @Res() res: Response) {
    const { name, email, password, role, year, department } = registerDto;
  
    try {
      // Register the user
      const newUser = await this.authService.register(registerDto);
  
      let student = null;
  
      if (role === 'Student') {
        student = await this.studentService.findStudentByUserId(newUser.id);
        if (student) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Student with this user ID is already registered',
          });
        }
        student = await this.studentService.createStudent(registerDto, newUser.id);
      }
  
      return res.status(HttpStatus.CREATED).json({
        message: 'Registration successful',
        data: {
          user: newUser,
          student: student,
        },
      });
    } catch (error) {
      console.error('Error during registration:', error.message);
  
      if (error instanceof ConflictException) {
        // Specific conflict handling (e.g., user already exists)
        return res.status(HttpStatus.CONFLICT).json({
          message: error.message,
          errorDetails: error.stack,  // Optional: log it for debugging
        });
      }
  
      if (error instanceof BadRequestException) {
        // Handle bad request errors (e.g., missing fields, validation failures)
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message,
          errorDetails: error.stack,
        });
      }
  
      // Handle unexpected errors (e.g., database failures, unexpected exceptions)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during registration. Please try again later.',
        errorDetails: error.stack, // Optionally log this in the console or to a log file
      });
      }}

  // Route for user login
  @Post('login')
  async login(@Body() LoginDto:LoginDto,@Res() res:Response){
    try{
      if(LoginDto.email=="admin@gmail.com" && LoginDto.password=="admin"){
        const result=await this.authService.login(LoginDto,res);
        return res.status(HttpStatus.OK).json({
            message:"admin logged in succesful",
            data:result,
        })
      }
      
        const result=await this.authService.login(LoginDto,res);
        return res.status(HttpStatus.OK).json({
            message:"login succesfull",
            data:result,
        })
    }catch(error){
        console.error("error during login",error.message)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({message:"An error occured during login"})
    }
  }
}
