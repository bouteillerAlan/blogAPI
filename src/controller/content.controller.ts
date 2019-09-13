import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import { ContentService } from '../service/content.service';
import { DtoContent } from '../dto/content.dto';
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
            throw new NotFoundException('This id dosen\'t exist.');
        }

        return {status: 'ok', data};
    }

    @Post('add')
    setContent(@Body() body: DtoContent): object {
        return this.contentService.setContent(body);
    }

    @Put(':id')
    updateContent(@Param('id') id, @Body() body: DtoContent): object {
        return this.contentService.updateContent(id, body);
    }

    @Delete(':id')
    deleteContent(@Param('id') id): string {
        return this.contentService.deleteContent(id);
    }
}
