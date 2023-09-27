import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import OrderModel, { OrderSequelizeModel } from '../../../src/database/models/order.model';
import ordersMock from '../../mocks/orders.mock';
import OrderService from '../../../src/services/order.service';
import { OrderResponse, Order, OrderResponseAll } from '../../../src/types/Order';

chai.use(chaiHttp);

describe('OrderService', function () {
  beforeEach(function () { sinon.restore(); });
  // describe('Create a product', async function () {
  //   it('Product successfully created', async function () {
  //     // Arrange
  //     const requestBody = productsMock.validProduct;
  //     const product = ProductModel.build(productsMock.validProduct);
  //     sinon.stub(ProductModel, 'create').resolves(product);
  //     // Act
  //     const serviceResponse = await ProductService.create(requestBody);
  //     // Assert
  //     expect(serviceResponse.status).to.equal('SUCCESSFUL');
  //     expect(serviceResponse.data).to.deep.equal(product.dataValues);
  //   });
  //   it('Returns error with invalid name', async function () {
  //     // Arrange
  //     const requestBody = productsMock.productBodyNameLess;
  //     // Act
  //     const response = await ProductService.create(requestBody);
  //     // Assert
  //     expect(response.status).to.equal('INVALID_DATA');
  //     expect(response.data).to.deep.equal({ message: 'Name is required' });
  //   });
  //   it('Returns error with invalid price', async function () {
  //     // Arrange
  //     const requestBody = productsMock.productBodyPriceLess;
  //     // Act
  //     const response = await ProductService.create(requestBody);
  //     // Assert
  //     expect(response.status).to.equal('INVALID_DATA');
  //     expect(response.data).to.deep.equal({ message: 'Price is required' });
  //   });
  //   it('Returns error with invalid orderId', async function () {
  //     // Arrange
  //     const requestBody = productsMock.productBodyOrderIdLess;
  //     // Act
  //     const response = await ProductService.create(requestBody);
  //     // Assert
  //     expect(response.status).to.equal('INVALID_DATA');
  //     expect(response.data).to.deep.equal({ message: 'orderId is required' });
  //   });
  // });
  describe('Listing all orders', function () {
    it('Returns all orders', async function () {
      // Arrange
      // const responseMock: OrderResponseAll = OrderModel.bulkBuild(ordersMock.responseAllOrders);
      // const responseMock: OrderResponseAll = ordersMock.responseAllOrders;
      // sinon.stub(OrderModel, 'findAll').resolves(responseMock);
      // Act
      const response = await OrderService.listAllOrders();
      // Assert
      expect(response.status).to.equal('SUCCESSFUL');
      expect(response.data).to.deep.equal(ordersMock.responseAllOrders);
      // console.log('data ====>', response.data);
      // expect(response.data).to.deep.equal(responseMock);
    });
  });
});
