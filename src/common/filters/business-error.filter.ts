import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { BusinessError } from '../errors/business.error';

interface ErrorResponseBody {
  error: {
    descriptionCode: string;
    message: string;
    path: string;
    timestamp: string;
  };
}

@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter {
  catch(error: BusinessError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { message, descriptionCode } = error;

    const responseBody: ErrorResponseBody = {
      error: {
        descriptionCode,
        message,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    };

    response.status(200).json(responseBody);
  }
}
