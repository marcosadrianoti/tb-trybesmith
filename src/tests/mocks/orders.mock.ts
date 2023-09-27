// import OrderModel from '../../src/database/models/order.model';
// import { ServiceResponseError, ServiceResponseSuccess } from '../../src/types/ServiceResponse';
import { Order, OrderResponse } from '../../src/types/Order';

  const responseAllOrders: OrderResponse[] = [
    {
      "id": 1,
      "userId": 1,
      "productIds": [
        2,
        1
      ]
    },
    {
      "id": 2,
      "userId": 3,
      "productIds": [
        4,
        3
      ]
    },
    {
      "id": 3,
      "userId": 2,
      "productIds": [
        5
      ]
    }
  ]

export default {
  responseAllOrders,
};
