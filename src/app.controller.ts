import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { personSchema } from './dto/person.dto';

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

  @Get('randomNumber')
  randomNumber(): number {
    return this.appService.getRandomNumber();
  }

  @Post('register-person')
  registerPerson(@Body() body: unknown) {
    const person = personSchema.parse(body);

    this.appService.registerPerson(person);
  }
}
