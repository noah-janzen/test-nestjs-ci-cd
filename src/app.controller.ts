import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { PersonDto } from './dto/person.dto';

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
  registerPerson(@Body() person: PersonDto) {
    this.logger.debug(JSON.stringify(person));
    return;
  }
}
