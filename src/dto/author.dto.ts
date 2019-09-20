import {IsOptional, IsString} from 'class-validator';

export class DtoAuthor {
    @IsString()
    readonly name: string;

    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly token: string;
}
