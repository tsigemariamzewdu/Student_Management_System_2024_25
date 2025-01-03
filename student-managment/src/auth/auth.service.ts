import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';  // Assuming you have a Prisma service
import * as bcrypt from 'bcryptjs';
import { Department } from '@prisma/client';  // Import the Department enum
import { singupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import {Response} from "express"


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user (either Admin or Student)
 
  async register(signupDto:singupDto) {
    try {
      // Ensure signupDto.email is provided
      if (!signupDto.email) {
        throw new Error('Email is required');
      }
  
      // Check if the user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: signupDto.email },  // Use the provided email here
      });
  
      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }
  
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
  
      // Create the new user in the database
      const newUser = await this.prisma.user.create({
        data: {
          name: signupDto.name,
          email: signupDto.email,
          password: hashedPassword,
          role: signupDto.role, // Role should be passed in the signupDto
        },
      });
  
      // If the user is an admin, create an admin record
      
  
      return { message: "User registered successfully" };
    } catch (error) {
      console.error("Error in registering the user", error);
      throw new InternalServerErrorException("An error occurred while registering the user");
    }
  }
  
  
  // Login 

  async login(loginDto:LoginDto,res:Response)
  {
    try{
      const {email,password}=loginDto
    
    const user = await this.prisma.user.findUnique({where:{email }})
    if(!user){
      throw new UnauthorizedException("invalid email or password")
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password)
    
    if (!isPasswordMatch){
      throw new UnauthorizedException("invalid email or password")
    }

    const payload= {sub: user.id, role: user.role};
    const accessToken=this.jwtService.sign(payload,{
      secret:process.env.JWT_SECRET,
    })
    
    res.cookie("accesToken", accessToken,{
      httpOnly:true,
      sameSite:"strict",
      secure:process.env.NODE_ENV==="production"
    });
    return {
      message:"login succesfull"
    }

    
  }catch(error){
    console.error("error in login",error)
    throw new InternalServerErrorException("an error occured while logging in ")
  }

}}
