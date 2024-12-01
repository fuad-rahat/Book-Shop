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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
class ProductServices {
    static createProductInDB(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.createProduct(productData);
            return product;
        });
    }
    static getAllBooksFromDB(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchTerm) {
                return product_model_1.ProductModel.findByCategory(searchTerm);
            }
            return product_model_1.ProductModel.find();
        });
    }
    static getSingleBookFromDB(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.findById(productId);
            return product;
        });
    }
    static updateBookInDB(productId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield product_model_1.ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
            return updatedProduct;
        });
    }
    static deleteBookFromDB(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield product_model_1.ProductModel.findByIdAndDelete(productId);
            return deletedProduct;
        });
    }
}
exports.ProductServices = ProductServices;
