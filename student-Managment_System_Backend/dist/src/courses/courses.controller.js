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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const client_1 = require("@prisma/client");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async getAllCourses() {
        try {
            return await this.coursesService.getAll();
        }
        catch (error) {
            throw new Error('Unable to fetch courses: ' + error.message);
        }
    }
    async getCourseByName(name) {
        try {
            return await this.coursesService.getByName(name);
        }
        catch (error) {
            throw new Error("unable to fetch course by name");
        }
    }
    async getCourseByCode(code) {
        try {
            return await this.coursesService.getByCode(code);
        }
        catch (error) {
            throw new Error("Unable to fetch course by code");
        }
    }
    async getCourseByYear(year) {
        const numericYear = parseInt(year, 10);
        if (isNaN(numericYear)) {
            throw new common_1.BadRequestException("year must be a valid number");
        }
        try {
            return await this.coursesService.getByYear(numericYear);
        }
        catch (error) {
            throw new Error(`Unable to fetch course by year '${error}`);
        }
    }
    async getCourses(year, semester) {
        const numericYear = parseInt(year, 10);
        if (isNaN(numericYear)) {
            throw new common_1.BadRequestException("Year must be a valid number");
        }
        const numericSemester = semester;
        if (![client_1.Semester.One, client_1.Semester.Two].includes(numericSemester)) {
            throw new common_1.BadRequestException("Invalid semester value");
        }
        try {
            return await this.coursesService.getByYearAndSemester(numericYear, numericSemester);
        }
        catch (error) {
            throw new Error(`Unable to fetch courses by year '${year}' and semester '${semester}'`);
        }
    }
    async getCoursesByDepartment(year, semester, department) {
        const numericYear = parseInt(year, 10);
        if (isNaN(numericYear)) {
            throw new common_1.BadRequestException("Year must be a valid number");
        }
        const numericSemester = semester;
        if (![client_1.Semester.One, client_1.Semester.Two].includes(numericSemester)) {
            throw new common_1.BadRequestException("Invalid semester value");
        }
        if (!department || department.trim() === "") {
            throw new common_1.BadRequestException("Department must be a valid non-empty string");
        }
        try {
            return await this.coursesService.getByYearSemesterAndDepartment(numericYear, numericSemester, department);
        }
        catch (error) {
            throw new Error(`Unable to fetch courses for year '${year}', semester '${semester}', and department '${department}'`);
        }
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Get)('getAllCourses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Get)("getByName/:name"),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourseByName", null);
__decorate([
    (0, common_1.Get)("getByCode/:code"),
    __param(0, (0, common_1.Param)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourseByCode", null);
__decorate([
    (0, common_1.Get)("getByYear/:year"),
    __param(0, (0, common_1.Param)("year")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourseByYear", null);
__decorate([
    (0, common_1.Get)("getCourses/:year/:semester"),
    __param(0, (0, common_1.Param)("year")),
    __param(1, (0, common_1.Param)("semester")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Get)("getCourses/:year/:semester/:department"),
    __param(0, (0, common_1.Param)("year")),
    __param(1, (0, common_1.Param)("semester")),
    __param(2, (0, common_1.Param)("department")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCoursesByDepartment", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map