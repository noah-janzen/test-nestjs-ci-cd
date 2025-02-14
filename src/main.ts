import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.get('PORT');

  await app.listen(PORT);
  Logger.log(`Server is running port ${PORT}`, 'Bootstrap');
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
