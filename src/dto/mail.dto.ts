import {IsBoolean, IsString} from 'class-validator';

export class DtoMail {
    @IsString()
    readonly lastName: string;

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly mail: string;

    @IsString()
    readonly message: string;

    @IsBoolean()
    readonly checkGdpr: boolean;
}
