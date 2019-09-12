import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HelloModule } from './module/hello.module';

@Module({
    imports: [
        // connect to the mongodb database
        MongooseModule.forRoot('mongodb://172.11.111.2/blog', { useNewUrlParser: true }),
        // ping module
        HelloModule,
        // other module
    ],
})

export class RootModule {}
