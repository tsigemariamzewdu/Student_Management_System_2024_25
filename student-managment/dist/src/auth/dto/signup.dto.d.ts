import { Department, Role } from "@prisma/client";
export declare class singupDto {
    name: string;
    email: string;
    password: string;
    role: Role;
    year: number;
    department: Department;
}
