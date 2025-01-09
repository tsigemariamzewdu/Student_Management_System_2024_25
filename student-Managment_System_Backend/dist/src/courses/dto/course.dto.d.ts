import { Department, Semester } from "@prisma/client";
export declare class CourseDTO {
    name: string;
    code: string;
    department: Department;
    semester: Semester;
    year: number;
    createdAt: string;
    updatedAt: string;
}
