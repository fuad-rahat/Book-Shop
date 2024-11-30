import mongoose from "mongoose";

export interface Order {
  email: string;
  product: mongoose.Types.ObjectId; // the productId which the user wants to order
  quantity: number;
  totalPrice: number;
}