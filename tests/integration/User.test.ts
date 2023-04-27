import * as sinon from 'sinon';
import * as chai from 'chai';
import App from '../../src/app';
import { users, user } from '../mocks/User.mocks';

// @ts-ignore
import chaiHttp = require('chai-http');

import SequelizeUser from '../../src/database/models/SequelizeUser';
import UserModel from '../../src/models/UserModel';
import UserService from '../../src/services/UserService';
import JWT from '../../src/utils/JWT';
import { IUser } from '../../src/interfaces/users/IUser';
import { NewEntity } from '../../src/interfaces/ICRUDModel';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('User', function () {
  let userService: UserService;
  let userModel: UserModel;
  let jwtService: JWT;

  beforeEach(() => {
    userModel = new UserModel();
    jwtService = new JWT();
    userService = new UserService(userModel, jwtService);
  });

  describe('findAll', () => {
    it('should return a list of users', async function () {
      sinon.stub(SequelizeUser, 'findAll').resolves(users as any);

      const { status, body } = await chai.request(app).get('/users');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(users);

      sinon.assert.calledOnce(SequelizeUser.findAll as any);

      sinon.restore();
    });

  });

  describe('findById', () => {
    it('should return a user', async () => {
      const findByIdStub = sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);

      const { status, body } = await chai.request(app).get('/users/1');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(user);

      expect(findByIdStub.calledOnce).to.be.true;

      sinon.restore();
    });
  });

  describe('findOne', () => {
    it('should return user with email', async () => {
      const findByEmailStub = sinon.stub(userModel, 'findByEmail').resolves(user);

      const result = await userService.findOne('jondoe@email.com');

      expect(result).to.deep.equal({ status: 'successful', data: user });
      expect(findByEmailStub.calledOnce).to.be.true;
    });
  });

  describe('login', () => {
    it('should return an error message', async () => {
      const findByEmailStub = sinon.stub(userModel, 'findByEmail').resolves(user);

      const result = await userService.login({ email: user.email, password: 'wrongPassword' });

      expect(result).to.deep.equal({ status: 'invalidData', data: { message: 'Invalid email or password' } });

      expect(findByEmailStub.calledOnce).to.be.true;

      sinon.restore();
    });

    it('should return an error message', async () => {

      const findByEmailStub = sinon.stub(userModel, 'findByEmail').resolves(null);

      const result = await userService.login({ email: user.email, password: user.password });

      expect(result).to.deep.equal({ status: 'notFound', data: { message: 'User not found' } });

      expect(findByEmailStub.calledOnce).to.be.true;

      sinon.restore();

    });

    describe('createUser', () => {

      it('should return a new user', async () => {
        const findByEmailStub = sinon.stub(userModel, 'findByEmail').resolves(null);
        const createStub = sinon.stub(userModel, 'create').resolves(user);

        const result = await userService.createUser(user as NewEntity<IUser>);

        expect(result).to.deep.equal({ status: 'successful', data: user });

        expect(findByEmailStub.calledOnce).to.be.true;

        expect(createStub.calledOnce).to.be.true;

        sinon.restore();
      });

      it('should return an error message', async () => {
        const findByEmailStub = sinon.stub(userModel, 'findByEmail').resolves(user);

        const result = await userService.createUser(user as NewEntity<IUser>);

        expect(result).to.deep.equal({ status: 'conflict', data: { message: 'User already exists' } });

        expect(findByEmailStub.calledOnce).to.be.true;

        sinon.restore();
      });

    });
    afterEach(sinon.restore);
  });
});
