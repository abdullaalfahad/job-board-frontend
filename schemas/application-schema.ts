import { z } from 'zod';

export const applicationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  cv: z.string().min(1, 'CV or message is required'),
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;
