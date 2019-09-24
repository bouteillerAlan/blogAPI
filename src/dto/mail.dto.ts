import {IsBoolean, IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class DtoMail {
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly mail: string;

    @IsString()
    @IsNotEmpty()
    readonly message: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly checkGdpr: boolean;
}
