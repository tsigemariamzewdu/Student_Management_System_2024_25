import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from './dto/createCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStudents(query: {
        department?: string;
        year?: number;
    }): Promise<{
        id: number;
        userId: number;
        year: number;
        department: import("@prisma/client").$Enums.Department;
    }[]>;
    getCourses(): Promise<{
        id: number;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        semester: import("@prisma/client").$Enums.Semester;
    }[]>;
    getCourse(id: number): Promise<{
        id: number;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        semester: import("@prisma/client").$Enums.Semester;
    }>;
    addCourse(createCourseDto: CreateCourseDto): Promise<{
        id: number;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        semester: import("@prisma/client").$Enums.Semester;
    }>;
    deleteCourse(id: number): Promise<void>;
    updateCourse(id: number, updateCourseDto: UpdateCourseDto): Promise<{
        id: number;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        semester: import("@prisma/client").$Enums.Semester;
    }>;
}
