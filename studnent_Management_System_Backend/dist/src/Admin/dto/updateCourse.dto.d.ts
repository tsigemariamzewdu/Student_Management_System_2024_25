import { Department, Semester } from '@prisma/client';
export declare class UpdateCourseDto {
    name?: string;
    code?: string;
    department?: Department;
    year?: number;
    semester?: Semester;
}
