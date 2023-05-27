// import { Product } from '../types/Product';
// import { Order } from '../types/Order';
import { OrderResponse } from '../types/Order';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

function newProductId(productIds: { id: number }[] | undefined = []): number[] {
  // [
  //   {
  //     "id": 2
  //   },
  //   {
  //     "id": 1
  //   }
  // ]
  const newProdId = productIds.map((prodId) => prodId.id);
  return newProdId;
}

async function listAllOrders(): Promise<ServiceResponse<OrderResponse[]>> {
  const allOrders = (await OrderModel.findAll({
    include: { model: ProductModel, as: 'productIds', attributes: ['id'] },
  }));

  const result = allOrders
    .map((ord) => ({
      ...ord.dataValues,
      productIds: newProductId(ord.dataValues.productIds),
    }));
  
  return { status: 'SUCCESSFUL', data: result };
}

export default {
  listAllOrders,
};
