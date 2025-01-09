import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
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
 
  async register(signupDto: singupDto) {
    try {
      if (!signupDto.email) {
        throw new BadRequestException('Email is required');
      }

      // Check if the user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: signupDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);

      // Create the new user
      const newUser = await this.prisma.user.create({
        data: {
          name: signupDto.name,
          email: signupDto.email,
          password: hashedPassword,
          role: signupDto.role,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error; // Propagate known exceptions
      }

      // Log and throw unexpected errors
      console.error('Unexpected error during registration:', error);
      throw new InternalServerErrorException('An error occurred during registration');
    }
  }
  
  
  
  // Login 

  async login(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;

      // Find the user by email
      const user = await this.prisma.user.findUnique({ where: { email } });
      
      const admin =await this.prisma.admin.findUnique({where:{email}});

      if(admin){
        const payload = { sub: admin.id, role: "admin" };

        // Generate JWT token
        const accessToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '1h', // You can set an expiration time
        });
        return res.json({message:"admin logged in succesfully",accessToken,role:"admin"})

      }
     
      
     
      if(!admin){
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Compare the password with the hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Create the JWT payload
      const payload = { sub: user.id, role: user.role };

      // Generate JWT token
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h', // You can set an expiration time
      });
      
      
        const student=await this.prisma.student.findUnique({where:{userId:user.id}})
        return res.json({ message: 'Login successful', accessToken,id:user.id,name:user.name ,studnetId:student.id});
      
      // Send the token back to the client
     

    }} catch (error) {
      console.error('Error in login:', error);
      throw new InternalServerErrorException('An error occurred while logging in');
    }
  }}
