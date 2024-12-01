"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("../src/app/modules/Products/product.routes"));
const order_routes_1 = __importDefault(require("../src/app/modules/Orders/order.routes"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api', product_routes_1.default);
app.use('/api', order_routes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to my book shop api');
});
exports.default = app;
