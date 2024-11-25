import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessErrorFilter } from './common/filters/business-error.filter';
import { ZodErrorFilter } from './common/filters/zod-error.filter';
import { NormalizeResponseInterceptor } from './common/interceptors/normalize-response.interceptor';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: BusinessErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ZodErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NormalizeResponseInterceptor,
    },
  ],
})
export class AppModule {}
