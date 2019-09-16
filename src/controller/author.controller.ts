import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import { AuthorService } from '../service/author.service';
import { DtoAuthor } from '../dto/author.dto';
import { isMongoId } from '../function/mongo_id';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get(':id')
    async getAuthorById(@Param('id') id): Promise<object> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }

        const data = await this.authorService.getAuthorById(id);

        // if no data
        if (data.length === 0) {
            throw new NotFoundException('No data.');
        }

        return {status: 'ok', data};
    }

    @Get('name/:name')
    async getAuthorByName(@Param('name') name): Promise<object> {

        const data = await this.authorService.getAuthorByName(name);

        // if no data
        if (data.length === 0) {
            throw new NotFoundException('No data.');
        }

        return {status: 'ok', data};
    }

    // !!! here i consider that password is encrypted with bcrypt in front
    @Post('add')
    async setAuthor(@Body() body: DtoAuthor): Promise<object> {
        const res: any = await this.authorService.setAuthor(body);
        if (res.errors) {
            return {status : 'error', message : res.errors};
        } else {
            return {status : 'ok', message : res};
        }
    }

    // !!! this route encrypt the password
    // !!! DO NOT USE IN PROD (cause : man in the middle!)
    // #todo check if username already exist
    @Post('add/encrypted')
    async setAuthorEncrypted(@Body() body: DtoAuthor): Promise<object> {
        const res: any = await this.authorService.setAuthorEncrypted(body);
        if (res.errors) {
            return {status : 'error', message : res.errors};
        } else {
            return {status : 'ok', message : res};
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
        const res: any = await this.authorService.deleteAuthor(id);
        if ( res.deletedCount <= 0) {
            return {status : 'error', message : res};
        } else {
            return {status : 'ok', message : res};
        }
    }
}
