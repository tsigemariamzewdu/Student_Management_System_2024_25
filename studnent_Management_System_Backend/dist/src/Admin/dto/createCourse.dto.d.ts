import { Department, Semester } from "@prisma/client";
export declare class CreateCourseDto {
    readonly name: string;
    readonly code: string;
    readonly department: Department;
    readonly year: number;
    readonly semester: Semester;
}
