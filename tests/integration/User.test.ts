import * as sinon from 'sinon';
import * as chai from 'chai';
import App from '../../src/app';

// @ts-ignore
import chaiHttp = require('chai-http');

import SequelizeBookModel from '../../src/database/models/BookModel';
import UserModel from '../../src/models/UserModel';
import UserService from '../../src/services/UserService';
import UserController from '../../src/controllers/UserController';
import { describe, it } from 'node:test';

chai.use(chaiHttp);
const { expect } = chai;

const { app } = new App();

const PORT = process.env.PORT || 3001;
const URL = `http://localhost:${PORT}`;

describe('User', function () {
  it('should return a list of users', async function () {
    sinon.stub(UserService, 'findAll').resolves({
      status: 'successful',
      data: [
        { id: 1, name: 'Jon Doe', email: 'jondoe@email.com', password: 'JaneDoe' },
      ]
    });

    const req = {}
    const res = {
      status: () => res
    }

    const userController = new UserController();

    const result = await userController.getAllUsers(req as any, res as any);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(1);
    expect(result.type).to.equal(200);
  });
});


describe('User', function () {
  it('should return a list of users', async function () {
    const users = [
      { id: 1, name: 'Jon Doe', email: 'jondoe@email.com', password: 'JaneDoe' },
      { id: 2, name: 'Jane Doe', email: 'janeDoe@email.com', password: 'JaneDoe' }
    ];

    sinon.stub(SequelizeBookModel, 'findAll').resolves(users);

    const req = {}
    const res = {
      status: () => res
    }

  });
});
