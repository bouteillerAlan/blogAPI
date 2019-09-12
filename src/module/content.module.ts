import { Module } from '@nestjs/common';
import { ContentController } from '../controller/content.controller';
import { ContentService } from '../service/content.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from '../schema/content.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema }])],
    controllers: [ContentController],
    providers: [ContentService],
})

export class ContentModule {}
