import { Injectable, Logger } from '@nestjs/common';

import { PaginationRequest } from './common/pagination/pagination-request';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getTime(): number {
    return Date.now();
  }

  greet(name: string): string {
    return `Hello, ${name}!`;
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 101);
  }

  registerPerson(person: { firstName: string; lastName: string }) {
    this.logger.debug(`Registering person: ${JSON.stringify(person)}`);

    return person;
  }

  findEvents({ page, size }: PaginationRequest) {
    return Array.from({ length: size }, (_, i) => i + (page - 1) * size);
  }
}
