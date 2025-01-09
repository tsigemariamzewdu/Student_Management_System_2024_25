"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signup_dto_1 = require("./dto/signup.dto");
const login_dto_1 = require("./dto/login.dto");
const student_service_1 = require("../student/student.service");
let AuthController = class AuthController {
    constructor(authService, studentService) {
        this.authService = authService;
        this.studentService = studentService;
    }
    async register(registerDto, res) {
        const { name, email, password, role, year, department } = registerDto;
        try {
            const newUser = await this.authService.register(registerDto);
            let student = null;
            if (role === 'Student') {
                student = await this.studentService.findStudentByUserId(newUser.id);
                if (student) {
                    return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                        message: 'Student with this user ID is already registered',
                    });
                }
                student = await this.studentService.createStudent(registerDto, newUser.id);
            }
            return res.status(common_1.HttpStatus.CREATED).json({
                message: 'Registration successful',
                data: {
                    user: newUser,
                    student: student,
                },
            });
        }
        catch (error) {
            console.error('Error during registration:', error.message);
            if (error instanceof common_1.ConflictException) {
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    message: error.message,
                    errorDetails: error.stack,
                });
            }
            if (error instanceof common_1.BadRequestException) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    message: error.message,
                    errorDetails: error.stack,
                });
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred during registration. Please try again later.',
                errorDetails: error.stack,
            });
        }
    }
    async login(LoginDto, res) {
        try {
            if (LoginDto.email == "admin@gmail.com" && LoginDto.password == "admin") {
                const result = await this.authService.login(LoginDto, res);
                return res.status(common_1.HttpStatus.OK).json({
                    message: "admin logged in succesful",
                    data: result,
                });
            }
            const result = await this.authService.login(LoginDto, res);
            return res.status(common_1.HttpStatus.OK).json({
                message: "login succesfull",
                data: result,
            });
        }
        catch (error) {
            console.error("error during login", error.message);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: "An error occured during login" });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.singupDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        student_service_1.StudentService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map