import { z } from 'zod';

const errorResponseBodySchema = z.object({
  error: z.object({
    descriptionCode: z.string(),
    message: z.string(),
    path: z.string(),
    timestamp: z.string().datetime(),
    details: z.unknown().optional(),
  }),
});

type ErrorResponseBody = z.infer<typeof errorResponseBodySchema>;

type ErrorResponse = ErrorResponseBody['error'];

const getError = function (body: string): ErrorResponse {
  const bodyParsed = JSON.parse(body) as unknown;

  return errorResponseBodySchema.parse(bodyParsed).error;
};

export { ErrorResponse, getError };
