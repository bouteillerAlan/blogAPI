import { Module } from '@nestjs/common';
import { CategoriesController } from '../controller/categories.controller';
import { CategoriesService } from '../service/categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchema } from '../schema/categories.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Categories', schema: CategoriesSchema }])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})

export class CategoriesModule {}
