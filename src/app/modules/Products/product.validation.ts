import { z } from 'zod';

const productValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious']),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(0, 'Quantity must be a positive number'),
  inStock: z.boolean(),
});

export default productValidationSchema;
