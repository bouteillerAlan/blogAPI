import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelloModule } from './module/hello.module';
import { ContentModule } from './module/content.module';
import { CategoriesModule } from './module/categories.module';
import { AuthorModule } from './module/author.module';
import { AuthModule } from './module/auth.module';
import { ConfigService } from './conf/config.service';
import { ConfigModule } from './conf/config.module';

@Module({
    imports: [
        // connect to the mongodb database
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (env: ConfigService) => ({
                uri: `mongodb://${env.get('db_user')}:${env.get('db_pass')}@${env.get('db_uri')}:${env.get('db_port')}/${env.get('db_name')}`,
                useNewUrlParser: true,
            }),
            inject: [ConfigService],
        }),
        // ping module
        HelloModule,
        // auth module
        AuthModule,
        // data module
        ContentModule,
        CategoriesModule,
        AuthorModule,
    ],
})

export class RootModule {}
