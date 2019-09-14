import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import { AuthorService } from '../service/author.service';
import { DtoAuthor } from '../dto/author.dto';
import { isMongoId } from '../function/mongo_id';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get(':id')
    async getAuthor(@Param('id') id): Promise<object> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }

        const data = await this.authorService.getAuthor(id);

        // if no data
        if (data.length === 0) {
            throw new NotFoundException('No data.');
        }

        return {status: 'ok', data};
    }

    @Post('add')
    async setAuthor(@Body() body: DtoAuthor): Promise<object> {
        const res = await this.authorService.setAuthor(body);
        if (res['errors']) {
            return {status : 'error', message : res['errors']}
        } else {
            return {status : 'ok', message : res}
        }
    }

    @Put(':id')
    updateAuthor(@Param('id') id, @Body() body: DtoAuthor): object {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }
        return this.authorService.updateAuthor(id, body);
    }

    @Delete(':id')
    async deleteAuthor(@Param('id') id): Promise<object> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }
        const res = await this.authorService.deleteAuthor(id);
        if ( res['deletedCount'] <= 0) {
            return {status : 'error', message : res}
        } else {
            return {status : 'ok', message : res}
        }
    }
}
