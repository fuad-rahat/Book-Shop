import express from 'express';
import { ProductControllers } from '../Products/product.controller';

const router = express.Router();

router.post('/products', ProductControllers.createProduct);
router.get('/products', ProductControllers.getAllBooks);
router.get('/products/:productId', ProductControllers.getSingleBook);
router.put('/products/:productId', ProductControllers.updateBook);
router.delete('/products/:productId', ProductControllers.deleteBook);

export default router;
