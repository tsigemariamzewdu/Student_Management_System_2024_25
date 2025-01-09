import { IsString, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { Department, Semester} from "@prisma/client";

export class CourseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(Department) 
  department: Department;

  @IsNotEmpty()
  @IsEnum(Semester) 
  semester:Semester ;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  createdAt: string;

  @IsNotEmpty()
  @IsString()
  updatedAt: string;
}
