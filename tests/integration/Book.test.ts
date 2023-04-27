import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../src/app';
import SequelizeBook from '../../src/database/models/SequelizeBook';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Books Test', function () {
  it('should return all books', async function () {
    sinon.stub(SequelizeBook, 'findAll').resolves(
      [{ id: 1, title: 'Senhor dos Anéis', price: 22, author: 'Sei não', isbn: '234234' }]  as any
    );

    const { status, body } = await chai.request(app).get('/books');

    expect(status).to.equal(200);
    expect(body).to.deep.equal([{ id: 1, title: 'Senhor dos Anéis', price: 22, author: 'Sei não', isbn: '234234' }]);
  });

  afterEach(sinon.restore);
});
