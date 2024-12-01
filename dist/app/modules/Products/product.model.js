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
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
            message: '{VALUE} is not a valid category',
        },
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true,
    },
});
// Pre-save  to set inStock based on the quantity
ProductSchema.pre('save', function (next) {
    this.inStock = this.quantity > 0;
    next();
});
//static method
ProductSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update && update.quantity !== undefined) {
            update.inStock = update.quantity > 0;
        }
        next();
    });
});
// static method to find products by category 
ProductSchema.statics.findByCategory = function (category) {
    const lowerCaseCategory = category.toLowerCase();
    return this.find({ category: lowerCaseCategory }).exec();
};
// Static method to update product stock after an order
ProductSchema.statics.updateStock = function (productId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield this.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.quantity < quantity) {
            throw new Error('Not enough stock available');
        }
        product.quantity -= quantity;
        product.inStock = product.quantity > 0;
        yield product.save();
        return product;
    });
};
// Custom method to create a new product
ProductSchema.statics.createProduct = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = new this(data);
        yield product.save();
        return product;
    });
};
// Post-save hook to log when a product is created
ProductSchema.post('save', function (doc) {
    console.log(`Product "${doc.title}" was created.`);
});
// Create and export the Product model
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
