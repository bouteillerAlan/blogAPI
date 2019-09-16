import {IsOptional, IsString} from 'class-validator';

export class DtoCategoriesUpdate {
    @IsOptional()
    @IsString()
    readonly name: string;
}
