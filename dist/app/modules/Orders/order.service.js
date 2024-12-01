"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = require("../Products/product.model");
const createOrderInDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, product: productId, quantity } = orderData;
    const product = yield product_model_1.ProductModel.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    // Check if enough stock is available
    if (product.quantity < quantity) {
        throw new Error('Insufficient stock');
    }
    const totalPrice = product.price * quantity;
    // Create the order in the database
    const order = yield order_model_1.OrderModel.create({
        email,
        product: productId,
        quantity,
        totalPrice,
    });
    // Update the product stock and availability status
    product.quantity -= quantity;
    product.inStock = product.quantity > 0;
    yield product.save();
    return order;
});
// Get all orders from the database
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find(); // Fetch all orders from the database
    return result;
});
// Get a specific order by its ID
const getSingleOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findById(id);
    if (!result) {
        throw new Error('Order not found');
    }
    return result;
});
// Delete an order from the database
const deleteOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findByIdAndDelete(id);
    if (!result) {
        throw new Error('Order not found');
    }
    return result;
});
// Calculate total revenue from all orders
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const orders = yield order_model_1.OrderModel.aggregate([
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
    return ((_a = orders[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
});
exports.OrderServices = {
    createOrderInDB,
    getAllOrdersFromDB,
    getSingleOrderFromDB,
    deleteOrderFromDB,
    calculateTotalRevenue,
};
