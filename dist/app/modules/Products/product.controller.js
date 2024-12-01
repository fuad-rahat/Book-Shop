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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("../Products/product.service");
const product_validation_1 = __importDefault(require("../Products/product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        const zodParsedData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.createProductInDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Book created successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = (_a = req.query.searchTerm) === null || _a === void 0 ? void 0 : _a.toString();
        const result = yield product_service_1.ProductServices.getAllBooksFromDB(query);
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        if (!productId || productId.length !== 24) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Product ID',
            });
        }
        const result = yield product_service_1.ProductServices.getSingleBookFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { price, quantity } = req.body;
        const result = yield product_service_1.ProductServices.updateBookInDB(productId, {
            price,
            quantity,
        });
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(500).json({
                success: false,
                message: 'There is no book available to delete',
            });
        }
        const result = yield product_service_1.ProductServices.deleteBookFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
