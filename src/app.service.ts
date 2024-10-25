import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTime(): number {
    return Date.now();
  }

  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}
