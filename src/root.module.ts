import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelloModule } from './module/hello.module';
import { ContentModule } from './module/content.module';
import { CategoriesModule } from './module/categories.module';
import { AuthorModule } from './module/author.module';
import { AuthModule } from './module/auth.module';
import { ConfigService } from './conf/config.service';
import { ConfigModule } from './conf/config.module';
import {PugAdapter, MailerModule} from '@nest-modules/mailer';
import {MailModule} from './module/mail.module';

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
        // mailer
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (env: ConfigService) => ({
                transport: `smtps://${env.get('smtp_user')}:${env.get('smtp_pass')}@${env.get('smtp_host')}`,
                defaults: {
                    from: `"${env.get('smtp_user_from')}" <${env.get('smtp_mail_from')}>`,
                },
                template: {
                    dir: env.get('smtp_dirname'),
                    adapter: new PugAdapter(), // or new PugAdapter()
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
        MailModule,
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
