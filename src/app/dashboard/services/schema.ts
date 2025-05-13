import { z } from 'zod';

export const serviceFormSchema = z.object({
  title: z.string().min(1, 'Title must be at least 1 characters'),
  description: z.string().min(1, 'Description must be at least 1 characters'),
  price: z.number().min(0.0, 'Must include a price'),
});
