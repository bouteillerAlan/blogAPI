import { Module } from '@nestjs/common';
import { AuthorController } from '../controller/author.controller';
import { AuthorService } from '../service/author.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from '../schema/author.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }])],
    controllers: [AuthorController],
    providers: [AuthorService],
})

export class AuthorModule {}
