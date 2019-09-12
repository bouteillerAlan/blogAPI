import { Module } from '@nestjs/common';
import { ContentController } from '../controller/content.controller';
import { ContentService } from '../service/content.service';

@Module({
    controllers: [ContentController],
    providers: [ContentService],
})

export class ContentModule {}
