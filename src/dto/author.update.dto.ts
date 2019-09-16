import {IsOptional, IsString} from 'class-validator';

export class DtoAuthorUpdate {
    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly token: string;
}
