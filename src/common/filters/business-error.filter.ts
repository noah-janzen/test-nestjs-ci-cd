import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { BusinessError } from '../errors/business.error';
import { ErrorResponseBody } from './model/error-response-body';

@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(BusinessErrorFilter.name);

  catch(error: BusinessError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { message, descriptionCode } = error;

    this.logger.debug(`Business Error: ${descriptionCode}. ${message}.`);

    const responseBody: ErrorResponseBody = {
      error: {
        descriptionCode,
        message,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    };

    response.status(400).json(responseBody);
  }
}
