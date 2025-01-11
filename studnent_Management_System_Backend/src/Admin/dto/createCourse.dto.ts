import { IsString, IsInt, IsEnum } from 'class-validator';
import { Department, Semester } from "@prisma/client"; // Assuming enums are in a separate file

export class CreateCourseDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly code: string;

  @IsEnum(Department)
  readonly department: Department;

  @IsInt()
  readonly year: number;

  @IsEnum(Semester)
  readonly semester: Semester;
}
