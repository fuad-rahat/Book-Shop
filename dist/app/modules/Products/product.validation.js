"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    author: zod_1.z.string().min(1, 'Author is required'),
    price: zod_1.z.number().min(0, 'Price must be a positive number'),
    category: zod_1.z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious']),
    description: zod_1.z.string().min(1, 'Description is required'),
    quantity: zod_1.z.number().min(0, 'Quantity must be a positive number'),
    inStock: zod_1.z.boolean(),
});
exports.default = productValidationSchema;
