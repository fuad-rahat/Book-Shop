import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';
import mongoose from 'mongoose';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const zodParsedData = orderValidationSchema.parse(orderData);

    const productId = new mongoose.Types.ObjectId(zodParsedData.product);

    const orderToCreate = {
      email: zodParsedData.email,
      product: productId, 
      quantity: zodParsedData.quantity,
      totalPrice: zodParsedData.totalPrice,
    };

    const result = await OrderServices.createOrderInDB(orderToCreate);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateTotalRevenue();

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        "totalRevenue":result
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDB(); 
    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  calculateRevenue,
  getAllOrders
};
