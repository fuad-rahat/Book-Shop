import express from 'express';
import { OrderControllers } from '../Orders/order.controller';

const router = express.Router();

// Order Routes
router.post('/orders', OrderControllers.createOrder);
router.get('/orders/revenue', OrderControllers.calculateRevenue);
router.get('/orders', OrderControllers.getAllOrders); // Add this line

export default router;