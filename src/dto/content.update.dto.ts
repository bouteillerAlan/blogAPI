import {IsOptional, IsString} from 'class-validator';

export class DtoContentUpdate {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly id_author: string;

    @IsOptional()
    @IsString()
    readonly id_category: string;

    @IsOptional()
    date: any;

    @IsOptional()
    @IsString()
    readonly content: string;
}
