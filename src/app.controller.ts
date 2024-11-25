import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { personSchema } from './dto-validation/person.schema';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getTime(): number {
    return this.appService.getTime();
  }

  @Get('greet')
  greet(@Query('name') name: string): string {
    return this.appService.greet(name);
  }

  @Get('randomNumber')
  randomNumber(): number {
    return this.appService.getRandomNumber();
  }

  @Post('register-person')
  registerPerson(@Body() person: unknown) {
    personSchema.parse(person);
  }
}
