import { Request, Response } from 'express';
// import productService from '../services/product.service';
import orderService from '../services/order.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function listAllOrders(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await orderService.listAllOrders();

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }

  return res.status(200).json(serviceResponse.data);
}

export default {
  listAllOrders,
};
