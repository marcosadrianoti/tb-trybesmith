export type Order = {
  id: number;
  userId: number;
  productIds?: { id: number }[];
};

export type OrderResponse = {
  id: number;
  userId: number;
  productIds: number[];
};

// export type OrderResponseAll = [
//   OrderResponse,
// ];

export type OrderResponseAll = OrderResponse[];
