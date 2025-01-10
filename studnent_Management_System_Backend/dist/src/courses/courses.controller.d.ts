import { CoursesService } from './courses.service';
import { Department, Semester } from "@prisma/client";
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    getAllCourses(): Promise<{
        name: string;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        semester: import("@prisma/client").$Enums.Semester;
    }[]>;
    getCourseByName(name: string): Promise<{
        course: {
            name: string;
            year: number;
            department: import("@prisma/client").$Enums.Department;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            semester: import("@prisma/client").$Enums.Semester;
        }[];
    }>;
    getCourseByCode(code: string): Promise<{
        course: {
            name: string;
            year: number;
            department: import("@prisma/client").$Enums.Department;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            semester: import("@prisma/client").$Enums.Semester;
        }[];
    }>;
    getCourseByYear(year: string): Promise<{
        courses: {
            name: string;
            year: number;
            department: import("@prisma/client").$Enums.Department;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            semester: import("@prisma/client").$Enums.Semester;
        }[];
    }>;
    getCourses(year: string, semester: string): Promise<{
        courses: {
            name: string;
            year: number;
            department: import("@prisma/client").$Enums.Department;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            semester: import("@prisma/client").$Enums.Semester;
        }[];
    }>;
    getCoursesByDepartment(year: string, semester: Semester, department: Department): Promise<{
        courseNames: string[];
    }>;
}
