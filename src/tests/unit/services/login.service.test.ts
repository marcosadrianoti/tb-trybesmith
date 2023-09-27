import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service';

const INVALID_DATA_MSG: string = '"username" and "password" are required';
const UNAUTHORIZED_MSG: string = 'Username or password invalid';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  
  describe('VerifyLogin', function () {
    it('Usernameless return error', async function () {
      // Arrange
      const parameters = loginMock.usernamelessLoginBody;

      // Act
      const serviceResponse = await loginService.verifyLogin(parameters);

      // Assert
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).not.to.have.key('token');
      expect(serviceResponse.data).to.deep.eq({ message: INVALID_DATA_MSG });  
    });

    it('Passwordless return error', async function () {
      // Arrange
      const parameters = loginMock.passwordlessLoginBody;

      // Act
      const serviceResponse = await loginService.verifyLogin(parameters);

      // Assert
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).not.to.have.key('token');
      expect(serviceResponse.data).to.deep.eq({ message: INVALID_DATA_MSG });  
    });
    
    it('Wrong username return error', async function () {
      // Arrange
      const parameters = loginMock.userDoesNotExist;
      sinon.stub(UserModel, 'findOne').resolves(null);
      
      // Act
      const serviceResponse = await loginService.verifyLogin(parameters);
      
      // Assert
      expect(serviceResponse.status).to.eq('UNAUTHORIZED');
      expect(serviceResponse.data).not.to.have.key('token');
      expect(serviceResponse.data).to.deep.eq({ message: UNAUTHORIZED_MSG });
    });
    
    it('Wrong password return error', async function () {
      // Arrange
      const parameters = loginMock.wrongPasswordBody;
      const userInstance = UserModel.build(loginMock.returnedUser);
      const mockFindOneReturn = UserModel.build(loginMock.returnedUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
      
      // Act
      const serviceResponse = await loginService.verifyLogin(parameters);
      
      // Assert
      expect(serviceResponse.status).to.eq('UNAUTHORIZED');
      expect(serviceResponse.data).not.to.have.key('token');
      expect(serviceResponse.data).to.deep.eq({ message: UNAUTHORIZED_MSG });  
    });

    it('username and password correct return a token', async function () {
      // Arrange
      const parameters = loginMock.validLoginBody;
      const mockFindOneReturn = UserModel.build(loginMock.returnedUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

      // Act
      const serviceResponse = await loginService.verifyLogin(parameters);

      // Assert
      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.have.key('token');
    });

  });
});
