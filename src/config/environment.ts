import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

type Environment = z.infer<typeof schema>;

export { schema, Environment };
