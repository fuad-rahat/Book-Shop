"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../Products/product.controller");
const router = express_1.default.Router();
router.post('/products', product_controller_1.ProductControllers.createProduct);
router.get('/products', product_controller_1.ProductControllers.getAllBooks);
router.get('/products/:productId', product_controller_1.ProductControllers.getSingleBook);
router.put('/products/:productId', product_controller_1.ProductControllers.updateBook);
router.delete('/products/:productId', product_controller_1.ProductControllers.deleteBook);
exports.default = router;
