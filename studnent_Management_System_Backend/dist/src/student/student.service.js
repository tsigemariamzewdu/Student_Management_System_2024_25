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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let StudentService = class StudentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addCourseToStudent(studentId, courseId) {
        try {
            const student = await this.prisma.student.findUnique({
                where: { id: studentId },
            });
            if (!student) {
                throw new common_1.BadRequestException(`Student with ID ${studentId} not found`);
            }
            const course = await this.prisma.course.findUnique({
                where: { id: courseId },
            });
            if (!course) {
                throw new common_1.BadRequestException(`Course with ID ${courseId} not found`);
            }
            const isCourseAlreadyAdded = await this.prisma.student.findFirst({
                where: {
                    id: studentId,
                    courses: {
                        some: { id: courseId },
                    },
                },
            });
            if (isCourseAlreadyAdded) {
                throw new common_1.BadRequestException(`The course with ID ${courseId} is already added to the student`);
            }
            const updatedStudent = await this.prisma.student.update({
                where: { id: studentId },
                data: {
                    courses: {
                        connect: course,
                    },
                },
                include: { courses: true },
            });
            return updatedStudent;
        }
        catch (error) {
            console.error(error);
            throw new Error("Unable to add course to student");
        }
    }
    async addCoursesToStudent(studentId, courseNames) {
        try {
            const courses = await this.prisma.course.findMany({
                where: { name: { in: courseNames } },
            });
            if (!courses || courses.length === 0) {
                throw new common_1.NotFoundException('No courses found');
            }
            const updatedStudent = await this.prisma.student.update({
                where: { id: studentId },
                data: {
                    courses: {
                        connect: courses.map(course => ({ id: course.id })),
                    },
                },
                include: { courses: true },
            });
            return updatedStudent;
        }
        catch (error) {
            console.error('Failed to add courses to student:', error);
            throw new common_1.InternalServerErrorException('Failed to add courses to student');
        }
    }
    async deleteCourse(studnetId, courseId) {
        try {
            const student = await this.prisma.student.findUnique({
                where: {
                    id: studnetId
                }
            });
            if (!student) {
                throw new common_1.BadRequestException(`Student with ID ${studnetId} not found`);
            }
            const course = await this.prisma.course.findUnique({
                where: { id: courseId }
            });
            if (!course) {
                throw new common_1.BadRequestException(`courses with ID ${courseId} not found `);
            }
            const isCourseAssociated = await this.prisma.student.findFirst({
                where: {
                    id: studnetId,
                    courses: {
                        some: { id: courseId }
                    }
                }
            });
            if (!isCourseAssociated) {
                throw new common_1.BadRequestException(`the course with ID ${courseId} is not associated`);
            }
            ;
            const updatedStudent = await this.prisma.student.update({
                where: { id: studnetId },
                data: {
                    courses: {
                        disconnect: { id: courseId }
                    }
                },
                include: {
                    courses: true
                }
            });
            return updatedStudent;
        }
        catch (error) {
            console.error(error);
            throw new Error("unable to remove course from student");
        }
    }
    async deleteAllCourses(studentId) {
        try {
            const student = await this.prisma.student.findUnique({
                where: { id: studentId },
                include: { courses: true },
            });
            if (!student) {
                throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
            }
            if (student.courses.length === 0) {
                throw new common_1.NotFoundException(`No courses found for student with ID ${studentId}`);
            }
            await this.prisma.student.update({
                where: { id: studentId },
                data: {
                    courses: {
                        set: [],
                    },
                },
            });
            return { message: `All courses for student ID ${studentId} have been removed` };
        }
        catch (error) {
            console.error('Error deleting courses:', error);
            throw new common_1.InternalServerErrorException('An error occurred while deleting courses');
        }
    }
    async findStudentByUserId(userId) {
        return await this.prisma.student.findUnique({
            where: {
                userId: userId
            }
        });
    }
    async createStudent(signupDto, userId) {
        try {
            if (!signupDto.email) {
                throw new Error('Email is required');
            }
            const newStudent = await this.prisma.student.create({
                data: {
                    userId: userId,
                    year: signupDto.year,
                    department: signupDto.department
                },
            });
            return newStudent;
        }
        catch (error) {
            console.error("Error in registering the user", error);
            throw new common_1.InternalServerErrorException("An error occurred while registering the user");
        }
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentService);
//# sourceMappingURL=student.service.js.map