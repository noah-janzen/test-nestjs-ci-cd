import { z } from 'zod';

import { ErrorResponse } from './get-error';

const baseValidationErrorSchema = z.object({
  property: z.string(),
  value: z.unknown(),
  constraints: z.record(z.string(), z.string()).optional(),
});

type ValidationError = z.infer<typeof baseValidationErrorSchema> & {
  children?: ValidationError[];
};

const validationErrorSchema: z.ZodType<ValidationError> =
  baseValidationErrorSchema.extend({
    children: z.lazy(() => z.array(validationErrorSchema)).optional(),
  });

const validationErrorsSchema = z.array(validationErrorSchema);

type ValidationErrors = z.infer<typeof validationErrorsSchema>;

const getValidationErrors = function ({
  details,
}: ErrorResponse): ValidationErrors {
  if (typeof details !== 'object' || details === null) {
    throw new Error('Expected details to be an object');
  }

  if (!('validationErrors' in details)) {
    throw new Error('Expected details to have validationErrors field');
  }

  return validationErrorsSchema.parse(details.validationErrors);
};

export { getValidationErrors };
