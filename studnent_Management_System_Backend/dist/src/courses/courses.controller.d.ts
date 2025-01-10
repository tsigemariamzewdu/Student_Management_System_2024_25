import { CoursesService } from './courses.service';
import { Department, Semester } from "@prisma/client";
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    getAllCourses(): Promise<{
        id: number;
        name: string;
        code: string;
        department: import("@prisma/client").$Enums.Department;
        year: number;
        createdAt: Date;
        updatedAt: Date;
        semester: import("@prisma/client").$Enums.Semester;
    }[]>;
    getCourseByName(name: string): Promise<{
        course: {
            id: number;
            name: string;
            code: string;
            department: import("@prisma/client").$Enums.Department;
            year: number;
            createdAt: Date;
            updatedAt: Date;
            semester: import("@prisma/client").$Enums.Semester;
        }[];
    }>;
    getCourseByCode(code: string): Promise<{
        course: {
            id: number;
            name: string;
            code: string;
            department: import("@prisma/client").$Enums.Department;
            year: number;
            createdAt: Date;
            updatedAt: Date;
            semester: import("@prisma/client").$Enums.Semester;
        }[];
    }>;
    getCourseByYear(year: string): Promise<{
        courses: {
            id: number;
            name: string;
            code: string;
            department: import("@prisma/client").$Enums.Department;
            year: number;
            createdAt: Date;
            updatedAt: Date;
            semester: import("@prisma/client").$Enums.Semester;
        }[];
    }>;
    getCourses(year: string, semester: string): Promise<{
        courses: {
            id: number;
            name: string;
            code: string;
            department: import("@prisma/client").$Enums.Department;
            year: number;
            createdAt: Date;
            updatedAt: Date;
            semester: import("@prisma/client").$Enums.Semester;
        }[];
    }>;
    getCoursesByDepartment(year: string, semester: Semester, department: Department): Promise<{
        courseNames: string[];
    }>;
}
