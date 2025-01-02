import { IsEmail,IsString,IsEnum, IsNotEmpty,MinLength,IsOptional } from "class-validator";

export class singupDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;


    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password:string

    @IsNotEmpty()
    role:string;

    


}