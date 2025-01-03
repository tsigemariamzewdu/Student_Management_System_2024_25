import { AuthService } from './auth.service';
import { singupDto } from './dto/signup.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: singupDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(LoginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
