import { Router } from 'express';
import orderController from '../controllers/order.controller';

const orderRouter = Router();
// productsRouter.get('/transactions', transactionsController.list);
// orderRouter.post('/products', orderController.create);
orderRouter.get('/orders', orderController.listAllOrders);
// productsRouter.get('/transactions/:id', transactionsController.findById);

export default orderRouter;
