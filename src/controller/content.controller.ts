import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { ContentService } from '../service/content.service';
import { DtoContent } from '../dto/content.dto';
import {DtoContentUpdate} from '../dto/content.update.dto';
import { isMongoId } from '../function/mongo_id';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) {}

    @Get(':id')
    async getContent(@Req() req, @Param('id') id): Promise<object> {
        if (!isMongoId(id)) {
            throw new NotFoundException('This id dosen\'t exist.');
        }

        const data = await this.contentService.getContent(id);

        // if no data
        if (data.length === 0) {
            throw new NotFoundException('No data.');
        }

        return {status: true, data, user: req.user};
    }

    @Post('add')
    async setContent(@Body() body: DtoContent): Promise<object> {
        const res: any = await this.contentService.setContent(body);
        if (res.errors) {
            return {status : false, message : res.errors};
        } else {
            return {status : true, message : res};
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
            return {status : false, message : res};
        } else {
            return {status : true, message : res};
        }
    }
}
