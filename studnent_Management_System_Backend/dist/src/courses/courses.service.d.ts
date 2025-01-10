import { PrismaService } from 'prisma/prisma.service';
import { Semester, Department } from '@prisma/client';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        name: string;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        semester: import("@prisma/client").$Enums.Semester;
    }[]>;
    getByName(name: string): Promise<{
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
    getByCode(code: string): Promise<{
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
    getByYear(year: number): Promise<{
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
    getByYearAndSemester(year: number, semester: Semester): Promise<{
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
    getByYearSemesterAndDepartment(year: number, semester: Semester, department: Department): Promise<{
        courseNames: string[];
    }>;
}
