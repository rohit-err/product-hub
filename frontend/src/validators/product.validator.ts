import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().trim().min(1, 'Product name is required'),
  price: z.number({ message: 'Price must be a number' }).positive('Price must be greater than 0'),
  image: z.string().trim().min(1, 'Product image URL is required'),
  description: z.string().trim().min(1, 'Product description is required'),
});

export type ProductData = z.infer<typeof productSchema>;
