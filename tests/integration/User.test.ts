import * as sinon from 'sinon';
import * as chai from 'chai';
import App from '../../src/app';

// @ts-ignore
import chaiHttp = require('chai-http');

import SequelizeUser from '../../src/database/models/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('User', function () {
  it('should return a list of users', async function () {
    const users = [
      { id: 1, name: 'Jon Doe', email: 'jondoe@email.com', password: 'JaneDoe' },
      { id: 2, name: 'Jane Doe', email: 'janeDoe@email.com', password: 'JaneDoe' }
    ];

    sinon.stub(SequelizeUser, 'findAll').resolves(users as any);

    const { status, body } = await chai.request(app).get('/users');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(users);
  });

  afterEach(sinon.restore);
});
