import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseErrorFilter } from './common/filters/base-error.filter';
import { NormalizeResponseInterceptor } from './common/interceptors/normalize-response.interceptor';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: BaseErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NormalizeResponseInterceptor,
    },
  ],
})
export class AppModule {}
