import * as sinon from 'sinon';
import * as chai from 'chai';
import App from '../../src/app';
import { users, user } from '../mocks/User.mocks';

// @ts-ignore
import chaiHttp = require('chai-http');

import SequelizeUser from '../../src/database/models/SequelizeUser';

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
    afterEach(sinon.restore);
  });
  
});
