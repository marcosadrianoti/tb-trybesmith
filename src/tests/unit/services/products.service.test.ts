import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';
import ProductService from '../../../src/services/product.service';

chai.use(chaiHttp);

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('Create a product', async function () {
    it('Product successfully created', async function () {
      // Arrange
      const requestBody = productsMock.validProduct;
      const product = ProductModel.build(productsMock.validProduct);
      sinon.stub(ProductModel, 'create').resolves(product);
      // Act
      const serviceResponse = await ProductService.create(requestBody);
      // Assert
      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.equal(product.dataValues);
    });
    it('Returns error with invalid name', async function () {
      // Arrange
      const requestBody = productsMock.productBodyNameLess;
      // Act
      const response = await ProductService.create(requestBody);
      // Assert
      expect(response.status).to.equal('INVALID_DATA');
      expect(response.data).to.deep.equal({ message: 'Name is required' });
    });
    it('Returns error with invalid price', async function () {
      // Arrange
      const requestBody = productsMock.productBodyPriceLess;
      // Act
      const response = await ProductService.create(requestBody);
      // Assert
      expect(response.status).to.equal('INVALID_DATA');
      expect(response.data).to.deep.equal({ message: 'Price is required' });
    });
    it('Returns error with invalid orderId', async function () {
      // Arrange
      const requestBody = productsMock.productBodyOrderIdLess;
      // Act
      const response = await ProductService.create(requestBody);
      // Assert
      expect(response.status).to.equal('INVALID_DATA');
      expect(response.data).to.deep.equal({ message: 'orderId is required' });
    });
  });
  describe('Listing all products', function () {
    it('Returns all products', async function () {
      // Arrange
      const responseMock = ProductModel.bulkBuild(productsMock.responseAllProducts);
      sinon.stub(ProductModel, 'findAll').resolves(responseMock);
      // Act
      const response = await ProductService.listAllProducts();
      // Assert
      expect(response.status).to.equal('SUCCESSFUL');
      expect(response.data).to.deep.equal(responseMock);
    });
  });
});
