import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import { CategoriesService } from '../service/categories.service';
import { DtoCategories } from '../dto/categories.dto';
import { DtoCategoriesUpdate } from '../dto/categories.update.dto';
import { isMongoId } from '../function/mongo_id';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    // check if a name exist
    private async checkCategories(categories): Promise<any> {
        const data = await this.categoriesService.getCategoriesByName(categories);
        return !(data.length === 0);
    }

    @Get(':id')
    async getCategories(@Param('id') id): Promise<object> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }

        const data = await this.categoriesService.getCategoriesById(id);

        // if no data
        if (data.length === 0) {
            throw new NotFoundException('No data.');
        }

        return {status: 'ok', data};
    }

    @Post('add')
    async setCategories(@Body() body: DtoCategories): Promise<object> {
        const nameExist = await this.checkCategories(body.name);
        if (nameExist) {
            return {status : 'error', message : 'name already exist'};
        } else {
            const res: any = await this.categoriesService.setCategories(body);
            if (res.errors) {
                return {status : 'error', message : res.errors};
            } else {
                return {status : 'ok', message : res};
            }
        }
    }

    @Put(':id')
    async updateCategories(@Param('id') id, @Body() body: DtoCategoriesUpdate): Promise<object> {
        let nameExist = false;
        if (body.name) {
            nameExist = await this.checkCategories(body.name);
        }
        if (nameExist) {
            return {status : 'error', message : 'name already exist'};
        } else {
            if (!isMongoId(id)) {
                throw new NotFoundException('This id dosen\'t exist.');
            }
            return await this.categoriesService.updateCategories(id, body);
        }
    }

    @Delete(':id')
    async deleteCategories(@Param('id') id): Promise<object> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }
        const res: any = await this.categoriesService.deleteCategories(id);
        if ( res.deletedCount <= 0) {
            return {status : 'error', message : res};
        } else {
            return {status : 'ok', message : res};
        }
    }
}
