import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';
import loginMock from '../../mocks/login.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Token } from '../../../src/types/Token';

chai.use(sinonChai);
describe('LoginController', function () {
  const req = {} as Request;
    const res = {} as Response;
    const INVALID_DATA_MSG = '"username" and "password" are required';
    const UNAUTHORIZED_MSG = 'Username or password invalid';
    beforeEach(function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.restore();
    });

  describe('Login', function () {
    it('Usernameless return error', async function () {
      // Arrange
      req.body = loginMock.usernamelessLoginBody;
      const serviceResponse: ServiceResponse<Token> = {
        status: 'INVALID_DATA',
        data: { message: INVALID_DATA_MSG },
      }
      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

      // Act
      await loginController.login(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: INVALID_DATA_MSG });
    });

    it('Passwordless return error', async function () {
      // Arrange
      req.body = loginMock.passwordlessLoginBody;
      const serviceResponse: ServiceResponse<Token> = {
        status: 'INVALID_DATA',
        data: { message: INVALID_DATA_MSG },
      }
      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

      // Act
      await loginController.login(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: INVALID_DATA_MSG });
    });

    
    
    it('Wrong username return error', async function () {
      // Arrange
      req.body = loginMock.userDoesNotExist;
      const serviceResponse: ServiceResponse<Token> = {
        status: 'UNAUTHORIZED',
        data: { message: UNAUTHORIZED_MSG },
      }
      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
      
      // Act
      await loginController.login(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: UNAUTHORIZED_MSG });
    });

    it('Wrong password return error', async function () {
      // Arrange
      req.body = loginMock.wrongPasswordBody;
      const serviceResponse: ServiceResponse<Token> = {
        status: 'UNAUTHORIZED',
        data: { message: UNAUTHORIZED_MSG },
      }
      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
      
      // Act
      await loginController.login(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: UNAUTHORIZED_MSG });
    });

    it('username and password correct return a token', async function () {
      // Arrange
      req.body = loginMock.validLoginBody;
      const token = { token: 'm1nh4t0k3nbcr1p7v4l1d4' }
      const serviceResponse: ServiceResponse<Token> = {
        status: 'SUCCESSFUL',
        data: token,
      }
      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
      
      // Act
      await loginController.login(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(token);
    });

  });
});
