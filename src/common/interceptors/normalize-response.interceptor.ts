import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class NormalizeResponseInterceptor<T>
  implements NestInterceptor<T, { data: T }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ data: T }> {
    return next.handle().pipe(
      map((data: T) => {
        const response = context.switchToHttp().getResponse<Response>();

        if (response.statusCode > 200 && response.statusCode < 300) {
          response.statusCode = 200;
        }

        return {
          data: data,
        };
      }),
    );
  }
}
