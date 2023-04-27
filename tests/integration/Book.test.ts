import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../src/app';
import SequelizeBook from '../../src/database/models/SequelizeBook';
import { books, book } from '../mocks/Book.mocks';
import JWT from '../../src/utils/JWT';
import Validations from '../../src/middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Books Test', function () {
  it('should return all books', async function () {
    sinon.stub(SequelizeBook, 'findAll').resolves(books as any);

    const { status, body } = await chai.request(app).get('/books');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(books);
  });

  it('should return a book by id', async function () {
    sinon.stub(SequelizeBook, 'findOne').resolves(book as any);

    const { status, body } = await chai.request(app).get('/books/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(book);
  });

  it('should create a book', async function () {
    sinon.stub(SequelizeBook, 'create').resolves(book as any);

    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(Validations, 'validateBook').returns();

    const { id, ...sendData } = book;

    const { status, body } = await chai.request(app).post('/books')
      .set('authorization', 'validToken')
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(book);
  });

  afterEach(sinon.restore);
});
