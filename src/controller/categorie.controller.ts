import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import { CategorieService } from '../service/categorie.service';
import { DtoCategorie } from '../dto/categorie.dto';
import { isMongoId } from '../function/mongo_id';

@Controller('categorie')
export class CategorieController {
    constructor(private readonly categorieService: CategorieService) {}

    @Get(':id')
    async getCategorie(@Param('id') id): Promise<object> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }

        const data = await this.categorieService.getCategorie(id);

        // if no data
        if (data.length === 0) {
            throw new NotFoundException('No data.');
        }

        return {status: 'ok', data};
    }

    @Post('add')
    async setCategorie(@Body() body: DtoCategorie): Promise<object> {
        const res: any = await this.categorieService.setCategorie(body);
        if (res.errors) {
            return {status : 'error', message : res.errors};
        } else {
            return {status : 'ok', message : res};
        }
    }

    @Put(':id')
    updateCategorie(@Param('id') id, @Body() body: DtoCategorie): object {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }
        return this.categorieService.updateCategorie(id, body);
    }

    @Delete(':id')
    async deleteCategorie(@Param('id') id): Promise<object> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }
        const res: any = await this.categorieService.deleteCategorie(id);
        if ( res.deletedCount <= 0) {
            return {status : 'error', message : res};
        } else {
            return {status : 'ok', message : res};
        }
    }
}
