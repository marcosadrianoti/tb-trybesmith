import { Router } from 'express';
import productController from '../controllers/product.controller';

const productsRouter = Router();
// productsRouter.get('/transactions', transactionsController.list);
productsRouter.post('/products', productController.create);
// productsRouter.get('/transactions/:id', transactionsController.findById);

export default productsRouter;
