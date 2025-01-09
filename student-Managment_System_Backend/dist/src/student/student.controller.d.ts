import { StudentService } from './student.service';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    addCourseToStudent(studentId: number, courseId: number): Promise<{
        updatedStudent: {
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
        };
    }>;
    addCoursesToStudent(studentId: number, courseNames: string[]): Promise<{
        updatedStudent: {
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
        };
    }>;
    deleteCourse(studentId: number, courseId: number): Promise<{
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
}
