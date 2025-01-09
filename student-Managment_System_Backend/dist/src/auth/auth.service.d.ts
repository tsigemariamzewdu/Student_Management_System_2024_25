import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { singupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from "express";
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(signupDto: singupDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        password: string;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
