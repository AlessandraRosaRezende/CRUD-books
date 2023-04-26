import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../src/app';
import BookModel from '../../src/models/BookModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Books Test', function () {
  it('should return all books', async function () {
    sinon.stub(new BookModel(), 'findAll').resolves(
      [{ id: 1, title: 'Senhor dos Anéis', price: 22, author: 'Sei não', isbn: '234234' }]
    );

    const { status, body } = await chai.request(app).get('/books');

    expect(status).to.equal(200);
    expect(body).to.deep.equal([{ id: 1, title: 'Senhor dos Anéis', price: 22, author: 'Sei não', isbn: '234234' }]);
  });
});
