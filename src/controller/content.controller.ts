import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ContentService } from '../service/content.service';

@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) {}

    @Get('')
    getContent(): object {
        return this.contentService.getContent();
    }

    @Post('/add')
    setContent(): string {
        return this.contentService.setContent();
    }

    @Put('/:id')
    updateContent(): string {
        return this.contentService.updateContent();
    }

    @Delete('/:id')
    deleteContent(): string {
        return this.contentService.deleteContent();
    }
}
