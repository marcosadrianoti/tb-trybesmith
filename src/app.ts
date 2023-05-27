// app
import express from 'express';
import productsRouter from './routers/product.router';
import ordersRouter from './routers/order.router';

const app = express();

app.use(express.json());
app.use(productsRouter);
app.use(ordersRouter);

export default app;
