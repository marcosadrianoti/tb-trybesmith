import ProductModel, { ProductInputtableTypes } from '../../src/database/models/product.model';
import { ServiceResponseError, ServiceResponseSuccess } from '../../src/types/ServiceResponse';
import { Product } from '../../src/types/Product';

const validProduct: Product = {
  id: 1,
  name: 'Capa do Rei Arthur',
  price: '10.00',
  orderId: 1,
};

const responseAllProducts: Product[] = [
    {
        "id": 1,
        "name": "Pedra Filosofal",
        "price": "20 gold",
        "orderId": 2
      },
    {
      "id": 2,
      "name": "Lança do Destino",
      "price": "100 diamond",
      "orderId": 1
    }
  ]

const responseProduct: Partial<Product> = {
  id: 1,
  name: 'Capa do Rei Arthur',
  price: '10.00',
};

const validProductBody: ProductInputtableTypes = {
  name: 'Capa do Rei Arthur',
  price: '10.00',
  orderId: 1,
};

const productBodyNameLess: ProductInputtableTypes = {
  name: '',
  price: '10.00',
  orderId: 1,
};

const productBodyPriceLess: ProductInputtableTypes = {
  name: 'Capa do Rei Arthur',
  price: '',
  orderId: 1,
};

const productBodyOrderIdLess: ProductInputtableTypes = {
  name: 'Capa do Rei Arthur',
  price: '10.00',
  orderId: -1,
};

const validProductReturn: Partial<Product> = {
  name: 'Capa do Rei Arthur',
  price: '10.0',
  orderId: 1,
};

const validProductWithoutName: Partial<Product> = {
  price: '10.0',
  orderId: 1,
};

export default {
  validProduct,
  responseAllProducts,
  responseProduct,
  validProductReturn,
  validProductWithoutName,
  validProductBody,
  productBodyNameLess,
  productBodyPriceLess,
  productBodyOrderIdLess,
};
