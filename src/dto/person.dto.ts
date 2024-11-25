import { z } from 'zod';

const personSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

type Person = z.infer<typeof personSchema>;

export { personSchema, Person };
