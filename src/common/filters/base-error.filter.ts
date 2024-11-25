import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { BaseError } from '../errors/base.error';

interface ErrorResponseBody {
  error: {
    descriptionCode: string;
    message: string;
    path: string;
    timestamp: string;
    details?: Record<string, unknown>;
  };
}

@Catch(BaseError)
export class BaseErrorFilter implements ExceptionFilter {
  catch(error: BaseError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { message, descriptionCode } = error;
    const details = error.getDetails();

    const responseBody: ErrorResponseBody = {
      error: {
        descriptionCode,
        message,
        details,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    };

    response.status(400).json(responseBody);
  }
}
