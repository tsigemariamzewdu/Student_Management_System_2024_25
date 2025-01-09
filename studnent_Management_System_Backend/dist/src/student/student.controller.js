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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async addCourseToStudent(studentId, courseId) {
        try {
            const updatedStudent = await this.studentService.addCourseToStudent(studentId, courseId);
            return { updatedStudent };
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException('Failed to add course to student');
        }
    }
    async addCoursesToStudent(studentId, courseNames) {
        try {
            const updatedStudent = await this.studentService.addCoursesToStudent(studentId, courseNames);
            return { updatedStudent };
        }
        catch (error) {
            console.error('Failed to add courses to student:', error.message);
            throw new common_1.InternalServerErrorException('Failed to add courses to student');
        }
    }
    async deleteCourse(studentId, courseId) {
        try {
            return await this.studentService.deleteCourse(studentId, courseId);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Failed to delete course');
        }
    }
    async deleteAllCourses(studentId) {
        try {
            return await this.studentService.deleteAllCourses(studentId);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Failed to delete all courses');
        }
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)('studentId')),
    __param(1, (0, common_1.Body)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "addCourseToStudent", null);
__decorate([
    (0, common_1.Post)('add-courses'),
    __param(0, (0, common_1.Body)('studentId')),
    __param(1, (0, common_1.Body)('courseNames')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "addCoursesToStudent", null);
__decorate([
    (0, common_1.Delete)(':studentId/courses/:courseId'),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Delete)(':studentId/courses'),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteAllCourses", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map