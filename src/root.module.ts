import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvService } from './env';
import { HelloModule } from './module/hello.module';
import { ContentModule } from './module/content.module';
import { CategorieModule } from "./module/categorie.module";

const env = new EnvService().getEnv();

@Module({
    imports: [
        // connect to the mongodb database
        MongooseModule.forRoot(`mongodb://${env.db_user}:${env.db_pass}@${env.db_uri}:${env.db_name}/${env.db_name}`, env.db_option),
        // ping module
        HelloModule,
        // data module
        ContentModule,
        CategorieModule,
    ],
})

export class RootModule {}
