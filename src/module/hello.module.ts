import { Module } from '@nestjs/common';
import { HelloController } from '../controller/hello.controller';
import { HelloService } from '../service/hello.service';

@Module({
  controllers: [HelloController],
  providers: [HelloService],
})

export class HelloModule {}
