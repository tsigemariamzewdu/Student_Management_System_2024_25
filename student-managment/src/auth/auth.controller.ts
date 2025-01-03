import { Controller, Post, Body, HttpCode, HttpStatus,Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Department } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';
import { singupDto } from './dto/signup.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Route for user registration
  @Post('register')
  
  async register(@Body() registerDto: singupDto, @Res() res: Response) {
    try {
      const result = await this.authService.register(registerDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Registration successful',
        data: result,
      });
    } catch (error) {
      console.error('Error during registration:', error.message);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred during registration' });
    }
  }
  
  // Route for user login
  @Post('login')
  async login(@Body() LoginDto:LoginDto,@Res() res:Response){
    try{
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
