import mongoose, { Schema, model, Model } from 'mongoose';
import { ProductModel } from '../Products/product.model';
import { Order } from './order.interface';

// Define the Order schema
const OrderSchema = new Schema<Order>({
  email: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
  quantity: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true, min: 0 },
}, { timestamps: true });

// Static method to create an order
OrderSchema.statics.createOrder = async function (
  email: string,
  productId: string,
  quantity: number
): Promise<Order> {
  const productObjectId = new mongoose.Types.ObjectId(productId);

  const product = await ProductModel.findById(productObjectId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.quantity < quantity) {
    throw new Error('Insufficient stock');
  }

  const totalPrice = product.price * quantity;

  const order = new this({
    email,
    product: productObjectId,
    quantity,
    totalPrice,
  });

  product.quantity -= quantity;
  product.inStock = product.quantity > 0;
  await product.save();

  await order.save();

  return order as Order; // Updated line
};

// Define the Order Model interface with custom methods
interface OrderModel extends Model<Order> {
  createOrder(email: string, productId: string, quantity: number): Promise<Order>;
}

// Create and export the Order model with the extended interface
export const OrderModel = model<Order, OrderModel>('Order', OrderSchema);