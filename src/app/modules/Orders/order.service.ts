import { Order } from './order.interface';
import { OrderModel } from './order.model';
import { ProductModel } from '../Products/product.model';

const createOrderInDB = async (orderData: Order) => {
  const { email, product: productId, quantity } = orderData;


  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if enough stock is available
  if (product.quantity < quantity) {
    throw new Error('Insufficient stock');
  }

  const totalPrice = product.price * quantity;

  // Create the order in the database
  const order = await OrderModel.create({
    email,
    product: productId,
    quantity,
    totalPrice,
  });

  // Update the product stock and availability status
  product.quantity -= quantity;
  product.inStock = product.quantity > 0;
  await product.save();

  return order;
};

// Get all orders from the database

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find(); // Fetch all orders from the database
  return result;
};

// Get a specific order by its ID
const getSingleOrderFromDB = async (id: string) => {
  const result = await OrderModel.findById(id);
  if (!result) {
    throw new Error('Order not found');
  }
  return result;
};

// Delete an order from the database
const deleteOrderFromDB = async (id: string) => {
  const result = await OrderModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error('Order not found');
  }
  return result;
};

// Calculate total revenue from all orders
const calculateTotalRevenue = async () => {
  const orders = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'products', // Assuming collection name is 'products'
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $project: {
        totalPrice: 1,
        'productDetails.price': 1,
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return orders[0]?.totalRevenue || 0;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  deleteOrderFromDB,
  calculateTotalRevenue,
};
