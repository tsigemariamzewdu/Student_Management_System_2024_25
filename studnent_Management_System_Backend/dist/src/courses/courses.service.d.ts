import { PrismaService } from 'prisma/prisma.service';
import { Semester, Department } from '@prisma/client';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        id: number;
        name: string;
        code: string;
        department: import("@prisma/client").$Enums.Department;
        year: number;
        createdAt: Date;
        updatedAt: Date;
        semester: import("@prisma/client").$Enums.Semester;
    }[]>;
    getByName(name: string): Promise<{
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
    getByCode(code: string): Promise<{
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
    getByYear(year: number): Promise<{
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
    getByYearAndSemester(year: number, semester: Semester): Promise<{
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
    getByYearSemesterAndDepartment(year: number, semester: Semester, department: Department): Promise<{
        courseNames: string[];
    }>;
}
