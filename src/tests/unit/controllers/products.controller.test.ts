import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productMock from '../../mocks/products.mock';
import productService from '../../../src/services/product.service';
import productController from '../../../src/controllers/product.controller';
import ProductModel from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('Create a product', function () {
    it('Product successfully created', async function () {
      // Arrange
      req.body = productMock.validProduct;
      sinon.stub(productService, 'create').resolves({
        status: 'SUCCESSFUL',
        data: productMock.validProduct,
      });
      // Act
      await productController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productMock.responseProduct);

    });

    it('Returns error with invalid name', async function () {
      // Arrange
      req.body = productMock.productBodyNameLess;
      sinon.stub(productService, 'create').resolves({
        status: 'INVALID_DATA',
        data: { message: 'Name is required' },
      });
      // Act
      await productController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Name is required' });
    });
  });
  describe('Listing all products', function () {
    it('Returns all products', async function () {
      // Arrange
      const responseMock = ProductModel.bulkBuild(productMock.responseAllProducts);
      // console.log('responseMock', responseMock);
      
      sinon.stub(productService, 'listAllProducts').resolves({
        status: 'SUCCESSFUL',
        data: responseMock,
      });
      // Act
      await productController.listAllProducts(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(responseMock);
    });
  });
});
