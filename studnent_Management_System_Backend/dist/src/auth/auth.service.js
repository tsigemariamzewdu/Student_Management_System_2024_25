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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(signupDto) {
        try {
            if (!signupDto.email) {
                throw new common_1.BadRequestException('Email is required');
            }
            const existingUser = await this.prisma.user.findUnique({
                where: { email: signupDto.email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('User already exists');
            }
            const hashedPassword = await bcrypt.hash(signupDto.password, 10);
            const newUser = await this.prisma.user.create({
                data: {
                    name: signupDto.name,
                    email: signupDto.email,
                    password: hashedPassword,
                    role: signupDto.role,
                },
            });
            return newUser;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            console.error('Unexpected error during registration:', error);
            throw new common_1.InternalServerErrorException('An error occurred during registration');
        }
    }
    async login(loginDto, res) {
        try {
            const { email, password } = loginDto;
            const user = await this.prisma.user.findUnique({ where: { email } });
            const admin = await this.prisma.admin.findUnique({ where: { email } });
            if (admin) {
                const payload = { sub: admin.id, role: "admin" };
                const accessToken = this.jwtService.sign(payload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1h',
                });
                return res.json({ message: "admin logged in succesfully", accessToken, role: "admin" });
            }
            if (!admin) {
                if (!user) {
                    throw new common_1.UnauthorizedException('Invalid email or password');
                }
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if (!isPasswordMatch) {
                    throw new common_1.UnauthorizedException('Invalid email or password');
                }
                const payload = { sub: user.id, role: user.role };
                const accessToken = this.jwtService.sign(payload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1h',
                });
                const student = await this.prisma.student.findUnique({ where: { userId: user.id } });
                return res.json({ message: 'Login successful', accessToken, id: user.id, name: user.name, studnetId: student.id });
            }
        }
        catch (error) {
            console.error('Error in login:', error);
            throw new common_1.InternalServerErrorException('An error occurred while logging in');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map