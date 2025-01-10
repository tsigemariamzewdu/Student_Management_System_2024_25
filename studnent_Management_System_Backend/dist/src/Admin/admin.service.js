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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStudents(query) {
        const { department, year } = query;
        const filterOptions = {};
        if (department) {
            filterOptions['department'] = department;
        }
        if (year) {
            filterOptions['year'] = year;
        }
        return await this.prisma.student.findMany({
            where: filterOptions,
        });
    }
    async getCourses() {
        return await this.prisma.course.findMany();
    }
    async getCourse(id) {
        return await this.prisma.course.findUnique({ where: { id } });
    }
    async addCourse(createCourseDto) {
        return await this.prisma.course.create({
            data: createCourseDto,
        });
    }
    async deleteCourse(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        await this.prisma.course.delete({
            where: { id },
        });
    }
    async updateCourse(id, updateCourseDto) {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        const updatedCourse = await this.prisma.course.update({
            where: { id },
            data: updateCourseDto,
        });
        return updatedCourse;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map