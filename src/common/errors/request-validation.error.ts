import { ValidationError as NestValidationError } from '@nestjs/common';

import { BaseError } from './base.error';

interface ValidationError {
  property: string;
  value: unknown;
  constraints?: Record<string, string>;
  children?: ValidationError[];
}

export class RequestValidationError extends BaseError {
  validationErrors: ValidationError[];

  constructor(errors: NestValidationError[]) {
    super({
      message: 'Request validation failed',
      descriptionCode: 'REQUEST_VALIDATION_ERROR',
    });

    this.validationErrors =
      RequestValidationError.buildValidationErrors(errors);
  }

  static buildValidationErrors(
    errors: NestValidationError[],
  ): ValidationError[] {
    const buildValidationError = function (
      error: NestValidationError,
    ): ValidationError {
      return {
        property: error.property,
        value: error.value,
        constraints: error.constraints,
        children: error.children
          ? error.children.map(buildValidationError)
          : undefined,
      };
    };

    return errors.map(buildValidationError);
  }

  getDetails() {
    return {
      validationErrors: this.validationErrors,
    };
  }
}
