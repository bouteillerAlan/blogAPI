import { Module } from '@nestjs/common';
import { AuthorController } from '../controller/author.controller';
import { AuthorService } from '../service/author.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from '../schema/author.schema';
import { ConfigModule } from '../conf/config.module';

@Module({
    imports: [ConfigModule, MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }])],
    exports: [AuthorService],
    controllers: [AuthorController],
    providers: [AuthorService],
})

export class AuthorModule {}
