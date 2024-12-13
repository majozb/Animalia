import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import { Purchaser } from '../../src/models/purchaser.js';
import { Admin } from '../../src/models/admin.js';
import { app } from '../../src/index.js';
import jwt from 'jsonwebtoken';
import { Provider } from '../../src/models/provider.js';

describe('SignIn routes mockup', () => {
  context('POST /signIn', () => {
    afterEach(() => {
      sinon.restore(); // Restore stubs after each test
    });

    it('returns 400 for non-existent user', async function () {
      let findStub, findStub1, findStub2;
      const user = { username: 'nonexistentuser', password: 'password123' };
      findStub = sinon.stub(Purchaser, 'findOne').resolves(null);
      findStub1 = sinon.stub(Admin, 'findOne').resolves(null);
      findStub2 = sinon.stub(Provider, 'findOne').resolves(null);
      const res = await request(app).post('/signIn').send(user);

      expect(res.statusCode).to.equal(400);
    });

    it('returns 400 for invalid credentials', async  function () {
      let findStub, findStub1, findStub2;
      const user = { username: 'invalidUser', password: 'wrongPassword' };
      findStub = sinon.stub(Purchaser, 'findOne').resolves(null); // Simulate user not found
      findStub1 = sinon.stub(Admin, 'findOne').resolves(null);
      findStub2 = sinon.stub(Provider, 'findOne').resolves(null);
      sinon.stub(bcrypt, 'compare').resolves(false); // Simulate incorrect password
    
      const res = await request(app).post('/signIn').send(user);
    
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });
});