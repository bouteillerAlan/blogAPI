import { Module } from '@nestjs/common';
import { CategorieController } from '../controller/categorie.controller';
import { CategorieService } from '../service/categorie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorieSchema } from '../schema/categorie.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Categorie', schema: CategorieSchema }])],
    controllers: [CategorieController],
    providers: [CategorieService],
})

export class CategorieModule {}
