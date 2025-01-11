import { Department, Semester } from '@prisma/client';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  department?: Department;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsString()
  semester?: Semester;
}
