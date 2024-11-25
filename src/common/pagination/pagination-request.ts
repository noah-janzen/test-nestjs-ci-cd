import { z } from 'zod';

const paginationRequestSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().positive().default(10),
});

type PaginationRequest = z.infer<typeof paginationRequestSchema>;

export { paginationRequestSchema, PaginationRequest };
