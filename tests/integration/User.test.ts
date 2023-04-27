import * as sinon from 'sinon';
import * as chai from 'chai';
import App from '../../src/app';
import { users, user } from '../mocks/User.mocks';

// @ts-ignore
import chaiHttp = require('chai-http');

import SequelizeUser from '../../src/database/models/SequelizeUser';
import JWT from '../../src/utils/JWT';
import Validations from '../../src/middlewares/Validations';
import UserModel from '../../src/models/UserModel';
import { IUser } from '../../src/interfaces/users/IUser';
import UserService from '../../src/services/UserService';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('User', function () {

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

      sinon.assert.calledOnce(findByIdStub as any);

      sinon.restore();
    });

    it('should return not found if the user doesn\'t exists', async () => {
      const findByIdStub = sinon.stub(SequelizeUser, 'findByPk').resolves(null);

      const { status, body } = await chai.request(app).get('/users/1');

      expect(status).to.equal(404);
      expect(body.message).to.equal('User not found');

      sinon.assert.calledOnce(findByIdStub as any);

      sinon.restore();
    });

  });

  describe('create', () => {
    it('should create a user', async () => {
      sinon.stub(SequelizeUser, 'create').resolves(user as any);
      sinon.stub(new UserModel, 'findByEmail').resolves(null);

      sinon.stub(JWT, 'verify').resolves();

      sinon.stub(Validations, 'validateUser').returns();

      const { id, ...sendData } = user;

      const { status, body } = await chai.request(app).post('/users/register')
        .set('authorization', 'validToken')
        .send(sendData);

      expect(status).to.equal(201);
      expect(body).to.deep.equal(user);

      sinon.assert.calledOnce(SequelizeUser.create as any);
    });

    it('should return an error invalid token', async () => {
      sinon.stub(SequelizeUser, 'create').resolves(user as any);

      sinon.stub(JWT, 'verify').throws();

      sinon.stub(Validations, 'validateUser').returns();

      const { status, body } = await chai.request(app).post('/users/register')
        .set('authorization', 'validToken')
        .send(user);
      
      expect(status).to.equal(500);

      sinon.assert.calledOnce(JWT.verify as any);
  });

});

describe('login', () => {
  it('should login a user', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    sinon.stub(JWT, 'sign').returns('validToken');

    sinon.stub(Validations, 'validateUser').returns();

    const { status, body } = await chai.request(app).post('/users/login').set('authorization', 'validToken').send(user);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ token: 'validToken' });

    sinon.assert.calledOnce(SequelizeUser.findOne as any);
  });

  it('should return invalid email and password', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/users/login').send(user);

    expect(status).to.equal(404);
    expect(body.message).to.equal('User not found');

    sinon.assert.calledOnce(SequelizeUser.findOne as any);

    sinon.restore();
  });
  
});
  afterEach(sinon.restore);
  
});
