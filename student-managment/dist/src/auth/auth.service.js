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
var _a;
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
                throw new Error('Email is required');
            }
            const existingUser = await this.prisma.user.findUnique({
                where: { email: signupDto.email },
            });
            if (existingUser) {
                throw new common_1.UnauthorizedException('User already exists');
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
            console.error("Error in registering the user", error);
            throw new common_1.InternalServerErrorException("An error occurred while registering the user");
        }
    }
    async login(loginDto, res) {
        try {
            const { email, password } = loginDto;
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new common_1.UnauthorizedException("invalid email or password");
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new common_1.UnauthorizedException("invalid email or password");
            }
            const payload = { sub: user.id, role: user.role };
            const accessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
            });
            res.cookie("accesToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production"
            });
            return {
                message: "login succesfull"
            };
        }
        catch (error) {
            console.error("error in login", error);
            throw new common_1.InternalServerErrorException("an error occured while logging in ");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map