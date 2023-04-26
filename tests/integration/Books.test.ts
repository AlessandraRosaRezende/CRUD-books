import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

describe('Books', () => {
  it('should return all books', async () => {
    const books = await getRepository(Book).find();
    expect(books).toHaveLength(2);
  });
});
