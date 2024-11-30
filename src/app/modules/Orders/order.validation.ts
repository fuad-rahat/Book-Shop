import { z } from 'zod';
import mongoose from 'mongoose';

const orderValidationSchema = z.object({
  email: z.string().email('Invalid email address'),
  product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid product ID',
  }),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalPrice: z.number().min(0, 'Total price must be a positive number'),
});

export default orderValidationSchema;