import { IsEmail,IsString,IsEnum, IsNotEmpty,IsNumber } from "class-validator";
import { Department, Role } from "@prisma/client";

export class singupDto{
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    
    @IsNotEmpty()
    role: Role;
  
    @IsNumber()
    year: number;
  
    @IsString()
    department: Department;
    


}