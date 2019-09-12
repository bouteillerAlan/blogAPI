import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../service/hello.service';

@Controller()
// just a helloworld controller for test or ping
export class HelloController {
  constructor(private readonly appService: HelloService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
