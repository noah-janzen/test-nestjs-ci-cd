import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodError } from 'zod';

import { ErrorResponseBody } from './model/error-response-body';

@Catch(ZodError)
export class ZodErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ZodErrorFilter.name);

  catch(error: ZodError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    this.logger.debug(
      `Request Validation Error: ${JSON.stringify(error.errors)}`,
    );

    const responseBody: ErrorResponseBody = {
      error: {
        descriptionCode: 'REQUEST_VALIDATION_ERROR',
        message: 'Request validation failed',
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    };

    response.status(400).json(responseBody);
  }
}
