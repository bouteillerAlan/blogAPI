import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import { AuthorService } from '../service/author.service';
import { DtoAuthor } from '../dto/author.dto';
import { DtoAuthorUpdate } from '../dto/author.update.dto';
import { isMongoId } from '../function/mongo_id';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    // check if a name exist
    private async checkName(name): Promise<any> {
        const data = await this.authorService.getAuthorByName(name);
        return data.length === 0;
    }

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
        if (this.checkName(name)) {
            return {status : 'error', message : 'name already exist'};
        } else {
            const res: any = await this.authorService.setAuthor(body);
            if (res.errors) {
                return {status : 'error', message : res.errors};
            } else {
                return {status : 'ok', message : res};
            }
        }
    }

    // !!! this route encrypt the password
    // !!! DO NOT USE IN PROD (cause : man in the middle!)
    @Post('add/encrypted')
    async setAuthorEncrypted(@Body() body: DtoAuthor): Promise<object> {
        if (this.checkName(name)) {
            return {status : 'error', message : 'name already exist'};
        } else {
            const res: any = await this.authorService.setAuthorEncrypted(body);
            if (res.errors) {
                return {status : 'error', message : res.errors};
            } else {
                return {status : 'ok', message : res};
            }
        }
    }

    @Put(':id')
    async updateAuthor(@Param('id') id, @Body() body: DtoAuthorUpdate): Promise<any> {
        if (this.checkName(name)) {
            return {status : 'error', message : 'name already exist'};
        } else {
            if (!isMongoId(id)) {
                throw new NotFoundException('This id dosen\'t exist.');
            }
            return await this.authorService.updateAuthor(id, body);
        }
    }

    @Delete(':id')
    async deleteAuthor(@Param('id') id): Promise<any> {
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
