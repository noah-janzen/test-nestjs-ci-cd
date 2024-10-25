import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTime(): number {
    return this.appService.getTime();
  }

  @Get('greet')
  greet(@Query('name') name: string): string {
    return this.appService.greet(name);
  }
}
