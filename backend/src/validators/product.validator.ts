import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string({ error: 'Product name is required' })
    .trim()
    .min(1, 'Product name is required'),

  price: z
    .number({ error: 'Price must be a number' })
    .positive('Price must be a positive number'),

  image: z
    .string({ error: 'Product image is required' })
    .trim()
    .min(1, 'Product image is required'),

  description: z
    .string({ error: 'Product description is required' })
    .trim()
    .min(1, 'Product description is required'),
});
