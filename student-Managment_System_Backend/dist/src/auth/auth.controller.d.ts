import { AuthService } from './auth.service';
import { singupDto } from './dto/signup.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { StudentService } from 'src/student/student.service';
export declare class AuthController {
    private readonly authService;
    private readonly studentService;
    constructor(authService: AuthService, studentService: StudentService);
    register(registerDto: singupDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(LoginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
