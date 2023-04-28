import * as sinon from 'sinon';
import * as chai from 'chai';
import App from '../../src/app';
import { users, user, invalidEmailLoginBody, invalidPasswordLoginBody, validLoginBody } from '../mocks/User.mocks';
import JWT from '../../src/utils/JWT';
import Validations from '../../src/middlewares/Validations';

// @ts-ignore
import chaiHttp = require('chai-http');

import SequelizeUser from '../../src/database/models/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Users Test', function () {

  it('should return all users', async function () {
    sinon.stub(SequelizeUser, 'findAll').resolves(users as any);

    const { status, body } = await chai.request(app).get('/users');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(users);
  });

  it('should return a user by id', async function () {
    sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);

    const { status, body } = await chai.request(app).get('/users/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(user);
  });

  it('should create a user', async function () {
    sinon.stub(SequelizeUser, 'create').resolves(user as any);
    sinon.stub(SequelizeUser, 'findOne').resolves(null);
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(Validations, 'validateUser').returns();

    const { id, ...sendData } = user;

    const { status, body } = await chai.request(app).post('/users/register')
      .set('authorization', 'validToken')
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(user);
  });

  it('shouldn\'t create a user without a token', async function () {
    const { status, body } = await chai.request(app).post('/users/register');

    expect(status).to.equal(500);
    expect(body.message).to.equal('Token not found');
  });

  it('shouldn\'t create a user with an invalid token', async function () {
    const { status, body } = await chai.request(app)
      .post('/users/register')
      .set('authorization', 'invalidToken');

    expect(status).to.equal(500);
    expect(body.message).to.equal('Token must be a valid token');
  });

  it('shouldn\'t create a user with invalid body data', async function () {
    sinon.stub(JWT, 'verify').resolves();

    const { status, body } = await chai.request(app).post('/users/register')
      .set('authorization', 'validToken')
      .send({});

    expect(status).to.equal(400);
    expect(body.message).to.equal('email is required');
  });
  afterEach(sinon.restore);
});

describe('Login Test', function () {
  it('shouldn\'t login with an invalid body data', async function () {
    const { status, body } = await chai.request(app).post('/users/login')
      .send({});

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' })
  });

  it('shouldn\'t login with an invalid email', async function () {
    const { status, body } = await chai.request(app).post('/users/login')
      .send(invalidEmailLoginBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email' })
  });

  it('shouldn\'t login with an invalid password', async function () {
    const { status, body } = await chai.request(app).post('/users/login')
      .send(invalidPasswordLoginBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' })
  });

  it('shouldn\'t login when user is not found', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/users/login')
      .send(validLoginBody);
    expect(status).to.equal(404);
    expect(body).to.be.deep.equal({ message: 'User not found' })
  });

  it('should return a token when login is done', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(JWT, 'sign').returns('validToken');

    const { status, body } = await chai.request(app)
      .post('/users/login')
      .send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token')
  });

  afterEach(sinon.restore);
});