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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const createCourse_dto_1 = require("./dto/createCourse.dto");
const common_2 = require("@nestjs/common");
const updateCourse_dto_1 = require("./dto/updateCourse.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getStudents(department, year) {
        const parsedYear = year ? parseInt(year, 10) : undefined;
        if (year && isNaN(parsedYear)) {
            throw new common_1.BadRequestException('Year must be a valid number');
        }
        return this.adminService.getStudents({ department, year: parsedYear });
    }
    async getCourses() {
        return this.adminService.getCourses();
    }
    async getCourse(id) {
        return this.adminService.getCourse(id);
    }
    async addCourse(createCourseDto) {
        return this.adminService.addCourse(createCourseDto);
    }
    async deleteCourse(id) {
        return this.adminService.deleteCourse(id);
    }
    async updateCourse(id, updateCourseDto) {
        return this.adminService.updateCourse(id, updateCourseDto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('students'),
    __param(0, (0, common_1.Query)('department')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Get)('courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Get)('courses/:id'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getCourse", null);
__decorate([
    (0, common_1.Post)('courses'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCourse_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addCourse", null);
__decorate([
    (0, common_1.Delete)("courses/:id"),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Patch)("courses/:id"),
    __param(0, (0, common_1.Param)("id", common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateCourse_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCourse", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map