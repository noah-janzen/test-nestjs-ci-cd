import { z } from 'zod';

const dataResponseBodySchema = z.object({
  data: z.unknown(),
});

type DataResponseBody = z.infer<typeof dataResponseBodySchema>;

const getData = function (body: string): DataResponseBody['data'] {
  const bodyParsed = JSON.parse(body) as unknown;

  return dataResponseBodySchema.parse(bodyParsed).data;
};

export { getData };
