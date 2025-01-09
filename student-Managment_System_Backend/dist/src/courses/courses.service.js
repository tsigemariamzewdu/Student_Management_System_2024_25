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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const common_2 = require("@nestjs/common");
let CoursesService = class CoursesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        try {
            const courses = await this.prisma.course.findMany();
            return courses;
        }
        catch (error) {
            throw new Error("unable to fetch courses");
        }
    }
    async getByName(name) {
        try {
            const course = await this.prisma.course.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: "insensitive",
                    },
                },
            });
            if (course.length === 0) {
                throw new common_1.NotFoundException(`course with name '${name} is not found`);
            }
            return { course };
        }
        catch (error) {
            throw new Error(`Error fetching course by name:'$`);
        }
    }
    async getByCode(code) {
        try {
            const course = await this.prisma.course.findMany({
                where: {
                    code: {
                        contains: code,
                        mode: "insensitive"
                    },
                },
            });
            if (course.length === 0) {
                throw new common_1.NotFoundException(`course with the code'${code} is not found`);
            }
            return { course };
        }
        catch (error) {
            throw new common_1.NotFoundException(`course with the code '${code}' is not found`);
        }
    }
    async getByYear(year) {
        try {
            const courses = await this.prisma.course.findMany({
                where: {
                    year: year,
                },
            });
            if (courses.length === 0) {
                throw new common_1.NotFoundException(`No courses found for the year '${year}'`);
            }
            return { courses };
        }
        catch (error) {
            console.error(error);
        }
    }
    async getByYearAndSemester(year, semester) {
        try {
            if (![client_1.Semester.One, client_1.Semester.Two].includes(semester)) {
                throw new common_2.BadRequestException(`Invalid semester value: '${semester}'`);
            }
            const courses = await this.prisma.course.findMany({
                where: {
                    year: year,
                    semester: semester,
                },
            });
            if (courses.length === 0) {
                throw new common_1.NotFoundException(`No courses found for year '${year}' and semester '${semester}'`);
            }
            return { courses };
        }
        catch (error) {
            console.error(error);
            throw new Error(`Unable to fetch courses for year '${year}' and semester '${semester}'`);
        }
    }
    async getByYearSemesterAndDepartment(year, semester, department) {
        try {
            const courses = await this.prisma.course.findMany({
                where: {
                    year: year,
                    semester: semester,
                    department: department
                },
            });
            if (courses.length === 0) {
                throw new common_1.NotFoundException(`No courses found for year '${year}', semester '${semester}', and department '${department}'`);
            }
            const courseNames = courses.map(course => course.name);
            return { courseNames };
        }
        catch (error) {
            console.error(error);
            throw new Error(`Unable to fetch courses for year '${year}', semester '${semester}', and department '${department}'`);
        }
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map