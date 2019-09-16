import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import { ContentService } from '../service/content.service';
import { DtoContent } from '../dto/content.dto';
import {DtoContentUpdate} from '../dto/content.update.dto';
import { isMongoId } from '../function/mongo_id';

@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) {}

    @Get(':id')
    async getContent(@Param('id') id): Promise<object> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }

        const data = await this.contentService.getContent(id);

        // if no data
        if (data.length === 0) {
            throw new NotFoundException('No data.');
        }

        return {status: 'ok', data};
    }

    @Post('add')
    async setContent(@Body() body: DtoContent): Promise<object> {
        const res: any = await this.contentService.setContent(body);
        if (res.errors) {
            return {status : 'error', message : res.errors};
        } else {
            return {status : 'ok', message : res};
        }
    }

    @Put(':id')
    async updateContent(@Param('id') id, @Body() body: DtoContentUpdate): Promise<any> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }
        return await this.contentService.updateContent(id, body);
    }

    @Delete(':id')
    async deleteContent(@Param('id') id): Promise<any> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }
        const res: any = await this.contentService.deleteContent(id);
        if ( res.deletedCount <= 0) {
            return {status : 'error', message : res};
        } else {
            return {status : 'ok', message : res};
        }
    }
}
