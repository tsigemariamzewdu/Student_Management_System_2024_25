import { PrismaService } from 'prisma/prisma.service';
import { singupDto } from 'src/auth/dto/signup.dto';
export declare class StudentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addCourseToStudent(studentId: number, courseId: number): Promise<{
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
    } & {
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        userId: number;
    }>;
    addCoursesToStudent(studentId: number, courseNames: string[]): Promise<{
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
    } & {
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        userId: number;
    }>;
    deleteCourse(studnetId: number, courseId: number): Promise<{
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
    } & {
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        userId: number;
    }>;
    deleteAllCourses(studentId: number): Promise<{
        message: string;
    }>;
    findStudentByUserId(userId: number): Promise<{
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        userId: number;
    }>;
    createStudent(signupDto: singupDto, userId: number): Promise<{
        year: number;
        department: import("@prisma/client").$Enums.Department;
        id: number;
        userId: number;
    }>;
    async: any;
}
