import { Module } from '@nestjs/common';

import { HelloModule } from './module/hello.module';

@Module({
    imports: [HelloModule],
})

export class RootModule {}
