import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { RequestValidationError } from '../errors/request-validation.error';

export function getValidationPipe() {
  return new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors: ValidationError[]) =>
      new RequestValidationError(errors),
  });
}
