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
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        userId: number;
    }[]>;
    getCourses(): Promise<{
        name: string;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        semester: import("@prisma/client").$Enums.Semester;
    }[]>;
    getCourse(id: number): Promise<{
        name: string;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        semester: import("@prisma/client").$Enums.Semester;
    }>;
    addCourse(createCourseDto: CreateCourseDto): Promise<{
        name: string;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        semester: import("@prisma/client").$Enums.Semester;
    }>;
    deleteCourse(id: number): Promise<void>;
    updateCourse(id: number, updateCourseDto: UpdateCourseDto): Promise<{
        name: string;
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        semester: import("@prisma/client").$Enums.Semester;
    }>;
}
